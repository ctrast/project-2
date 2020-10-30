const mongoose = require("mongoose");
const measureTypeSchema = new mongoose.Schema({
  measuretype: {
    type: String,
    unique: true,
    default: "",
  },
});
module.exports = mongoose.model("MeasureType", measureTypeSchema);
