const chess = require("chess");

console.log(chess);

const gameClient = chess.create({ PGN: true });
gameClient.getStatus();
