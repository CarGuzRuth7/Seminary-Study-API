//const { schema, typeDefs } = require("../schemas/schema");
const db = require("../db/connection");
//const { ApolloServer } = require("@apollo/server");
// const scriptures = require("../doctrinal_mastery.json");
// const request = require("supertest");
// const graphQLEndpoint = "http://localhost:3000/";
// const fs = require("fs");
// const path = require("path");
const { expect } = require("chai");
const EasyGraphQLTester = require("easygraphql-tester");

const resolver = require("../resolvers/doctrinalMastery");
const schemaCode = require("../schemas/doctrinalMastery");

describe("Test resolvers", () => {
  let tester;
  let database = null;
  beforeAll(async () => {
    tester = new EasyGraphQLTester(schemaCode, resolver);
    database = await db.initDb((err) => {
      if (err) {
        console.error("Error connecting to the database:", err);
      } else {
        console.log("Connected to MongoDB");
        return db.getDb();
      }
    });
  });

  afterAll(async () => {
    await db.stopDb();
  });

  it("returns all scriptures", async () => {
    const allScriptures = `query GetScriptures {
      getScripture {
        scripture
        book
        chapter
        verse
        theme
      }
    }`;
    //const arg = { book: "Alma", chapter: 36, verse: "3" };

    const result = await tester.graphql(allScriptures, undefined, database);
    console.log(result.data);
    expect(undefined).to.be.an("undefined");
    //expect(result.data).to.be.an("object");
  });
});

// describe("get doc mastery resolvers", () => {
//   const allScriptures = {
//     query: `query GetScripture {
//       getScriptures{
//         scripture
//         book
//         chapter
//         verses
//         theme
//       }

//     }`
//   };

//   const getBook = {
//     query: `query GetScripture($book: String!) {
//       getBook(book: $book) {
//         scripture
//       }
//     }`,
//     variables: {
//       book: "Moses"
//     }
//   };

//   const getScripture = {
//     query: `query GetScripture($book: String!, $chapter: Int!, $verse: String!) {
//       getScripture(book: $book, chapter: $chapter, verse: $verse) {
//         book
//         chapter
//         verse
//         scripture
//       }
//     }`,
//     variables: { book: "Abraham", chapter: 2, verse: "9-11" }
//   };

//   it("returns all scriptures", async () => {
//     //called instance of server
//     // const testServer = new ApolloServer({
//     //   schema,
//     //   typeDefs
//     // });

//     //called resolver to test
//     // const resolver = await testServer.executeOperation(allScriptures);
//     // expect(resolver.body.singleResult).toEqual(scriptures);

//     request(graphQLEndpoint)
//       .post("?")
//       .send(allScriptures)
//       .expect(200)
//       .end((error, response) => {
//         //if (error) console.error(error);

//         const res = JSON.parse(response);

//         expect(res.data.scriptures).toEqual(scriptures);
//       });
//   });

//   it("returns a single book", async () => {
//     request(graphQLEndpoint)
//       .post("?")
//       .send(getBook)
//       .expect(200)
//       .end((error, response) => {
//         if (error) console.error(error);

//         const res = JSON.parse(response);

//         expect(res.data.scriptures).toEqual(scriptures);
//       });
//   });

//   it("returns a scripture", async () => {
//     request(graphQLEndpoint)
//       .post("?")
//       .send(getScripture)
//       .expect(200)
//       .end((error, response) => {
//         if (error) console.error(error);

//         const res = JSON.parse(response);

//         expect(res.data.scriptures).toEqual(scriptures);
//       });
//   });
//});
