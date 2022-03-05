const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");

const CoinSchema = mongoose.Schema({
  symbol: { type: String, required: true },
  price_usd: { type: String, required: true },
  name: { type: String, required: false },
});

module.exports = mongoose.model("Coin", CoinSchema);
