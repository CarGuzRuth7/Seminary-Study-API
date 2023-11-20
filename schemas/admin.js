const { gql } = require("apollo-server-core");
//const User = require("./users").usersTypeDefs;

const adminTypeDefs = gql`
  """
  Represent a scripture in the db
  """
  type Admin {
    users: [User]
    username: [User]
  }

  """
  Queries related to users.
  """
  type Query {
    """
    Gets all users (Not implemented yet).
    """
    users: Admin
    """
    Gets a specific user by their username (Not implemented yet).
    """
    getUser(username: String!): User
  }
`;
module.exports = adminTypeDefs;
