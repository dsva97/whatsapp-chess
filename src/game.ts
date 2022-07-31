import { Canvas } from "canvas";
import { Chess, ChessInstance } from "chess.js";
import {
  createCanvasContext,
  paintBoard,
  writeFinalBoard,
  paintStatusBoard,
} from "./paint";

interface IGame {
  status: EStatus;
  chess: ChessInstance;
  canvas: Canvas;
  context: CanvasRenderingContext2D;
  white: string;
  black: string;
}
enum EStatus {
  WAITING,
  PLAYING,
  FINISHED,
}
const games: Map<number, IGame> = new Map();

export const existGame = ({
  white,
  black,
}: {
  white: string;
  black: string;
}) => {
  return [...games.values()]
    .filter((game) => game.status !== EStatus.FINISHED)
    .find((game) => {
      const matchWhite = game.white === white || game.white === black;
      const matchBlack = game.black === white || game.black === black;
      return matchWhite && matchBlack;
    });
};
export const existGamePlaying = ({
  white,
  black,
}: {
  white: string;
  black: string;
}) => {
  return [...games.values()]
    .filter((game) => game.status === EStatus.PLAYING)
    .find((game) => {
      const matchWhite = game.white === white || game.black === white;
      const matchBlack = game.white === black || game.black === black;
      return matchWhite && matchBlack;
    });
};
export const initGame = ({
  white,
  black,
}: {
  white: string;
  black: string;
}) => {
  const { canvas, context } = createCanvasContext();

  if (existGame({ white, black })) {
    return "Game already started";
  }
  const chess = new Chess();
  const id = new Date().getTime();
  const game = {
    status: EStatus.WAITING,
    chess,
    canvas,
    context,
    white,
    black,
  };
  games.set(id, game);
  return id;
};

export const acceptGame = async ({
  user,
  id,
}: {
  user: string;
  id: number;
}) => {
  try {
    const game = games.get(id);
    if (!game) {
      return {
        error: "Game not found",
        data: null,
      };
    }
    game.black = user;
    game.status = EStatus.PLAYING;

    const date = new Date();
    const { context, chess, canvas } = game;
    await paintBoard(context);
    await paintStatusBoard(context, chess);
    const data = await writeFinalBoard(canvas, date);
    const moves = chess.moves().join(" ");
    return {
      data: { ...data, moves },
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : (error as string),
    };
  }
};

export const move = async ([user1, user2]: [string, string], move: string) => {
  const game = existGamePlaying({ white: user1, black: user2 });
  console.log(games, { white: user1, black: user2 });
  if (!game) {
    return {
      error: "Game not started",
      data: null,
    };
  }
  const turn = game.chess.turn() === "w" ? "white" : "black";
  const { chess, canvas, context } = game;
  const date = new Date();
  if (chess.game_over()) {
    return {
      error: "Game over",
      data: null,
    };
  }
  if (game[turn] !== user1) {
    return {
      error: "Not your turn",
      data: null,
    };
  }
  if (!chess.move(move)) {
    return {
      data: null,
      error: "Invalid move",
    };
  }
  await paintBoard(context);
  await paintStatusBoard(context, chess);
  const data = await writeFinalBoard(canvas, date);
  const moves = chess.moves().join(" ");
  return {
    data: { ...data, moves },
    error: null,
  };
};
