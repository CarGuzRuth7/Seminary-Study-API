const challengesResolvers = require("../resolvers/challenges");
const db = require("../db/connection");

// mock the db connection
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

describe("Challenges Resolvers", () => {
  it("should get list of challenges", async () => {
    const mockedChallenges = [
      {
        challengeName: "Daily Scripture Reading",
        description: "Read a chapter from the scriptures every day for a week",
        difficulty: "Beginner",
        points: 50
      }
    ];

    db.getDb()
      .db("seminaryStudy")
      .collection("activities")
      .find.mockReturnValue({ toArray: jest.fn().mockResolvedValue(mockedChallenges) });

    // execute the resolver function
    const result = await challengesResolvers.Query.getChallenges();

    // assertions
    expect(result).toEqual(mockedChallenges);
  });

  it("should submit a challenge", async () => {
    const result = await challengesResolvers.Mutation.submit(null, {
      challengeName: "Some Challenge"
    });
    expect(result).toBe("Submission for Some Challenge received");
  });
});
