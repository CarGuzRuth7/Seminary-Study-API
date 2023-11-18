const quotesResolvers = {
  Query: {
    getQuotes: async () => {
      return "getQuotes resolver is not implemented yet";
    },
    getQuote: async (_, { id }) => {
      return `getQuote resolver for ID ${id} is not implemented yet`;
    }
  },
  Mutation: {
    createQuote: async (_, { content, author }) => {
      return `createQuote resolver for ${content} by ${author} is not implemented yet`;
    },
    updateQuote: async (_, { id, content, author }) => {
      return `updateQuote resolver for ID ${id} with ${content} by ${author} is not implemented yet`;
    },
    deleteQuote: async (_, { id }) => {
      return `deleteQuote resolver for ID ${id} is not implemented yet`;
    }
  }
};

module.exports = quotesResolvers;
