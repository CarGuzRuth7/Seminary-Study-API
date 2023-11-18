const { gql } = require("apollo-server-express");

const userTypeDefs = gql`
  """
  Represents a user in the db.
  """
  type User {
    username: String!
    email: String!
  }

  """
  Queries related to users.
  """
  type Query {
    """
    Gets the user's login status (Not implemented yet).
    """
    login: String

    """
    Logs the user out (Not implemented yet).
    """
    logout: String

    """
    Gets the user's profile (Not implemented yet).
    """
    profile: User

    """
    Gets a specific user by their username (Not implemented yet).
    """
    getUser(username: String!): User
  }

  """
  Mutations related to users.
  """
  type Mutation {
    """
    Updates a user's information by their username (Not implemented yet).
    """
    updateUser(username: String!): User

    """
    Deletes a user by their username (Not implemented yet).
    """
    deleteUser(username: String!): String
  }
`;

module.exports = userTypeDefs;
