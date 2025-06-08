"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface PlayerListProps {
  players: string[];
  removePlayer: (index: number) => void;
}

export const PlayerList: React.FC<PlayerListProps> = ({
  players,
  removePlayer,
}) => {
  if (players.length === 0) return null;

  return (
    <div className="mb-8">
      <p className="text-white/60 text-sm mb-4 text-center">
        PLAYERS ({players.length})
      </p>
      <div className="space-y-3">
        {players.map((player, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 flex items-center justify-between"
          >
            <span className="text-white font-medium">{player}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removePlayer(index)}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-xl"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
