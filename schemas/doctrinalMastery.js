const { gql } = require("apollo-server-core");

const docMasteryTypeDefs = gql`
  """
  Represent a scripture in the db
  """
  type Scriptures {
    book: String!
    chapter: Int!
    verse: String!
    scripture: String!
    theme: String!
  }

  """
  Queries related to doctrinal mastery.
  """
  type Query {
    """
    Get a list of scriptures.
    """
    scriptures: [Scriptures]
    """
    Get a scripture by book.
    """
    getBook(book: String!): Scriptures
    """
    Get a scripture by book, chapter and verse.
    """
    getScripture(book: String!, chapter: Int!, verses: String!): Scriptures

    """
    Get a user's progress (Not implemented yet).
    """
    progress: User
  }
`;
module.exports = docMasteryTypeDefs;
