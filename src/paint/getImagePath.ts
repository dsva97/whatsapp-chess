import { PieceType, Square } from "chess.js";
import { resolve } from "path";
import { ASSETS_PATH } from "../config";

export type TPieceSquare = {
  type: PieceType;
  color: "b" | "w";
  square: Square;
};

/**
 * It takes a piece and returns the path to the image that represents it
 * @param {TPieceSquare} piece - TPieceSquare
 * @returns A string with the path to the image of the piece.
 */
export const getImagePathFromPiece = (piece: TPieceSquare) => {
  const color = piece.color === "b" ? "negras" : "blancas";
  let pieceName = "";
  switch (piece.type) {
    case "p":
      pieceName = "peon";
      break;
    case "r":
      pieceName = "torre";
      break;
    case "n":
      pieceName = "caballo";
      break;
    case "b":
      pieceName = "alfil";
      break;
    case "q":
      pieceName = "reina";
      break;
    case "k":
      pieceName = "rey";
      break;
    default:
      throw new Error(`Unknown piece type ${piece.type}`);
  }
  const imagePath = resolve(ASSETS_PATH, `${pieceName}_${color}.png`);
  return imagePath;
};
