const mongoose = require("mongoose");
const Sport = require("../models/sports");

const newSport = (req, res) => {
  try {
    //get credentials
    const { name, slug } = req.body;

    const newSport = new Sport({
      name: name,
      slug: slug,
    });

    //Write to Database
    newSport
      .save()
      .then((result) => {
        console.log(result);
        res.status(200).json({
          message: "Sport Saved",
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

module.exports = { newSport };
