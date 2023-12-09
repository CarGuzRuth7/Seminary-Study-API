const db = require("../db/connection");
const { getToken } = require("../middlewares/getToken");

const userResolvers = {
  Query: {
    getUsers: async () => {
      const usersCollection = db.getDb().db("seminaryStudy").collection("users");
      const users = await usersCollection.find({}).toArray();
      return users;
    },
    AuthInfo: async () => {
      try {
        let isAuth = null;
        const token = getToken();

        if (token) {
          isAuth = true;
        }
        const result = {
          isAuthenticated: isAuth,
          message: isAuth ? "User is authenticated" : "User is not authenticated"
        };

        return [result];
      } catch (error) {
        throw new Error("An error occurred while processing the token.");
      }
    },
    searchUserByUsername: async (_, { username }) => {
      try {
        const usersCollection = db.getDb().db("seminaryStudy").collection("users");
        const user = await usersCollection.findOne({ username: username });

        return user;
      } catch (error) {
        throw new Error("An error occurred while searching for the user.");
      }
    }
  }
};
module.exports = userResolvers;
