const mongoose = require("mongoose");

const matchesSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
  },
  sport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sports",
    required: true,
  },
  teams:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teams",
      required: true
    }
  ],
  results: [
    {
      score: {
        type: Number,
      },
      team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teams",
        required: true
      },
    },
  ],
  status: {
    type: String,
    required: true,
  },
  updated_at: {
    type: Date
  }
});

module.exports = mongoose.model("matches", matchesSchema);
