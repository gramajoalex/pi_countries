const { Country, Activity } = require("../db.js");

const createActivity = async (
  name,
  difficulty,
  duration,
  season,
  countries
) => {
  try {
    const [newActivity, ac] = await Activity.findOrCreate({
      where: {
        name,
        difficulty,
        duration,
        season,
      },
    });

    await newActivity.setCountries(countries);

    return newActivity;
  } catch (err) {
    return err;
  }
};

const getActivities = async () => {
  try {
    const activities = await Activity.findAll();
    return activities;
  } catch {
    return -1;
  }
};

module.exports = {
  createActivity,
  getActivities,
};
