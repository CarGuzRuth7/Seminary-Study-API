const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const auth0Config = require("../config/auth0-config");

const AUTH0_CLIENT_ID = auth0Config.clientID;
const AUTH0_CLIENT_SECRET = auth0Config.clientSecret;
const AUTH0_BASE_URL = auth0Config.issuerBaseURL;
const AUTH0_TOKEN_URL = `${AUTH0_BASE_URL}/oauth/token`;
// const AUTH0_INFO_URL = `${AUTH0_BASE_URL}/userinfo`;

async function getToken() {
  try {
    const response = await axios.post(
      AUTH0_TOKEN_URL,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: AUTH0_CLIENT_ID,
        client_secret: AUTH0_CLIENT_SECRET,
        audience: " https://seminary-study"
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
}

module.exports = { getToken };
