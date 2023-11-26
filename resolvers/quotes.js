const db = require("../db/connection");
const { ObjectID } = require("mongodb");

const quotesResolvers = {
  Query: {
    getQuotes: async () => {
      try {
        const quotesCollection = db.getDb().db("seminaryStudy").collection("quotes");
        const quotes = await quotesCollection.find({}).toArray();
        console.log(quotes);
        return quotes;
      } catch (error) {
        throw new Error(`Error getting the quotes: ${error.message}`);
      }
    },
    getQuoteById: async (_, { id }) => {
      try {
        const quotesCollection = db.getDb().db("seminaryStudy").collection("quotes");
        // convert the ID string to a MongoDB ObjectID
        const objectId = new ObjectID(id);
        const quote = await quotesCollection.findOne({ _id: objectId });

        if (!quote) {
          throw new Error(`Quote with ID ${id} not found`);
        }
        return quote;
      } catch (error) {
        throw new Error(`Error getting quote by ID: ${error.message}`);
      }
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
