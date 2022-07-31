import { createCanvas, loadImage } from "canvas";
import { writeFileSync } from "fs";
import { resolve } from "path";

import { __dirname } from "../path.js";

const main = async () => {
  const width = 1360;
  const height = 1372;

  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  context.fillStyle = "#764abc";
  context.fillRect(0, 0, width, height);

  const pathBoardImage = resolve(__dirname, "./assets/chessboard.png");
  const boardImage = await loadImage(pathBoardImage);
  context.drawImage(boardImage, 0, 0);

  const pathKingImage = resolve(__dirname, "./assets/king.png");
  const kingImage = await loadImage(pathKingImage);
  context.drawImage(kingImage, 0, 0);

  const buffer = canvas.toBuffer("image/png");
  writeFileSync("./image.png", buffer);
};

main();
