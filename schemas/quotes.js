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
    Retrieve all quotes. (Not implemented yet)
    """
    getQuotes: [Quote!]!

    """
    Retrieve a quote by ID. (Not implemented yet)
    """
    getQuote(id: ID!): Quote
  }

  extend type Mutation {
    """
    Create a new quote. (Not implemented yet)
    """
    createQuote(content: String!, author: String!): Quote!

    """
    Update an existing quote by ID. (Not implemented yet)
    """
    updateQuote(id: ID!, content: String!, author: String!): Quote!

    """
    Delete a quote by ID. (Not implemented yet)
    """
    deleteQuote(id: ID!): Quote
  }
`;

module.exports = quoteTypeDefs;
