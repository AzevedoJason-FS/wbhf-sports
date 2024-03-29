const mongoose = require("mongoose");
const Match = require("../models/matches");

const getTeamMatches = (req, res) => {
  //GET all collections
  const team = req.params.teamId;
  try {
    Match.find({ teams: team, status: "finished" })
      .lean()
      .populate({ path: "sport", select: "name" })
      .populate({ path: "results", populate: { path: "team", select: "name logo" } })
      .then((result) => {
        console.log(result);
        res.status(200).json({
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
  const page = parseInt(req.query.page);
  const pageSize = parseInt(req.query.pageSize);

  // Calculate the start and end indexes for the requested page
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;

  //GET finished matches
  try {
    Match.find({ status: "finished" })
      .sort({ updated_at: -1 })
      .lean()
      .populate({ path: "sport", select: "name" })
      .populate({ path: "results", populate: { path: "team", select: "name logo slug" } })
      .then((result) => {
        // Slice the products array based on the indexes
        const matches = result.slice(startIndex, endIndex);

        // Calculate the total number of pages
        const totalPages = Math.ceil(result.length / pageSize);

        res.status(200).json({ matches, totalPages });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
