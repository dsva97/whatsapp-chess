import { Chess } from "chess.js";
import { writeFileSync } from "fs";

const chess = new Chess();

const board = chess.board();
while (!chess.game_over()) {
  const moves = chess.moves();
  // console.log(moves);
  const move = moves[Math.floor(Math.random() * moves.length)];
  chess.move(move);
}
writeFileSync("board.json", JSON.stringify(board, null, 3));
// console.log(chess.pgn());
