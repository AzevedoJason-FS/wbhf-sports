const mongoose = require("mongoose");
const Team = require("../models/teams");

const getTeam = (req, res) => {
  //GET all collections
  const teamSlug = req.params.teamSlug
  try {
    Team.find({ slug: teamSlug })
      .lean()
      .then((result) => {
        console.log(result);
        res.status(200).json({
          Team: result,
        });
      })
      .catch((err) => {
        console.error(err.message);
        res.status(500).json({
          error: {
            message: err.message,
          },
        });
      });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const newTeam = (req, res) => {
  try {
    //get credentials
    const { name, logo, town, social, slug } = req.body;

    const newTeam = new Team({
      name: name,
      logo: logo,
      town: town,
      social: social,
      slug: slug,
    });

    //Write to Database
    newTeam
      .save()
      .then((result) => {
        console.log(result);
        res.status(200).json({
          message: "Team Saved",
          result,
        });
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = { newTeam, getTeam };
