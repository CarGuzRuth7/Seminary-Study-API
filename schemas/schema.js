const { makeExecutableSchema } = require("@graphql-tools/schema");
// users
const usersTypeDefs = require("./users");
const usersResolvers = require("../resolvers/users");

//doctrinal mastery
const docMasteryTypeDefs = require("./doctrinalMastery");
const docMasteryResolvers = require("../resolvers/doctrinalMastery");

//admin
const adminTypeDefs = require("./admin");
const adminResolvers = require("../resolvers/admin");

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
const mergedTypeDefs = [usersTypeDefs, challengesTypeDefs, docMasteryTypeDefs, adminTypeDefs, quotesTypeDefs, booksTypeDefs];
const mergedResolvers = [usersResolvers, challengesResolvers, docMasteryResolvers, adminResolvers, quotesResolvers, booksResolvers];

const schema = makeExecutableSchema({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers
});

module.exports = {
  schema, // export the schema itself
  typeDefs: mergedTypeDefs // export the typeDefs separately
};
