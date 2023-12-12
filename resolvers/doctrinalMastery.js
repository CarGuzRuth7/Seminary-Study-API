const db = require("../db/connection");

const docMasteryResolvers = {
  Query: {
    scriptures: async () => {
      try {
        return await db
          .getDb()
          .db("seminaryStudy")
          .collection("doctrinal-mastery")
          .find({})
          .toArray();
      } catch (error) {
        throw new Error(`Could not get scriptures list ${error.message}`);
      }
    },
    getBook: async (_, { book }) => {
      try {
        if (!book || typeof book !== "string") {
          throw new Error("Book name is required and should be a string");
        }
        return await db
          .getDb()
          .db("seminaryStudy")
          .collection("doctrinal-mastery")
          .findOne({ book: book });
      } catch (error) {
        throw new Error(`Could not get book list ${error.message}`);
      }
    },

    getScripture: async (_, { book, chapter, verse }) => {
      try {
        if (
          !book ||
          typeof book !== "string" ||
          !chapter ||
          typeof chapter !== "number" ||
          !Number.isInteger(chapter) ||
          chapter < 1 ||
          !verse ||
          typeof verse !== "string"
        ) {
          throw new Error("Invalid input for book, chapter, or verse");
        }
        return await db
          .getDb()
          .db("seminaryStudy")
          .collection("doctrinal-mastery")
          .findOne({ book: book, chapter: chapter, verse: verse });
      } catch (error) {
        throw new Error(`Could not get book list ${error.message}`);
      }
    }
  }
};

module.exports = docMasteryResolvers;
