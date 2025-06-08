"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Star } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SetupScreenProps {
  players: string[];
  editPlayer: (e: string, index: number) => void;
  newPlayerName: string;
  setNewPlayerName: (name: string) => void;
  addPlayer: () => void;
  removePlayer: (index: number) => void;
  startGame: () => void;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({
  players,
  editPlayer,
  newPlayerName,
  setNewPlayerName,
  addPlayer,
  removePlayer,
  startGame,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-800 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-12">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <Star className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Truth or Dare</h1>
          <p className="text-gray-400 text-sm">Add players to get started</p>
        </div>

        {/* Add Player */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
            <Input
              placeholder="Enter player name..."
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addPlayer()}
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

        {/* Players List */}
        {players.length > 0 && (
          <div className="mb-8">
            <p className="text-white/60 text-sm mb-4 text-center">
              PLAYERS ({players.length})
            </p>
            <div className="space-y-3">
              {players.map((player, index) => (
                <div
                  key={index}
                  className={`bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 flex items-center justify-between`}
                >
                  <input
                    defaultValue={player}
                    className="text-white font-medium outline-none"
                    onChange={(e) => editPlayer(e.target.value, index)}
                  />
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
        )}

        {players.length < 2 && (
          <Alert className="bg-yellow-500/20 border-yellow-400/30 rounded-2xl mb-8">
            <AlertDescription className="text-yellow-200 text-center">
              Add at least 2 players to start
            </AlertDescription>
          </Alert>
        )}

        <Button
          onClick={startGame}
          disabled={players.length < 2}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-blue-500 hover:to-purple-600 text-white rounded-2xl h-14 text-lg font-semibold disabled:opacity-50"
        >
          Start Game
        </Button>

        <div className="h-8" />
      </div>
    </div>
  );
};
