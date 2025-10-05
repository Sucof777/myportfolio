# Portfolio

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.7.

## Development server

Run the Angular development server with:

```bash
npm start
```

This command launches the Angular CLI dev server on `http://localhost:4200` and rebuilds the application whenever source files change.

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

## Production deployment

Run `npm run build` to generate the optimized production assets. The build output is written to `dist/portfolio` and can be deployed to any static or server-rendered hosting environment that supports Angular's SSR bundle.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

Server-side API tests have been removed. Only the Angular unit tests remain, which you can run with `npm test`.

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
