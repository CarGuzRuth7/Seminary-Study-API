const db = require("../db/connection");

const scripturesResolvers = {
  Query: {
    getScriptures: async () => {
      const scriptureCollection = db.getDb().db("seminaryStudy").collection("books");
      const scripture = await scriptureCollection.find({}).toArray();

      // split verses when "-" is encountered
      const processedScripture = scripture.map((entry) => {
        if (entry["verse(s)"].includes("-")) {
          // if multiple verses are found, split them into an array
          return {
            ...entry, //copies all properties of entry
            verses: entry["verse(s)"].split("-")
          };
        } else {
          return {
            // if only one verse is present create an array with a single entry
            ...entry,
            verses: [entry["verse(s)"]]
          };
        }
      });

      return processedScripture;
    }
  },
  Mutation: {
    searchScriptures: async (_, { book, chapter, theme, verses }) => {
      const scriptureCollection = db.getDb().db("seminaryStudy").collection("books");

      const query = {};

      if (book) {
        query.book = book;
      }
      if (chapter) {
        query.chapter = chapter;
      }
      if (theme) {
        query.theme = theme;
      }

      if (verses) {
        if (verses.includes("-")) {
          const [startVerse, endVerse] = verses.split("-").map(Number);
          query.chapter = chapter; // assuming chapter is already provided
          query["verse(s)"] = { $gte: startVerse, $lte: endVerse };
        } else {
          query.chapter = chapter; // assuming chapter is already provided
          query["verse(s)"] = Number(verses);
        }
      }

      const result = await scriptureCollection.find(query).toArray();
      const processedScripture = result.map((entry) => {
        if (entry["verse(s)"].includes("-")) {
          return {
            ...entry,
            verses: entry["verse(s)"].split("-").map(String)
          };
        } else {
          return {
            ...entry,
            verses: [String(entry["verse(s)"])]
          };
        }
      });

      return processedScripture;
    }
  }
};

module.exports = scripturesResolvers;
