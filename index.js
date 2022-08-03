/*
import express from "express";

const PORT = 8765;

const app = express();
const handleListen = () => console.log(`Server Listening on port ${PORT}`);
app.listen(PORT, handleListen);
*/

const cheerio = require("cheerio");
const axios = require("axios");

function getTags() {
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
        if (pArray.length == 190) console.log(pArray);
      });
    })
    .catch((err) => console.log("getTags: ERROR"));
}

function getUserProblems() {
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
    .catch((err) => console.log("getUserProblems: ERROR"));
}

const getAllGoldProblems = async () => {
  //const levelArray = [11, 12, 13, 14, 15];
  //console.log(levelArray);

  let goldProblems = [];
  try {
    const content = await axios.get(
      "https://www.acmicpc.net/problemset?sort=no_asc&solvedac_option=xz%2Cxn&tier=11%2C12%2C13%2C14%2C15"
    );
    const $ = cheerio.load(content.data);
    const page = $(
      "body > div.wrapper > div.container.content > div:nth-child(6) > div:nth-child(2) > div > ul > li:last-child > a"
    );
    console.log(page.text());
    const maxpage = Number(page.text());

    for (let i = 1; i <= maxpage; i++) {
      const conts = await axios.get(
        `https://www.acmicpc.net/problemset?sort=no_asc&solvedac_option=xz%2Cxn&tier=11%2C12%2C13%2C14%2C15&page=${i}`
      );
      const $ = cheerio.load(conts.data);
      const probs = $("#problemset > tbody > tr > td:first-child");
      probs.each((index, elem) => {
        //console.log($(elem).text());
        goldProblems.push($(elem).text());
      });
    }
    console.log(goldProblems.length);
  } catch (err) {
    console.log(err);
  }
};

const getAllBronzeProblems = async () => {
  //const levelArray = [11, 12, 13, 14, 15];
  //console.log(levelArray);

  let bronzeProblems = [];
  try {
    const content = await axios.get(
      "https://www.acmicpc.net/problemset?sort=no_asc&solvedac_option=xz%2Cxn&tier=1%2C2%2C3%2C4%2C5"
    );
    const $ = cheerio.load(content.data);
    const page = $(
      "body > div.wrapper > div.container.content > div:nth-child(6) > div:nth-child(2) > div > ul > li:last-child > a"
    );
    console.log(page.text());
    const maxpage = Number(page.text());

    for (let i = 1; i <= maxpage; i++) {
      const conts = await axios.get(
        `https://www.acmicpc.net/problemset?sort=no_asc&solvedac_option=xz%2Cxn&tier=1%2C2%2C3%2C4%2C5&page=${i}`
      );
      const $ = cheerio.load(conts.data);
      const probs = $("#problemset > tbody > tr > td:first-child");
      probs.each((index, elem) => {
        //console.log($(elem).text());
        bronzeProblems.push($(elem).text());
      });
    }
    console.log(bronzeProblems.length);
  } catch (err) {
    console.log(err);
  }
};

//getTags();
//getUserProblems();
//getAllGoldProblems();
getAllBronzeProblems();
