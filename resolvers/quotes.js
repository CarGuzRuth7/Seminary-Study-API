const db = require("../db/connection");
const { ObjectId } = require("mongodb");

const resolvers = {
  Query: {
    getQuotes: async () => {
      try {
        const quotesCollection = db.getDb().db("seminaryStudy").collection("quotes");
        const quotes = await quotesCollection.find().toArray();
        return quotes.map((quote) => ({
          id: quote._id.toString(),
          content: quote.content,
          author: quote.author
        }));
      } catch (error) {
        throw new Error("Unable to fetch quotes.");
      }
    },
    getQuoteById: async (_, { id }) => {
      try {
        const quotesCollection = db.getDb().db("seminaryStudy").collection("quotes");
        const quote = await quotesCollection.findOne({ _id: ObjectId(id) });
        if (!quote) {
          throw new Error("Quote not found");
        }
        return {
          id: quote._id.toString(),
          content: quote.content,
          author: quote.author
        };
      } catch (error) {
        throw new Error("Unable to fetch the quote.");
      }
    }
  },
  Mutation: {
    addQuote: async (_, { content, author }) => {
      try {
        if (!content || typeof content !== "string" || !author || typeof author !== "string") {
          throw new Error("Content and author are required and should be strings");
        }
        const quotesCollection = db.getDb().db("seminaryStudy").collection("quotes");
        const result = await quotesCollection.insertOne({ content, author });
        const createdQuote = await quotesCollection.findOne({ _id: result.insertedId });

        return {
          id: createdQuote._id.toString(),
          content: createdQuote.content,
          author: createdQuote.author
        };
      } catch (error) {
        throw new Error("Unable to create a quote.");
      }
    },
    updateQuote: async (_, { id, content, author }) => {
      try {
        // validate content, author, and mongodb ID before updating a quote
        if (!ObjectId.isValid(id)) {
          throw new Error("Invalid ID: ID should be be a 24 character hex string.");
        }
        if (!id || typeof id !== "string") {
          throw new Error("ID should be a non-empty string");
        }
        if (!content || typeof content !== "string") {
          throw new Error("Content should be a non-empty string");
        }
        if (!author || typeof author !== "string") {
          throw new Error("Author should be a non-empty string");
        }

        const quotesCollection = db.getDb().db("seminaryStudy").collection("quotes");
        const objectId = new ObjectId(id);
        const updatedQuote = await quotesCollection.findOneAndUpdate(
          { _id: objectId },
          { $set: { content, author } },
          { returnOriginal: false }
        );

        if (!updatedQuote) {
          throw new Error("Quote not found");
        } else {
          return {
            id: updatedQuote._id.toString(),
            content: updatedQuote.content,
            author: updatedQuote.author
          };
        }
      } catch (error) {
        throw new Error(`Unable to update the quote: ${error.message}`);
      }
    },
    deleteQuote: async (_, { id }) => {
      try {
        if (!ObjectId.isValid(id)) {
          throw new Error("Invalid ID: ID should be be a 24 character hex string.");
        }
        if (!id || typeof id !== "string") {
          throw new Error("ID should be a non-empty string");
        }
        const quotesCollection = db.getDb().db("seminaryStudy").collection("quotes");
        const deletedQuote = await quotesCollection.findOneAndDelete({ _id: new ObjectId(id) });

        if (!deletedQuote) {
          throw new Error("Quote not found. Try again!");
        } else {
          return "Quote deleted!";
        }
      } catch (error) {
        throw new Error(`Error deleting the quote: ${error.message} `);
      }
    }
  }
};

module.exports = resolvers;
