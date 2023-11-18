const { makeExecutableSchema } = require("@graphql-tools/schema");
const usersTypeDefs = require("./users");
const usersResolvers = require("../resolvers/users");

const quotesTypeDefs = require("./quotes");
const quotesResolvers = require("../resolvers/quotes");

const challengesTypeDefs = require("./challenges");
const challengesResolvers = require("../resolvers/challenges");

const mergedTypeDefs = [usersTypeDefs, challengesTypeDefs, quotesTypeDefs];

const mergedResolvers = [usersResolvers, challengesResolvers, quotesResolvers];

const schema = makeExecutableSchema({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers
});

module.exports = {
  schema, // Export the schema itself
  typeDefs: mergedTypeDefs // Export the typeDefs separately
};
