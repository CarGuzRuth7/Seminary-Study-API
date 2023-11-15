//graphql resolvers functions

const resolvers = {
  Query: {
    hello: () => {
      return "hello work";
    }
  }
};

module.exports = resolvers;
