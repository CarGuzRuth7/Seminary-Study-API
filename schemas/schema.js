const { makeExecutableSchema } = require("@graphql-tools/schema");
// users
const usersTypeDefs = require("./users");
const usersResolvers = require("../resolvers/users");

//doctrinal mastery
const docMasteryTypeDefs = require("./doctrinalMastery");
const docMasteryResolvers = require("../resolvers/doctrinalMastery");

// quotes
const quotesTypeDefs = require("./quotes");
const quotesResolvers = require("../resolvers/quotes");
// challenges
const challengesTypeDefs = require("./challenges");
const challengesResolvers = require("../resolvers/challenges");

// scriptures
const scripturesTypeDefs = require("./scriptures");
const scripturesResolvers = require("../resolvers/scriptures");

// merge typeDefs and resolvers
const mergedTypeDefs = [
  usersTypeDefs,
  challengesTypeDefs,
  docMasteryTypeDefs,
  quotesTypeDefs,
  scripturesTypeDefs
];
const mergedResolvers = [
  usersResolvers,
  challengesResolvers,
  docMasteryResolvers,
  quotesResolvers,
  scripturesResolvers
];

const schema = makeExecutableSchema({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers
});

module.exports = {
  schema, // export the schema itself
  typeDefs: mergedTypeDefs // export the typeDefs separately
};
