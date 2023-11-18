const { gql } = require("apollo-server-express");

const bookTypeDefs = gql`
  """
  Represents a Book in the scriptures
  """
  type ScripturesBook {
    book: String!
    chapter: Int!
    verse: Int!
    content: String!
  }

  extend type Query {
    """
    Retrieve a specific verse from a chapter. (Not implemented yet)
    """
    getVerse(book: String!, chapter: Int!, verse: Int!): ScripturesBook

    """
    Retrieve all books stored in the DB. (Not implemented yet)
    """
    getBooks: [ScripturesBook!]!
  }
`;

module.exports = bookTypeDefs;
