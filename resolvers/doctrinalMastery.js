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
