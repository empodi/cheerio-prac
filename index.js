/*
import express from "express";

const PORT = 8765;

const app = express();
const handleListen = () => console.log(`Server Listening on port ${PORT}`);
app.listen(PORT, handleListen);
*/

//console.log("haha");

const cheerio = require("cheerio");
const axios = require("axios");

let pArray = [];

axios({
  url: "https://www.acmicpc.net/problem/tags",
  method: "GET",
})
  .then((response) => {
    const $ = cheerio.load(response.data);
    const contents = $(
      "body > div.wrapper > div.container.content > div:nth-child(5) > div > div > table > tbody > tr > td:first-child > a"
    );
    contents.each((index, elem) => {
      let str = $(elem).text();
      //console.log(str);
      //str = str.replace(/[#_a-zA-Z]/g, "").trim();
      //str = str.replace(/\_/g, "");
      //str = str.replace(/[a-z]/g, "");
      //console.log(str.trim());
      pArray.push(str.trim());
      //console.log(pArray.length);
      //if (pArray.length == 190) console.log(pArray);
    });
  })
  .catch((err) => console.log("ERROR"));

axios({
  url: "https://www.acmicpc.net/user/empodi",
  method: "GET",
})
  .then((response) => {
    const $ = cheerio.load(response.data);
    const problems = $(
      "body > div.wrapper > div.container.content > div.row > div:nth-child(2) > div > div.col-md-9 > div:nth-child(2) > div.panel-body > div > a"
    );

    problems.each((index, elem) => {
      console.log($(elem).text());
    });
  })
  .catch((err) => console.log("ERROR"));
