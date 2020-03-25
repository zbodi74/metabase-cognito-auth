This application was created from the create-react-app script, and demonstrates how to integrate the AWS Cognito hosted / built in sign-in and sign-up UI content with a React application. See my article [AWS Cognito example using React UI and Node.js REST APIs — part 2 (React UI app with Redux)](https://medium.com/@arron.harden/aws-cognito-example-using-react-ui-and-node-js-rest-apis-part-3-jwt-secured-rest-apis-e56d336ce306) for more information.

## Cognito setup notes

- I had to create an App client with no secret key, otherwise I got a [`invalid_client`](https://github.com/aws/amazon-cognito-auth-js/issues/206) exception.
- App client settings require `Authorization code grant` and `email`, `openid`, `profile`, and (optionally) `aws.cognito.signin.user.admin`.

## Running the application

1. Get Metabase running somewhere and enable JWT
2. Modify `src/config/app-config.json` to match your user pool and application URLs.
    - When running locally, the `signoutUri` will probably need to be `http://localhost:3000/` and the `callbackUri` property will need to be `http://localhost:3000/callback`.
    - Use the JWT Signing Key from from your Metabase settings (http://localhost:3000/admin/settings/authentication/jwt) as the `metabaseSecret`
3. Run `npm install` to setup and install the dependencies.
4. Run `npm start` to start the application. (Or `PORT=3001 npm start` if you're already running Metabase on port 3001)
5. A browser session should automatically open, pointing at `http://localhost:3000` (or 3001).

## JWT secured REST API service
This application will attempt to invoke a simple example REST API using the JWT access code returned in the callback from Cognito. See the repo at https://github.com/arronharden/cognito-demo-service for the implementation of this REST API. A running instance of this REST API is hosted at https://cognito-demo-api.arronharden.com. 

## Example
A running instance of this React application is hosted at https://cognito-demo.arronharden.com.

## About me
I'm a cloud/SaaS architect and lead full stack engineer, living in Milton Keynes (UK). More information about me can be found on my profile at https://arronharden.com.
