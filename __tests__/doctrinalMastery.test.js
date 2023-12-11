const { expect } = require("chai");
const EasyGraphQLTester = require("easygraphql-tester");
const sinon = require("sinon");
const resolver = require("../resolvers/doctrinalMastery");
const schemaCode = require("../schemas/doctrinalMastery");
const connectionModule = require("../db/connection");

let tester;
const dbStub = sinon.stub(connectionModule, "getDb");

beforeAll(() => {
  dbStub.returns({
    db: () => ({
      collection: () => ({
        find: () => ({
          toArray: () => [
            {
              book: "Moses",
              chapter: 1,
              verse: "39",
              scripture: "For behold, this is my work and my glory—to bring to pass the immortality and eternal life of man.",
              theme: "Old Testament"
            },
            {
              book: "Moses",
              chapter: 7,
              verse: "18",
              scripture: "And the Lord called his people Zion, because they were of one heart and one mind, and dwelt in righteousness; and there was no poor among them.",
              theme: "Old Testament"
            }
          ]
        })
      })
    })
  });

  tester = new EasyGraphQLTester(schemaCode, resolver);
});

describe("GraphQL Resolvers", () => {
  it("should return scriptures list", async () => {
    const query = `
      {
        scriptures {
          book
          chapter
          verse
          scripture
          theme
        }
      }
    `;

    try {
      const result = await tester.graphql(query);
      expect(result.data.scriptures).to.be.an("array");
    } catch (error) {
      throw error;
    }
  });

  it("should return a scripture by book", async () => {
    const query = `
      query GetBook($book: String!) {
        getBook(book: $book) {
          book
          chapter
          verse
          scripture
          theme
        }
      }
    `;

    const variables = { book: "Moses" };

    try {
      const result = await tester.graphql(query, {}, variables);
      expect(result.data.getBook).to.exist;
    } catch (error) {
      throw error;
    }
  });

  it("should return a scripture by book, chapter, and verse", async () => {
    const query = `
      query GetScripture($book: String, $chapter: Int, $verse: String) {
        getScripture(book: $book, chapter: $chapter, verse: $verse) {
          book
          chapter
          verse
          scripture
          theme
        }
      }
    `;

    const variables = {
      book: "Moses",
      chapter: 1,
      verse: "39"
    };

    try {
      const result = await tester.graphql(query, {}, variables);
      expect(result.data.getScripture).to.exist;
    } catch (error) {
      throw error;
    }
  });

  it("should handle error when fetching a scripture by non-existing book", async () => {
    const query = `
      query GetScripture($book: String, $chapter: Int, $verse: String) {
        getScripture(book: $book, chapter: $chapter, verse: $verse) {
          book
          chapter
          verse
          scripture
          theme
        }
      }
    `;

    const variables = {
      book: "InvalidBook",
      chapter: 1,
      verse: "1"
    };

    try {
      await tester.graphql(query, {}, variables);
      // If it reaches here without throwing an error, the test failed
      throw new Error("Expected an error but received success.");
    } catch (error) {
      expect(error.message).to.equal("Could not get book list Book 'InvalidBook' not found.");
    }
  });

    const variables = { book: "John" };

    try {
      await tester.graphql(query, {}, variables);
      throw new Error("Expected an error but received success.");
    } catch (error) {
      expect(error.message).to.equal("Could not get book list Book 'John' not found.");
    }
  });

afterAll(() => {
  dbStub.restore();
});
