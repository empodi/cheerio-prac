/*
import "./db";
import "./Problem";
import express from "express";

const PORT = 8765;

const app = express();
const handleListen = () => console.log(`Server Listening on port ${PORT}`);
app.listen(PORT, handleListen);
*/
const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

const options = {
  method: "GET",
  url: "https://solved.ac/api/v3/search/problem",
  params: { query: "solved_by:statkwon" },
  headers: { "Content-Type": "application/json" },
};

const getGolds = async () => {
  const result = await axios.request(options);
  //console.log(count);
  console.log(result.data.count);
  console.log(result.status);
};

getGolds();
