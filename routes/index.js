const express = require("express");
const router = express.Router();
const { auth, requiresAuth } = require("express-openid-connect");
const auth0Config = require("../config/auth0-config");

const customRoutes = {
  postLogoutRedirect: "/logout"
};

// const getIdToken = (req) => {
//   if (req.oidc.isAuthenticated()) {
//     // If the user is logged in
//     const idToken = req.oidc.idToken; // extract idToken
//     return idToken;
//   } else {
//     throw new Error("User not authenticated or user data not available.");
//   }
// };

// Apply authentication middleware with customRoutes as configuration
router.use(auth(auth0Config, customRoutes));

router.get("/logout", (req, res) => res.send("Bye!"));

router.get("/", async (req, res) => {
  requiresAuth();
  try {
    // const idToken = getIdToken(req);

    if (req.oidc.isAuthenticated()) {
      // if the user is logged in
      const username = req.oidc.user.nickname;
      res.status(200).json({
        status: "success",
        message: `Welcome, ${username}! You are logged in.`
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Welcome to your Seminary Study Helper! Please log in to access our features."
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "An error occurred while processing your request." });
  }
});

module.exports = router;
