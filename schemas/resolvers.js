//graphql resolvers functions
const activities = require("../activities.json"); //testing with json file, need to add db implementation

const resolvers = {
  Query: {
    challenges: () => activities,
    challenge: (_, { challengeName }) =>
      activities.find((challenge) => challenge.challengeName === challengeName)
  },
  Mutation: {
    submit: (_, { challengeName }) => {
      // Logic to handle submission
      return `Submission for ${challengeName} received`;
    },
    deleteChallenge: (_, { challengeName }) => {
      // Logic to delete challenge
      return `Deleted challenge: ${challengeName}`;
    }
  }
};

module.exports = resolvers;
