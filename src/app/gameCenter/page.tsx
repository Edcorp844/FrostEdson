"use client";

import { useEffect, useState } from "react";
import init, { Game } from "@/lib/radius_raid";

export default function GameCenterPage() {
  const [inGame, setInGame] = useState(true);

  useEffect(() => {
    async function startGame() {
      await init();

      const game = new Game(
        1,             // instance id
        "#wasm-root",  // parent selector
        window.innerWidth,  // full width
        window.innerHeight  // full height
      );

     game.set_up_game();
    }

    if (inGame) startGame();

    // ESC listener
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setInGame(false);
      }
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [inGame]);

  if (!inGame) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white text-xl">
        Gaming mode exited. Reload page to enter Game Center again.
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      {/* The WASM root where Rust creates the canvas */}
      <div id="wasm-root" className="absolute inset-0" />

      {/* Popup instruction overlay */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 bg-opacity-70 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
        Press <span className="font-bold">ESC</span> to exit Game Center
      </div>
    </div>
  );
}
