const { mergeTypeDefs } = require("@graphql-tools/merge");
const { mergeResolvers } = require("@graphql-tools/merge");

// importing type definitions
const challengeTypeDefs = require("../typeDefs/challengeTypeDefs");
const userTypeDefs = require("../typeDefs/userTypeDefs");

// importing resolvers
const { activitiesResolvers, userResolvers } = require("./resolvers");

// Mmrge type definitions
const mergedTypeDefs = mergeTypeDefs([challengeTypeDefs, userTypeDefs]);

// merge resolvers
const mergedResolvers = mergeResolvers([activitiesResolvers, userResolvers]);

module.exports = {
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers
};
