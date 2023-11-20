const booksResolvers = {
  Query: {
    getVerse: () => {
      return "Get Verse functionality not implemented yet";
    },
    getBooks: async () => {
      // for testing
      const books = [
        { book: "1 Nephi", chapter: 22, verse: 31, content: "Content for 1 Nephi" },
        { book: "2 Nephi", chapter: 3, verse: 15, content: "Content for 2 Nephi" }
      ];
      return books;
    }
  }
};

module.exports = booksResolvers;
