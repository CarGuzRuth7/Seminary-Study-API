const express = require("express");
const router = express.Router();
const activitiesController = require("../controllers/activities");

// get all activities
router.get("/challenges", (req, res) => {
  const activities = activitiesController.getActivities();
  res.json(activities);
});

// get a specific activity
router.get("/challenges/:challengeName", (req, res) => {
  const { challengeName } = req.params;
  const activity = activitiesController.getActivityByName(challengeName);
  if (activity) {
    res.json(activity);
  } else {
    res.status(404).json({ message: "Activity not found" });
  }
});

// post to submit an activity
router.post("/submit/:challengeName", (req, res) => {
  const { challengeName } = req.params;
  // Handle submission logic here
  res.send(`Submitted activity: ${challengeName}`);
});

// delete a specific activity
router.delete("/challenges/:challengeName", (req, res) => {
  const { challengeName } = req.params;
  activitiesController.deleteActivityByName(challengeName);
  res.send(`Deleted activity: ${challengeName}`);
});

module.exports = router;
