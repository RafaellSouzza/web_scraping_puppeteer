const fs = require("fs");
const puppeteer = require("puppeteer");
const cliProgress = require("cli-progress");

(async () => {
  const fs = require("fs");
  const data = fs.readFileSync("Moves.json", "utf-8");
  const objetox = await JSON.parse(data.toString());
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  bar.start(objetox.length, 0);
  let cont = 0;
  for (const element of objetox) {
    if (element.id > 0) {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(element.url);

      const Moves = await page.evaluate(() =>
        Array.from(document.getElementsByClassName("conteudo"), (x) => {
          const Move = new Object();
          Move.tituloOrig = x
            .getElementsByTagName("p")[1]
            .innerText.replace("Título original: ", "");
          Move.genero = x
            .getElementsByClassName("entry-categories")[0]
            ?.innerText.split(",");
          Move.mtcr = x
            .getElementsByTagName("p")[3]
            .getElementsByTagName("span")[1]?.innerText;
          Move.imdb = x
            .getElementsByTagName("p")[3]
            .getElementsByTagName("span")[0]?.innerText;
          Move.duracao = x
            .getElementsByTagName("p")[4]
            .getElementsByTagName("span")[1]
            ?.innerText.replace(/\D/g, "");
          Move.qualiAudio = x
            .getElementsByTagName("p")[5]
            .getElementsByTagName("span")[0]
            ?.innerText.replace(/\D/g, "");
          Move.qualiVideo = x
            .getElementsByTagName("p")[5]
            .getElementsByTagName("span")[1]
            ?.innerText.replace(/\D/g, "");
          Move.sinopse = x
            .getElementsByTagName("p")[7]
            ?.innerText.replace("Sinopse: ", "");
          Move.enredo = x
            .getElementsByTagName("p")[9]
            ?.innerText.replace("Enredo: ", "");
          Move.TB1 = x.getElementsByClassName("tbl-mv-list")[0]?.innerHTML;
          Move.TB2 = x.getElementsByClassName("tbl-mv-list")[1]?.innerHTML;
          Move.elenco = x
            .getElementsByClassName("elenco-list-ol")[0]
            ?.innerText.split("\n\n");
          Move.TBelenc =
            x.getElementsByClassName("elenco-list-ol")[0]?.innerHTML;
          Move.youtube = `https://youtu.be/${x
            .getElementsByClassName("youtube")[0]
            ?.getAttribute("data-embed")}`;
          return Move;
        })
      );

      const fs = require("fs");
      const data = fs.readFileSync("Filmes6.json", "utf-8");
      const objeto = JSON.parse(data.toString());

      element.tituloOrig = Moves[0].tituloOrig;
      element.genero = Moves[0].genero;
      element.mtcr = Moves[0].mtcr;
      element.imdb = Moves[0].imdb;
      element.duracao = Moves[0].duracao;
      element.qualiAudio = Moves[0].qualiAudio;
      element.qualiVideo = Moves[0].qualiVideo;
      element.sinopse = Moves[0].sinopse;
      element.enredo = Moves[0].enredo;
      element.TB1 = Moves[0].TB1;
      element.TB2 = Moves[0].TB2;
      element.elenco = Moves[0].elenco;
      element.TBelenc = Moves[0].TBelenc;
      element.youtube = Moves[0].youtube;

      objeto.push(element);
      const objetoJson = JSON.stringify(objeto);
      fs.writeFileSync("Filmes6.json", objetoJson);
      bar.increment();
      cont++;
      if (objetox.length == cont) bar.stop();
      await browser.close();
    }
  }
})();
