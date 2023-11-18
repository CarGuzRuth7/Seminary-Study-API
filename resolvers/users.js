// for testing
const users = [
  {
    username: "example_user",
    email: "user@gmail.com"
  }
];

const userResolvers = {
  Query: {
    login: () => {
      // placeholder for login functionality (Not implemented yet)
      return "Login functionality not implemented";
    },
    logout: () => {
      // placeholder for logout functionality (Not implemented yet)
      return "Logout functionality not implemented";
    },
    profile: () => {
      // placeholder for fetching user profile (Not implemented yet)
      // eslint-disable-next-line no-undef
      return users[0]; // For demonstration, returning the first user from the array
    },
    getUser: (_, { username }) => {
      // Placeholder for fetching a specific user by username (Not implemented yet)
      // eslint-disable-next-line no-undef
      return users.find((user) => user.username === username);
    }
  },
  Mutation: {
    updateUser: (_, { username }) => {
      // Placeholder for updating user information (Not implemented yet)
      return users.find((user) => user.username === username);
    },
    deleteUser: (_, { username }) => {
      // Placeholder for deleting a user (Not implemented yet)
      const userIndex = users.findIndex((user) => user.username === username);
      if (userIndex !== -1) {
        users.splice(userIndex, 1);
        return `User ${username} deleted`;
      }
      return `User ${username} not found`;
    }
  }
};

module.exports = userResolvers;
