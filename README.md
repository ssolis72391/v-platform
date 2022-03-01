# virtual-platform

VIRTUALhaus react/nextjs platform

<br />

## Frontend

Main components that make up the frontend of the application.  
Currently building project using full SSG (static site generation) from nextjs.

| Component        | Framework  | Documentation                          |
| :--------------- | :--------- | :------------------------------------- |
| react-typescript | `nextjs`   | https://github.com/vercel/next.js      |
| component ui     | `mui-core` | https://github.com/mui-org/material-ui |
| state management | `valtio`   | https://github.com/pmndrs/valtio       |
| pixel streaming  | `pureweb`  | https://github.com/calgaryscientific   |

<br />

## Backend (outdated)

Main components that power the web app behind the scenes along with AWS Amplify.  
You will need to install the [aws-cli](https://docs.aws.amazon.com/cli/index.html) and [amplify-cli](https://docs.amplify.aws/cli) to manage advanced settings.

| Component      | Service               | Documentation                         |
| :------------- | :-------------------- | :------------------------------------ |
| authentication | `aws::cognito`        | https://aws.amazon.com/cognito        |
| authorization  | `aws:iam `            | https://aws.amazon.com/iam            |
| db storage     | `aws::dynamodb`       | https://aws.amazon.com/dynamodb       |
| graphql api    | `aws::appsync`        | https://aws.amazon.com/appsync        |
| rest api       | `aws::apigateway`     | https://aws.amazon.com/api-gateway    |
| serverless     | `aws:lambda`          | https://aws.amazon.com/lambda/        |
| file storage   | `aws::s3`             | https://aws.amazon.com/s3             |
| dns            | `aws::route53`        | https://aws.amazon.com/route53        |
| iac            | `aws::cloudformation` | https://aws.amazon.com/cloudformation |
| ci/cd          | `aws::amplify`        | https://aws.amazon.com/amplify        |

<br />

## Commit Types

Using [conventional commits](https://www.conventionalcommits.org/): `<type>(scope): <commit message>`  
Recommend using [commitizen](https://commitizen-tools.github.io/commitizen) to help create commit messages quickly.

| Type     | Title                      | Description                                                                      |
| :------- | :------------------------- | :------------------------------------------------------------------------------- |
| feat     | `Features`                 | A new feature                                                                    |
| fix      | `Bug Fixes`                | A bug fix                                                                        |
| docs     | `Documentation `           | Documentation only changes                                                       |
| style    | `Styles`                   | Changes that do not affect the meaning of the code (formatting, missing spaces)  |
| refactor | `Code Refactoring`         | A code change that neither fixes a bug nor adds a feature                        |
| perf     | `Performance Improvements` | A code change that improves performance                                          |
| test     | `Tests`                    | Adding missing tests or correcting existing tests                                |
| build    | `Builds`                   | Changes that affect the build system or dependencies (scopes: pip, yarn, docker) |
| ci       | `Continuous Integrations`  | Changes to our CI configuration files and scripts (scopes: bitbucket, amplify)   |
| revert   | `Reverts`                  | Reverts a previous commit                                                        |
