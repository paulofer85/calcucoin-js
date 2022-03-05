const express = require("express");
const router = express.Router();
const Coin = require("../models/Coin");
const marketCoin = require("../utils/marketCoin");

//ROUTES

//Get all coins
router.get("/", async (req, res) => {
  try {
    const coins = await Coin.find();
    res.json(coins);
  } catch (err) {
    res.json({ message: err });
  }
});

//Get specific coins
router.get("/:coinId", async (req, res) => {
  try {
    const coin = await Coin.find({ _id: req.params.coinId });
    res.json(coin);
  } catch (err) {
    res.json({ message: err });
  }
});

//Create new coin
router.post("/", async (req, res) => {
  const coin = new Coin({
    symbol: req.body.symbol,
    name: req.body.name,
    price_usd: req.body.price_usd,
  });

  /*
  //As a promise: delete async 
    coin
    .save()
    .then((data) => res.json(data))
    .catch((err) => {
      res.json({ message: err });
    });
  */
  try {
    const savedCoin = await coin.save();
    res.json(savedCoin);
  } catch (err) {
    res.json({ message: err });
  }
});

//Create new coin
router.post("/populate", async (req, res) => {
  try {
    marketCoin.getQuotes().then(async (coins) => {
      var result = [];
      for (let i = 0; i < coins.data.length; i++) {
        const marketCoin = coins.data[i];
        const coin = new Coin({
          symbol: marketCoin.symbol,
          name: marketCoin.name,
          price_usd: marketCoin.quote.USD.price,
        });
        result.push(coin);
      }
      Coin.bulkSave(result);
      res.json(result);
    });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

//Delete specific coins
router.delete("/:coinId", async (req, res) => {
  try {
    const coin = await Coin.deleteOne({ _id: req.params.coinId });
    res.json(coin);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update specific coins
router.patch("/:coinId", async (req, res) => {
  try {
    const coin = await Coin.updateOne(
      { _id: req.params.coinId },
      { $set: { title: req.body.title } }
    );
    res.json(coin);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
