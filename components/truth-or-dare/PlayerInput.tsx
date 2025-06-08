"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PlayerInputProps {
  newPlayerName: string;
  setNewPlayerName: (name: string) => void;
  addPlayer: () => void;
}

export const PlayerInput: React.FC<PlayerInputProps> = ({
  newPlayerName,
  setNewPlayerName,
  addPlayer,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addPlayer();
    }
  };

  return (
    <div className="mb-8">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
        <Input
          placeholder="Enter player name..."
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          onKeyPress={handleKeyPress}
          className="bg-transparent border-none text-white placeholder:text-gray-400 text-center text-lg font-medium focus-visible:ring-0"
        />
      </div>
      <Button
        onClick={addPlayer}
        disabled={!newPlayerName.trim()}
        className="w-full mt-4 bg-white text-black hover:bg-gray-100 rounded-2xl h-14 text-lg font-semibold"
      >
        Add Player
      </Button>
    </div>
  );
};
