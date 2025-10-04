# Portfolio

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.7.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

Server-side API tests are implemented with Node's test runner. Execute them with:

```bash
npm run test:server
```

## Contact API configuration

The `/api/contact` endpoint forwards messages through SMTP using [Nodemailer](https://nodemailer.com/). Configure the following environment variables before starting the server:

| Variable | Required | Description |
| --- | --- | --- |
| `CONTACT_SMTP_HOST` | Yes (unless `CONTACT_TRANSPORT=json`) | SMTP server host name. |
| `CONTACT_SMTP_PORT` | No | SMTP port (defaults to `587`). |
| `CONTACT_SMTP_SECURE` | No | Set to `true` to enforce SMTPS (defaults based on port). |
| `CONTACT_SMTP_USER` | Yes (unless `CONTACT_TRANSPORT=json`) | SMTP username. |
| `CONTACT_SMTP_PASS` | Yes (unless `CONTACT_TRANSPORT=json`) | SMTP password. |
| `CONTACT_RECIPIENT` | No | Override the email recipient (defaults to `ferizovicsuco3@gmail.com`). |
| `CONTACT_FROM_ADDRESS` | No | Explicit “from” address (defaults to the SMTP user or the sender email). |
| `CONTACT_TRANSPORT` | No | Set to `json` to use Nodemailer's JSON transport (useful for local testing). |

When running tests you can set `CONTACT_TRANSPORT=json` to avoid connecting to a real SMTP server.

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Pushing changes to GitHub

This repository does not ship with a preconfigured remote. To simplify pushing your local work to GitHub, use the helper script:

```bash
# export the GitHub repository URL once
export GIT_REMOTE_URL=git@github.com:username/myportfolio.git

# push the current branch (defaults to the active branch)
bash scripts/push.sh

# or push an explicit branch name
bash scripts/push.sh main
```

If the `origin` remote is already configured, the script will reuse it. Otherwise, it will add the remote using `GIT_REMOTE_URL` and push the selected branch.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
