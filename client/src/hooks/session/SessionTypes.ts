import type { Coords } from "../../components/board/BoardTypes.ts";

type SocketId = string;

type Player = {
  socketId: SocketId;
  name: string;
  color: string;
};

type PlayerState = {
  name: string;
  color: string;
  cursor: Coords;
};

type Players = Record<SocketId, PlayerState>;

type Session = {
  id: string;
  player: Player;
  puzzleId: string;
  createdAt: string;
  players: Players;
  gridState: Record<string, string>;
};

export type { Session, Players };
