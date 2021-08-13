const time = require("console");
const express = require("express");
var admin = express();
const app = express();
const puppeteer = require("puppeteer");
const fs = require("fs");

const porta = 3000;

app.listen(porta, () => {
  console.log(`Rodando em http://localhost:${porta}`);
});

app.get("/:nome", (req, res) => {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.baixafilme.net${req.url}`);
    const Moves = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".entry-content"), (Move) => {
          console.log( Move.innerHTML)
        return Move.innerHTML;
      })
    );
    console.log( await Moves);
    res.send(await Moves[0]);
    await browser.close();
  })();
});
