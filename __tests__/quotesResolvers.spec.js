const db = require("../db/connection");
const quotesResolvers = require("../resolvers/quotes");

jest.mock("../db/connection", () => {
  const mCollection = {
    find: jest.fn(),
    toArray: jest.fn()
  };

  return {
    getDb: jest.fn(() => ({
      db: jest.fn(() => ({
        collection: jest.fn(() => mCollection)
      }))
    }))
  };
});

describe("Quotes Resolvers", () => {
  it("should get the quotes", async () => {
    const mockedQuotes = [
      {
        id: "5f5c78ff431a9b4b294d33a8",
        content: "“There are three powerful things seminary can do. First, it puts young…",
        author: "Henry B. Eyring"
      }
    ];

    const mCollection = db.getDb().db("seminaryStudy").collection("quotes");
    mCollection.find.mockReturnValue({ toArray: jest.fn().mockResolvedValue(mockedQuotes) });

    const result = await quotesResolvers.Query.getQuotes();
    expect(result).toEqual(mockedQuotes);
  });
});
