const { makeExecutableSchema } = require("@graphql-tools/schema");
// users
const usersTypeDefs = require("./users");
const usersResolvers = require("../resolvers/users");
// quotes
const quotesTypeDefs = require("./quotes");
const quotesResolvers = require("../resolvers/quotes");
// challenges
const challengesTypeDefs = require("./challenges");
const challengesResolvers = require("../resolvers/challenges");
// books
const booksTypeDefs = require("./books");
const booksResolvers = require("../resolvers/books");

// merge typeDefs and resolvers
const mergedTypeDefs = [usersTypeDefs, challengesTypeDefs, quotesTypeDefs, booksTypeDefs];
const mergedResolvers = [usersResolvers, challengesResolvers, quotesResolvers, booksResolvers];

const schema = makeExecutableSchema({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers
});

module.exports = {
  schema, // export the schema itself
  typeDefs: mergedTypeDefs // export the typeDefs separately
};
