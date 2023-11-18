const { gql } = require("apollo-server-express");

const quoteTypeDefs = gql`
  """
  Represents a Quote object in the db.
  """
  type Quote {
    id: ID!
    content: String!
    author: String!
  }

  extend type Query {
    """
    Retrieve all quotes.
    """
    getQuotes: [Quote!]!

    """
    Retrieve a quote by ID.
    """
    getQuote(id: ID!): Quote
  }

  extend type Mutation {
    """
    Create a new quote.
    """
    createQuote(content: String!, author: String!): Quote!

    """
    Update an existing quote by ID.
    """
    updateQuote(id: ID!, content: String!, author: String!): Quote!

    """
    Delete a quote by ID.
    """
    deleteQuote(id: ID!): Quote
  }
`;

module.exports = quoteTypeDefs;
