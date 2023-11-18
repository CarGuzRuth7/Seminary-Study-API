const quotesResolvers = {
  Query: {
    getQuotes: async (_, __, context) => {
      // not implemented yet
      return context.Quote.getAllQuotes();
    },
    getQuote: async (_, { id }, context) => {
      // not implemented yet
      return context.Quote.getQuoteById(id);
    }
  },
  Mutation: {
    createQuote: async (_, { content, author }, context) => {
      // not implemented yet
      return context.Quote.createQuote({ content, author });
    },
    updateQuote: async (_, { id, content, author }, context) => {
      // not implemented yet
      return context.Quote.updateQuoteById({ id, content, author });
    },
    deleteQuote: async (_, { id }, context) => {
      // not implemented yet
      return context.Quote.deleteQuoteById(id);
    }
  }
};

module.exports = quotesResolvers;
