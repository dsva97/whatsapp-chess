"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paintPiece = exports.paintBoard = exports.createCanvasContext = exports.HEIGHT = exports.WIDTH = void 0;
const canvas_1 = require("canvas");
const path_1 = require("path");
const config_1 = require("../config");
const getImagePath_1 = require("./getImagePath");
exports.WIDTH = (680 * 3) / 2;
exports.HEIGHT = (680 * 3) / 2;
const createCanvasContext = () => {
    const canvas = (0, canvas_1.createCanvas)(exports.WIDTH, exports.HEIGHT);
    const context = canvas.getContext("2d");
    context.fillStyle = "#764abc";
    context.fillRect(0, 0, exports.WIDTH, exports.HEIGHT);
    return { canvas, context };
};
exports.createCanvasContext = createCanvasContext;
const paintBoard = async (context) => {
    const pathBoardImage = (0, path_1.resolve)(config_1.ASSETS_PATH, "chessboard.png");
    const boardImage = await (0, canvas_1.loadImage)(pathBoardImage);
    context.drawImage(boardImage, 0, 0, exports.WIDTH, exports.HEIGHT);
};
exports.paintBoard = paintBoard;
const paintPiece = async (context, pieceSquare, row, column) => {
    const imagePath = (0, getImagePath_1.getImagePathFromPiece)(pieceSquare);
    if (imagePath) {
        const image = await (0, canvas_1.loadImage)(imagePath);
        context.drawImage(image, column * 120 + 80, row * 120 + 50);
    }
};
exports.paintPiece = paintPiece;
