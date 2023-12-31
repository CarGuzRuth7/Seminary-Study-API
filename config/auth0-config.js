const dotenv = require("dotenv");
dotenv.config();

// determine the base URL based on the environment
let baseURL;
if (process.env.NODE_ENV === "production") {
  // Use the deployed URL when in production
  baseURL = "https://seminary-study.onrender.com/";
} else {
  // Use localhost when running locally
  baseURL = "http://localhost:3000/";
}

module.exports = {
  authRequired: true,
  auth0Logout: true,
  baseURL: baseURL,
  clientID: process.env.CLIENT_ID, // Auth0 Client ID
  issuerBaseURL: process.env.ISSUER_BASE_URL, // Auth0 Domain
  clientSecret: process.env.SECRET // Auth0 Client Secret
};
