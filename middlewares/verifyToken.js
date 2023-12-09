const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const AUTH0_DOMAIN = process.env.ISSUER_BASE_URL;
const AUTH0_AUDIENCE = process.env.AUDIENCE;
const JWKS_URI = `https://${AUTH0_DOMAIN}/.well-known/jwks.json`;

const verifyToken = async (bearerToken) => {
  const client = jwksClient({
    jwksUri: JWKS_URI
  });

  function getJwksClientKey(header, callback) {
    client.getKey(header.kid, function (error, key) {
      const signingkey = key.publicKey || key.rsaPublicKey;
      callback(null, signingkey);
    });
  }
  return new Promise((resolve, reject) => {
    jwt.verify(
      bearerToken,
      getJwksClientKey,
      {
        audience: AUTH0_AUDIENCE,
        issuer: AUTH0_DOMAIN,
        algorithms: ["RS256"]
      },
      function (err, decoded) {
        if (err) reject(err);
        resolve(decoded);
      }
    );
  });
};

module.exports = verifyToken;
