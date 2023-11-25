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
  Represents input for adding a new challenge in the db
  """
  input ChallengeInput {
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
    getChallenges: [Challenge]

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

    """
    Add a new challenge.
    """
    addChallenge(challengeInput: ChallengeInput!): Challenge
  }
`;

module.exports = challengeTypeDefs;
