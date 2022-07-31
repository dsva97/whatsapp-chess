// Bring in loadImage function from canvas so we can
// add an image to the canvas.
import { createCanvas, loadImage } from "canvas";
import { writeFileSync } from "fs";
import { resolve } from "path";

import { __dirname } from "./path.js";
import { formatTitle } from "./utils/format-title.js";

const post = {
  title: "Draw and save images with Canvas and Node",
  author: "Sean C Davis",
};

const width = 1200;
const height = 627;
// Set the coordinates for the image position.
const imagePosition = {
  w: 400,
  h: 88,
  x: 400,
  y: 75,
};
// Because we are putting the image near the top (y: 75)
// move the title down.
const titleY = 300;
const titleLineHeight = 100;
// Bring up the author's Y value as well to make it all
// fit together nicely.
const authorY = 525;

const canvas = createCanvas(width, height);
const context = canvas.getContext("2d");

context.fillStyle = "#764abc";
context.fillRect(0, 0, width, height);

context.font = "bold 70pt 'PT Sans'";
context.textAlign = "center";
context.fillStyle = "#fff";

const titleText = formatTitle(post.title);
context.fillText(titleText[0], 600, titleY);
if (titleText[1]) context.fillText(titleText[1], 600, titleY + titleLineHeight);

context.font = "40pt 'PT Sans'";
context.fillText(`by ${post.author}`, 600, authorY);

// Load the logo file and then render it on the screen.
const pathImage = resolve(__dirname, "./assets/logo.png");
loadImage(pathImage).then((image) => {
  const { w, h, x, y } = imagePosition;
  context.drawImage(image, x, y, w, h);

  const buffer = canvas.toBuffer("image/png");
  writeFileSync("./image.png", buffer);
});
