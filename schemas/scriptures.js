const { gql } = require("apollo-server-express");

const scripturesDefs = gql`
  """
  Represents a Scripture to master
  """
  type Scripture {
    book: String!
    chapter: Int!
    verses: [String]!
    scripture: String!
    theme: String!
  }

  """
  Queries related to scriptures.
  """
  type Query {
    """
    Get all the scriptures to master present in the database
    """
    getScriptures: [Scripture]!
  }

  """
  Mutations related to scriptures.
  """
  type Mutation {
    """
    Get scriptures by providing search input
    """
    searchScriptures(searchInput: String): [Scripture]!
  }
`;

module.exports = scripturesDefs;
