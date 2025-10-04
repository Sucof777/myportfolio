export interface SendMailOptions {
  to: string | string[];
  from: string;
  subject: string;
  text: string;
  replyTo?: string;
}

export interface Transporter {
  sendMail(mailOptions: SendMailOptions): Promise<void>;
}

export interface SMTPTransportOptions {
  host: string;
  port?: number;
  secure?: boolean;
  name?: string;
  auth?: {
    user: string;
    pass: string;
  };
}

export interface JsonTransportOptions {
  jsonTransport: true;
}

export type TransportOptions = SMTPTransportOptions | JsonTransportOptions;

export declare const createTransport: (options?: TransportOptions) => Transporter;

declare const _default: {
  createTransport: (options?: TransportOptions) => Transporter;
};
export default _default;
