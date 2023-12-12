const db = require("../db/connection");

const challengesResolvers = {
  Query: {
    getChallenges: async () => {
      try {
        const activitiesCollection = db.getDb().db("seminaryStudy").collection("activities");
        const challenges = await activitiesCollection.find({}).toArray();
        return challenges;
      } catch (error) {
        throw new Error(`Error fetching challenges: ${error.message}`);
      }
    },
    getChallengeByName: async (_, { challengeName }) => {
      try {
        const activitiesCollection = db.getDb().db("seminaryStudy").collection("activities");
        const challenge = await activitiesCollection.findOne({ challengeName });
        return challenge;
      } catch (error) {
        throw new Error(`Error fetching challenge: ${error.message}`);
      }
    }
  },
  Mutation: {
    addChallenge: async (_, { challengeInput }) => {
      try {
        // validate input fields before processing further
        if (
          !challengeInput ||
          !challengeInput.challengeName ||
          !challengeInput.description ||
          !challengeInput.difficulty ||
          !challengeInput.points
        ) {
          throw new Error("All fields are required for adding a challenge");
        }
        if (
          typeof challengeInput.challengeName !== "string" ||
          challengeInput.challengeName.length < 2
        ) {
          throw new Error("Challenge name should be a string of at least 2 characters");
        }
        if (
          typeof challengeInput.description !== "string" ||
          challengeInput.description.length < 5
        ) {
          throw new Error("Description should be a string of at least 5 characters");
        }
        if (!Number.isInteger(challengeInput.points) || challengeInput.points <= 0) {
          throw new Error("Points should be a positive integer");
        }

        const activitiesCollection = db.getDb().db("seminaryStudy").collection("activities");
        const newChallenge = {
          challengeName: challengeInput.challengeName,
          description: challengeInput.description,
          difficulty: challengeInput.difficulty,
          points: challengeInput.points
        };

        // console.log(newChallenge);

        const result = await activitiesCollection.insertOne(newChallenge);
        if (result.acknowledged) {
          const insertedId = result.insertedId;
          const insertedChallenge = await activitiesCollection.findOne({ _id: insertedId });
          return insertedChallenge;
        } else {
          throw new Error("Failed to add challenge");
        }
      } catch (error) {
        throw new Error(`Error adding challenge: ${error.message}`);
      }
    },
    submit: (_, { challengeName }) => {
      if (!challengeName || typeof challengeName !== "string") {
        throw new Error("Challenge name is required and should be a string");
      }
      return `Submission for ${challengeName} received`;
    },
    deleteChallenge: async (_, { challengeName }) => {
      try {
        if (!challengeName || typeof challengeName !== "string") {
          throw new Error("Challenge name is required and should be a string");
        }
        const activitiesCollection = db.getDb().db("seminaryStudy").collection("activities");
        const deletedChallenge = await activitiesCollection.deleteOne({ challengeName });
        if (deletedChallenge.deletedCount === 1) {
          return `Deleted challenge: ${challengeName}`;
        } else {
          return `Challenge ${challengeName} not found`;
        }
      } catch (error) {
        throw new Error(`Error deleting challenge: ${error.message}`);
      }
    }
  }
};

module.exports = challengesResolvers;
