// authFunctions.js
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const auth0Config = require("../config/auth0-config");

const AUTH0_AUDIENCE = process.env.AUDIENCE;

async function getToken() {
  try {
    const response = await axios.post(`${auth0Config.issuerBaseURL}/oauth/token`, {
      client_id: auth0Config.clientID,
      client_secret: auth0Config.clientSecret,
      audience: AUTH0_AUDIENCE,
      grant_type: "client_credentials"
    });
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
}

module.exports = { getToken };
