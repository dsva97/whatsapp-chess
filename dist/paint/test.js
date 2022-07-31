"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const index_1 = require("./index");
const config_1 = require("../config");
const chess_js_1 = require("chess.js");
const main = async () => {
    const { canvas, context } = (0, index_1.createCanvasContext)();
    await (0, index_1.paintBoard)(context);
    const piece = {
        square: "a8",
        type: "r",
        color: "b",
    };
    const chess = new chess_js_1.Chess();
    const boardPromise = chess.board().map(async (row, rowIndex) => {
        const rowPromise = row.map(async (piece, columnIndex) => {
            if (piece) {
                await (0, index_1.paintPiece)(context, piece, rowIndex, columnIndex);
            }
        });
        await Promise.all(rowPromise);
    });
    await Promise.all(boardPromise);
    await (0, index_1.paintPiece)(context, piece, 0, 0);
    await (0, index_1.paintPiece)(context, piece, 1, 1);
    await (0, index_1.paintPiece)(context, piece, 2, 2);
    await (0, index_1.paintPiece)(context, piece, 3, 3);
    const buffer = canvas.toBuffer("image/png");
    (0, fs_1.writeFileSync)((0, path_1.resolve)(config_1.BOARD_FILES_PATH, "image.png"), buffer);
};
exports.main = main;
