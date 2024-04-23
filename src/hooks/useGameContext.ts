import { useContext } from "react";
import { GameContext } from "../context/game-contex";

export default function useGameContext() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext should be used inside GameContext")
  }

  return context;
}