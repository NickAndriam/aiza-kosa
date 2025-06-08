"use client";
import React from "react";

interface StatusPanelProps {
  players: string[];
  completedChallenges: number;
}

export const StatusPanel: React.FC<StatusPanelProps> = ({
  players,
  completedChallenges,
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 mb-6">
      <div className="text-center space-y-1">
        <p className="text-white/60 text-xs">PLAYERS</p>
        <p className="text-white text-sm">{players.join(" • ")}</p>
        <p className="text-white/60 text-xs mt-2">
          CHALLENGES COMPLETED: {completedChallenges}
        </p>
      </div>
    </div>
  );
};
