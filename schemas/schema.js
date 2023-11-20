const { makeExecutableSchema } = require("@graphql-tools/schema");
const usersTypeDefs = require("./users");
// const quotesTypeDefs = require("./quotes");
const challengesTypeDefs = require("./challenges");
const docMasteryTypeDefs = require("./doctrinalMastery");
const adminTypeDefs = require("./admin");
const usersResolvers = require("../resolvers/users");

// const quotesResolvers = require("./resolvers/quotes");
const challengesResolvers = require("../resolvers/challenges");
const docMasteryResolvers = require("../resolvers/doctrinalMastery");
const adminResolvers = require("../resolvers/admin");

const mergedTypeDefs = [usersTypeDefs, challengesTypeDefs, docMasteryTypeDefs, adminTypeDefs];

const mergedResolvers = [usersResolvers, challengesResolvers, docMasteryResolvers, adminResolvers];

const schema = makeExecutableSchema({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers
});

module.exports = {
  schema, // Export the schema itself
  typeDefs: mergedTypeDefs // Export the typeDefs separately
};
