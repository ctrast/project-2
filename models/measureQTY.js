const mongoose = require("mongoose");
const measureQTYSchema = new mongoose.Schema({
  measureqty: {
    type: String,
    unique: true,
    default: "",
  },
});
module.exports = mongoose.model("MeasureQTY", measureQTYSchema);
