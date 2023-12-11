const { gql } = require("apollo-server-express");

const userTypeDefs = gql`
  """
  Represents a user in the db.
  """
  type User {
    username: String!
    email: String!
    firstName: String!
    lastName: String!
  }
  type AuthInfo {
    isAuthenticated: Boolean!
    message: String!
  }

  """
  Queries related to users.
  """
  type Query {
    """
    Gets the user's authentification status.
    """
    AuthInfo: [AuthInfo]

    """
    Gets users list.
    """
    getUsers: [User]
    """
    Search for a user by username.
    """
    searchUserByUsername(username: String!): User
  }
`;

module.exports = userTypeDefs;
