var chess = require("node-chess");
var game = chess.classic.engine();

console.log(JSON.stringify(game.boardState, null, 3));

game.movePiece({ from: { file: 5, rank: 2 }, to: { file: 5, rank: 4 } });
