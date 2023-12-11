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

  type Query {
    """
    Retrieve all quotes.
    """
    getQuotes: [Quote]

    """
    Retrieve a quote by ID.
    """
    getQuoteById(id: ID!): Quote
  }

  extend type Mutation {
    """
    Create a new quote.
    """
    addQuote(content: String!, author: String!): Quote!

    """
    Update an existing quote by ID.
    """
    updateQuote(id: ID!, content: String!, author: String!): Quote!

    """
    Delete a quote by ID.
    """
    deleteQuote(id: ID!): String
  }
`;

module.exports = quoteTypeDefs;
