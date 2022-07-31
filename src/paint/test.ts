import { writeFileSync } from "fs";
import { resolve } from "path";
import { createCanvasContext, paintBoard, paintPiece } from "./index";
import { BOARD_FILES_PATH } from "../config";
import { Chess } from "chess.js";

export const main = async () => {
  const { canvas, context } = createCanvasContext();
  await paintBoard(context);

  const chess = new Chess();
  const boardPromise = chess.board().map(async (row, rowIndex) => {
    const rowPromise = row.map(async (piece, columnIndex) => {
      if (piece) {
        await paintPiece(context, piece, rowIndex, columnIndex);
      }
    });
    await Promise.all(rowPromise);
  });
  await Promise.all(boardPromise);

  const buffer = canvas.toBuffer("image/png");
  writeFileSync(resolve(BOARD_FILES_PATH, "image.png"), buffer);
};
