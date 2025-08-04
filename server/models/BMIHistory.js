<<<<<<< HEAD
const mongoose = require("mongoose");

const bmiHistorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bmi: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

module.exports = mongoose.model("BMIHistory", bmiHistorySchema);
=======
const mongoose = require("mongoose");

const bmiHistorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bmi: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

module.exports = mongoose.model("BMIHistory", bmiHistorySchema);
>>>>>>> origin/main
