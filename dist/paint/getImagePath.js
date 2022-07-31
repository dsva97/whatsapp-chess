"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImagePathFromPiece = void 0;
const path_1 = require("path");
const config_1 = require("../config");
const getImagePathFromPiece = (piece) => {
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
    const imagePath = (0, path_1.resolve)(config_1.ASSETS_PATH, `${pieceName}_${color}.png`);
    return imagePath;
};
exports.getImagePathFromPiece = getImagePathFromPiece;
