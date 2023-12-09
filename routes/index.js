const express = require("express");
const router = express.Router();
const { auth, requiresAuth } = require("express-openid-connect");
const auth0Config = require("../config/auth0-config");

const customRoutes = {
  postLogoutRedirect: "/logout"
};

const getIdToken = (req) => {
  if (req.oidc.isAuthenticated()) {
    // If the user is logged in
    const idToken = req.oidc.idToken; // extract idToken
    return idToken;
  } else {
    throw new Error("User not authenticated or user data not available.");
  }
};

// Apply authentication middleware with customRoutes as configuration
router.use(auth(auth0Config, customRoutes));

router.get("/logout", (req, res) => res.send("Bye!"));

router.get("/", async (req, res) => {
  requiresAuth();
  try {
    const idToken = getIdToken(req);

    if (req.oidc.isAuthenticated()) {
      // if the user is logged in
      const username = req.oidc.user.nickname;
      if (idToken) {
        res.status(200).json({
          status: "success",
          message: `Welcome, ${username}! You are logged in. This is your token: ${idToken}`
        });
      }
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

router.post("/auth0/user-registration", (req, res) => {
  const userDataFromAuth0 = req.body; // user data sent from Auth0
  const userData = setStoredUserData(userDataFromAuth0, res);
  return userData;
});

// Function to set the user data received from Auth0
const setStoredUserData = (userData, res) => {
  // Here, 'userData' is an object that you want to store in cookies
  res.cookie("userData", userData, { maxAge: 86400000, httpOnly: true }); // 'userData' is the cookie name, adjust 'maxAge' as needed
};

module.exports = router;
