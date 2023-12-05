//const { schema, typeDefs } = require("../schemas/schema");
//const { ApolloServer } = require("@apollo/server");
const activities = require("../activities.json");
const request = require("supertest");
const graphQLEndpoint = "http://localhost:3000/";

describe("get activities resolvers", () => {
  const allActivities = {
    query: `query GetActivity {
      getActivity{
        challengeName
        description
        difficulty
        points
      }

    }`
  };

  const getChallengeName = {
    query: `query GetChallengeName($challengeName: String!) {
      getChallengeName(challengeName: $challengeName) {
        challengeName
      }
    }`,
    variables: {
      challengeName: "Daily Scripture Reading"
    }
  };

  const getDescription = {
    query: `query GetDescription($description: String!) {
      getDescription(description: $description) {
        description
      }
    }`,
    variables:{
        description: "Read a chapter from the scriptures every day for a week"
    }
  };

  it("returns an activity", async () => {
    //called instance of server
    // const testServer = new ApolloServer({
    //   schema,
    //   typeDefs
    // });

    //called resolver to test
    // const resolver = await testServer.executeOperation(allScriptures);
    // expect(resolver.body.singleResult).toEqual(scriptures);

    request(graphQLEndpoint)
      .post("?")
      .send(allActivities)
      .expect(200)
      .end((error, response) => {
        //if (error) console.error(error);

        const res = JSON.parse(response);

        expect(res.data.activities).toEqual(activities);
      });
  });

  it("returns a single activity challenge name", async () => {
    request(graphQLEndpoint)
      .post("?")
      .send(getChallengeName)
      .expect(200)
      .end((error, response) => {
        if (error) console.error(error);

        const res = JSON.parse(response);

        expect(res.data.activities).toEqual(activities);
      });
  });

  it("returns a description", async () => {
    request(graphQLEndpoint)
      .post("?")
      .send(getDescription)
      .expect(200)
      .end((error, response) => {
        if (error) console.error(error);

        const res = JSON.parse(response);

        expect(res.data.activities).toEqual(activities);
      });
  });
});
