import {
  createCanvas,
  CanvasRenderingContext2D,
  loadImage,
  Canvas,
} from "canvas";
import { ChessInstance } from "chess.js";
import { resolve } from "path";
import { writeFileSync, rmSync } from "fs";
import { ASSETS_PATH, BOARD_FILES_PATH } from "../config";
import { getImagePathFromPiece, TPieceSquare } from "./getImagePath";

export const WIDTH = (680 * 3) / 2;
export const HEIGHT = (680 * 3) / 2;

export const createCanvasContext = (): {
  canvas: Canvas;
  context: CanvasRenderingContext2D;
} => {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const context = canvas.getContext("2d");

  context.fillStyle = "#764abc";
  context.fillRect(0, 0, WIDTH, HEIGHT);

  return { canvas, context };
};

export const paintBoard = async (context: CanvasRenderingContext2D) => {
  const pathBoardImage = resolve(ASSETS_PATH, "chessboard.png");
  const boardImage = await loadImage(pathBoardImage);
  context.drawImage(boardImage, 0, 0, WIDTH, HEIGHT);
};

export const paintPiece = async (
  context: CanvasRenderingContext2D,
  pieceSquare: TPieceSquare,
  row: number,
  column: number
) => {
  const imagePath = getImagePathFromPiece(pieceSquare);
  if (imagePath) {
    const image = await loadImage(imagePath);
    context.drawImage(image, column * 120 + 80, row * 120 + 50);
  }
};

export const paintStatusBoard = async (
  context: CanvasRenderingContext2D,
  chess: ChessInstance
) => {
  const boardPromise = chess.board().map(async (row, rowIndex) => {
    const rowPromise = row.map(async (piece, columnIndex) => {
      if (piece) {
        await paintPiece(context, piece, rowIndex, columnIndex);
      }
    });
    await Promise.all(rowPromise);
  });
  await Promise.all(boardPromise);
};

export const writeFinalBoard = async (canvas: Canvas, date: Date) => {
  const buffer = canvas.toBuffer("image/png");
  const fileName = date.getTime() + ".png";
  const filePath = resolve(BOARD_FILES_PATH, fileName);
  writeFileSync(filePath, buffer);
  const removeImage = () => rmSync(filePath);
  return { fileName, filePath, buffer, removeImage };
};
