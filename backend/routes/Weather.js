const express = require("express");
const axios = require("axios");
const router = express.Router();
const db = require("../db");
require("dotenv").config();

router.get("/weather", async (req, res) => {
  const { city } = req.query;
  const options = {
    method: "GET",
    url: `https://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}`,
    params: {
      query: city,
    },
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Request Failed" });
  }
});

router.post("/store-search", async (req, res) => {
  const { city, weatherData, username, timestamp } = req.body;

  const query =
    "INSERT INTO searches (username, city, weather, timestamp) VALUES (?, ?, ?, ?)";
  const values = [username, city, JSON.stringify(weatherData), timestamp];

  try {
    await db.query(query, values);
    res.status(201).json({ message: "Search data stored successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error storing search data" });
  }
});

router.get("/searches", async (req, res) => {
  const { username } = req.query;

  const query =
    "SELECT * FROM searches WHERE username = ? ORDER BY timestamp DESC";

  try {
    const [results] = await db.query(query, [username]);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching search data" });
  }
});

module.exports = router;
