import net from "node:net";
import tls from "node:tls";

const toArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (!value) {
    return [];
  }

  return [value];
};

const base64 = (value) => Buffer.from(value, "utf8").toString("base64");

const normalizeLines = (text = "") =>
  text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/\n/g, "\r\n");

const escapeLeadingPeriods = (text) => text.replace(/^\./gm, "..");

const createSMTPConnection = (options) =>
  new Promise((resolve, reject) => {
    const socket = options.secure
      ? tls.connect({ host: options.host, port: options.port ?? 465 })
      : net.createConnection({ host: options.host, port: options.port ?? 587 });

    const pending = [];
    const queuedResponses = [];
    let buffer = "";
    let currentLines = [];
    let closed = false;

    const processResponse = (response) => {
      const entry = pending.shift();
      if (entry) {
        const { resolve: resolveEntry, reject: rejectEntry, expect } = entry;
        if (expect && !expect.includes(response.code)) {
          rejectEntry(
            new Error(
              `Unexpected SMTP response ${response.code}: ${response.lines.join(" ")}`,
            ),
          );
        } else {
          resolveEntry(response);
        }
      } else {
        queuedResponses.push(response);
      }
    };

    const deliverQueued = () => {
      while (pending.length && queuedResponses.length) {
        const entry = pending.shift();
        const response = queuedResponses.shift();
        if (!entry || !response) {
          continue;
        }
        const { resolve: resolveEntry, reject: rejectEntry, expect } = entry;
        if (expect && !expect.includes(response.code)) {
          rejectEntry(
            new Error(
              `Unexpected SMTP response ${response.code}: ${response.lines.join(" ")}`,
            ),
          );
        } else {
          resolveEntry(response);
        }
      }
    };

    const processBuffer = () => {
      while (true) {
        const index = buffer.indexOf("\r\n");
        if (index < 0) {
          break;
        }

        const line = buffer.slice(0, index);
        buffer = buffer.slice(index + 2);
        if (!line) {
          continue;
        }

        const match = line.match(/^(\d{3})([ -])(.*)$/);
        if (!match) {
          continue;
        }

        const code = Number.parseInt(match[1], 10);
        const continuation = match[2] === "-";
        const message = match[3];
        currentLines.push(message.trim());

        if (!continuation) {
          processResponse({ code, message, lines: currentLines });
          currentLines = [];
        }
      }

      deliverQueued();
    };

    const sendCommand = (command, expectCodes) =>
      new Promise((resolveCommand, rejectCommand) => {
        if (closed) {
          rejectCommand(new Error("Connection already closed"));
          return;
        }

        const expectArray =
          typeof expectCodes === "number"
            ? [expectCodes]
            : Array.isArray(expectCodes)
              ? expectCodes
              : undefined;

        pending.push({
          resolve: resolveCommand,
          reject: rejectCommand,
          expect: expectArray,
        });

        if (command !== undefined) {
          socket.write(`${command}\r\n`);
        }

        processBuffer();
      });

    socket.on("data", (chunk) => {
      buffer += chunk.toString("utf8");
      processBuffer();
    });

    socket.once("error", (error) => {
      if (!closed) {
        closed = true;
        reject(error);
      }
      while (pending.length) {
        pending.shift()?.reject(error);
      }
    });

    socket.once("close", () => {
      closed = true;
      while (pending.length) {
        pending.shift()?.reject(new Error("Connection closed"));
      }
    });

    const close = () =>
      new Promise((resolveClose) => {
        if (closed) {
          resolveClose();
          return;
        }

        socket.once("close", resolveClose);
        socket.end();
      });

    socket.once("connect", () => {
      resolve({ sendCommand, close, socket });
    });
  });

const buildMessage = ({ from, to, subject, text, replyTo }) => {
  const recipients = toArray(to).join(", ");
  const headers = [
    `From: ${from}`,
    `To: ${recipients}`,
    `Subject: ${subject}`,
    replyTo ? `Reply-To: ${replyTo}` : null,
    `Date: ${new Date().toUTCString()}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: 8bit",
  ].filter(Boolean);

  const normalizedText = escapeLeadingPeriods(normalizeLines(text));

  return `${headers.join("\r\n")}\r\n\r\n${normalizedText}`;
};

export const createTransport = (options = {}) => {
  if (options.jsonTransport) {
    return {
      // Mimic Nodemailer's sendMail signature by returning a resolved promise.
      async sendMail(mailOptions) {
        return {
          envelope: {
            from: mailOptions.from,
            to: toArray(mailOptions.to),
          },
          message: JSON.stringify(mailOptions),
        };
      },
    };
  }

  if (!options.host) {
    throw new Error("SMTP host is required");
  }

  return {
    async sendMail(mailOptions) {
      const connection = await createSMTPConnection(options);

      try {
        await connection.sendCommand(undefined, 220);
        await connection.sendCommand(
          `EHLO ${options.name ?? "localhost"}`,
          250,
        );

        if (options.auth?.user && options.auth?.pass) {
          await connection.sendCommand("AUTH LOGIN", 334);
          await connection.sendCommand(base64(options.auth.user), 334);
          await connection.sendCommand(base64(options.auth.pass), 235);
        }

        const fromAddress = mailOptions.from;
        const recipients = toArray(mailOptions.to);

        await connection.sendCommand(`MAIL FROM:<${fromAddress}>`, 250);
        for (const recipient of recipients) {
          await connection.sendCommand(`RCPT TO:<${recipient}>`, 250);
        }

        await connection.sendCommand("DATA", 354);
        connection.socket.write(`${buildMessage(mailOptions)}\r\n.\r\n`);
        await connection.sendCommand(undefined, 250);
        await connection.sendCommand("QUIT", 221);
      } finally {
        await connection.close();
      }
    },
  };
};

export default { createTransport };
