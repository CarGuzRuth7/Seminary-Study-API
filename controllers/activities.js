// using json as a test, need to implement db connection later
const fs = require("fs");
const path = require("path");
const activitiesPath = path.join(__dirname, "../activities.json");

const getActivities = () => {
  const activitiesData = fs.readFileSync(activitiesPath);
  return JSON.parse(activitiesData);
};

const saveActivities = (activities) => {
  fs.writeFileSync(activitiesPath, JSON.stringify(activities, null, 2));
};

const getActivityByName = (name) => {
  const activities = getActivities();
  return activities.find((activity) => activity.challengeName === name);
};

const addActivity = (newActivity) => {
  const activities = getActivities();
  activities.push(newActivity);
  saveActivities(activities);
};

const deleteActivityByName = (name) => {
  const activities = getActivities();
  const filteredActivities = activities.filter((activity) => activity.challengeName !== name);
  saveActivities(filteredActivities);
};

module.exports = {
  getActivities,
  getActivityByName,
  addActivity,
  deleteActivityByName
};
