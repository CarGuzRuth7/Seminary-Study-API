const challengeTypeDefs = require("./challengeTypeDefs");
const userTypeDefs = require("./userTypeDefs");
const resolvers = require("../schemas/resolvers");

const schemas = {
  typeDefs: [challengeTypeDefs, userTypeDefs],
  resolvers: [resolvers.activitiesResolvers, resolvers.userResolvers]
};

module.exports = schemas;
