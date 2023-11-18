const activities = require("../activities.json"); //testing with json file, need to add db implementation

const challengesResolvers = {
  Query: {
    challenges: () => activities,
    challenge: (_, { challengeName }) =>
      activities.find((challenge) => challenge.challengeName === challengeName)
  },
  Mutation: {
    submit: (_, { challengeName }) => {
      return `Submission for ${challengeName} received`;
    },
    deleteChallenge: (_, { challengeName }) => {
      return `Deleted challenge: ${challengeName}`;
    }
  }
};

module.exports = challengesResolvers;
