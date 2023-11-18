const { gql } = require("apollo-server-express");

const challengeTypeDefs = gql`
  """
  Represents a challenge in the db
  """
  type Challenge {
    challengeName: String!
    description: String!
    difficulty: String!
    points: Int!
  }

  """
  Queries related to challenges.
  """
  type Query {
    """
    Get a list of challenges.
    """
    challenges: [Challenge]

    """
    Get a specific challenge by its name.
    """
    challenge(challengeName: String!): Challenge
  }

  """
  Mutations related to challenges.
  """
  type Mutation {
    """
    Submit a challenge.
    """
    submit(challengeName: String!): String

    """
    Delete a challenge by its name.
    """
    deleteChallenge(challengeName: String!): String
  }
`;

module.exports = challengeTypeDefs;
