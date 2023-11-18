const { makeExecutableSchema } = require("@graphql-tools/schema");
const usersTypeDefs = require("./users");
// const quotesTypeDefs = require("./quotes");
const challengesTypeDefs = require("./challenges");
const usersResolvers = require("../resolvers/users");

// const quotesResolvers = require("./resolvers/quotes");
const challengesResolvers = require("../resolvers/challenges");

const mergedTypeDefs = [usersTypeDefs, challengesTypeDefs];

const mergedResolvers = [usersResolvers, challengesResolvers];

const schema = makeExecutableSchema({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers
});

module.exports = {
  schema, // Export the schema itself
  typeDefs: mergedTypeDefs // Export the typeDefs separately
};
