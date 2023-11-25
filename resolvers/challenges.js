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
    challenge: async (_, { challengeName }) => {
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
        const activitiesCollection = db.getDb().db("seminaryStudy").collection("activities");
        const newChallenge = {
          challengeName: challengeInput.challengeName,
          description: challengeInput.description,
          difficulty: challengeInput.difficulty,
          points: challengeInput.points
        };

        const result = await activitiesCollection.insertOne(newChallenge);

        if (result.acknowledged) {
          const insertedId = result.insertedId;
          // const insertedChallenge = await activitiesCollection.findOne({ _id: insertedId });
          // console.log(insertedChallenge);
          return {
            success: true,
            message: `Challenge added successfully. Inserted ID: ${insertedId}`
          };
        } else {
          throw new Error("Failed to add challenge");
        }
      } catch (error) {
        throw new Error(`Error adding challenge: ${error.message}`);
      }
    },
    submit: (_, { challengeName }) => {
      return `Submission for ${challengeName} received`;
    },
    deleteChallenge: async (_, { challengeName }) => {
      try {
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
