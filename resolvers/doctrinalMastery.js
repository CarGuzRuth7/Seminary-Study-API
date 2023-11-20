const scriptures = require("../doctrinal_mastery.json"); //testing with json file, need to add db implementation

const docMasteryResolvers = {
  Query: {
    scriptures: () => scriptures,
    getBook: (_, { book }) => scriptures.find((scripture) => scripture.book === book),
    getScripture: (_, { book, chapter, verse }) =>
      scriptures.find((scripture) => {
        scripture.book === book, scripture.chapter === chapter, scripture.verse === verse;
      }),
    progress: () => {
      return "Functionality not implemented yet";
    }
  }
};

module.exports = docMasteryResolvers;
