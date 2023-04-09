
const express = require('express');
const app = express()
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");

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

app.get("/subscribers/:id", getSubscriber, (req, res) => {
  res.json(res.subscriber);
});

async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res.status(400).json({ message: "Subscriber not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.subscriber = subscriber;
  next();
}
module.exports = app;