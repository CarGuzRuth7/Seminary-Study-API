const users = [
  {
    username: "example_user",
    email: "user@gmail.com"
  },
  {
    username: "example2_user",
    email: "user2@gmail.com"
  }
];
const adminResolvers = {
  Query: {
    users: () => users,
    getUser: (_, { username }) => {
      return users.find((user) => user.username === username);
    }
  }
};

module.exports = adminResolvers;
