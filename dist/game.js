"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chess_js_1 = require("chess.js");
const users = new Map();
const initGame = (user, color) => {
    if (users.has(user)) {
        return "Game already started";
    }
    const chess = new chess_js_1.Chess();
    if (!color) {
        color = "w";
    }
    users.set(user, { chess, color });
};
const move = (user, move) => {
    if (!users.has(user)) {
        return "Game not started";
    }
    const { chess, color } = users.get(user);
    if (chess.game_over()) {
        return "Game over";
    }
    if (chess.turn() !== color) {
        return "Not your turn";
    }
    if (!chess.move(move)) {
        return "Invalid move";
    }
    return "Move successful";
};
