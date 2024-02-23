const mongoose = require("mongoose");
const Match = require("../models/matches");

const getTeamMatches = (req, res) => {
    //GET all collections
    const team = req.body.team
    try {
      Match.find({ teams: team })
        .lean()
        .populate({ path: "sport", select: "name" })
        .populate({ path: "results", populate: { path: "team", select: "name logo" } })
        .then((result) => {
          console.log(result);
          res.status(200).json({
            message: "Matches",
            matches: result,
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

const getMatches = (req, res) => {
  //GET all collections
  try {
    Match.find({ status: "upcoming" })
      .lean()
      .populate({ path: "sport", select: "name" })
      .populate({ path: "results", populate: { path: "team", select: "name logo" } })
      .then((result) => {
        console.log(result);
        res.status(200).json({
          message: "Matches",
          matches: result,
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

const getFinishedMatches = (req, res) => {
  //GET finished matches
  try {
    Match.find({ status: "finished" })
      .sort({ updated_at: -1 })
      .lean()
      .populate({ path: "sport", select: "name" })
      .populate({ path: "results", populate: { path: "team", select: "name logo" } })
      .then((result) => {
        console.log(result);
        res.status(200).json({
          message: "Matches",
          matches: result,
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

const newMatch = (req, res) => {
  try {
    //get credentials
    const { name, date, time, sport, teams, results, status } = req.body;

    const newMatch = new Match({
      name: name,
      date: date,
      time: time,
      sport: sport,
      teams: teams,
      results: results,
      status: status,
    });

    //Write to Database
    newMatch
      .save()
      .then((result) => {
        console.log(result);
        res.status(200).json({
          message: "Match Saved",
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

module.exports = { getMatches, getFinishedMatches, newMatch, getTeamMatches };
