const express = require('express');
const app = express()
const mongoose = require("mongoose");
const Subscriber = require("./models/subscribers");

app.use(express.json());

app.get("/subscribers", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/subscribers/names", async (req, res) => {
  try {
    const subscribers = await Subscriber.find().select("name subscribedChannel");
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/subscribers/:id", async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    if (!subscriber) {
      return res.status(400).json({ message: "Invalid Subscriber ID" });
    }
    res.status(200).json(subscriber);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = app;
