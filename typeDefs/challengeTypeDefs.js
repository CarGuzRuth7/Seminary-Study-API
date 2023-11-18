const { gql } = require("apollo-server-express");

const challengeTypeDefs = gql`
  type Challenge {
    challengeName: String!
    description: String!
    difficulty: String!
    points: Int!
  }

  type Query {
    challenges: [Challenge]
    challenge(challengeName: String!): Challenge
  }

  type Mutation {
    submit(challengeName: String!): String
    deleteChallenge(challengeName: String!): String
  }
`;

module.exports = challengeTypeDefs;
