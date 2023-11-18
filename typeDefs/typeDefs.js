const { gql } = require("apollo-server-express");
const challengeTypeDefs = require("./challengeTypeDefs");

// merge all type definitions
const typeDefs = [challengeTypeDefs];

// merge all type definitions into a single schema
const schema = typeDefs.reduce(
  // concatenates all the type definitions into one schema
  (accumulator, currentTypeDef) => {
    // define a GraphQL schema
    // accumulator adds the previously accumulated schema
    // currentTypeDef adds the current type definition to the schema
    return gql`
      ${accumulator}
      ${currentTypeDef}
    `;
  },
  "" // initial value for the accumulator is an empty string
);

module.exports = schema;
