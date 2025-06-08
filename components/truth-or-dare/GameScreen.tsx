"use client";
import React from "react";
import { Star, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MySelect } from "@/components/custom/Select";
import { ChallengeDisplay } from "./ChallengeDisplay";
import { GameControls } from "./GameControl";
import { StatusPanel } from "./StatusPanel";
import categories from "@/app/prompt/level.json";
import languages from "@/app/prompt/languages.json";

interface GameScreenProps {
  players: string[];
  currentPlayerIndex: number;
  currentChallenge: string | null;
  challengeType: string | null;
  isLoading: boolean;
  completedChallenges: number;
  selectedLevel: string;
  selectedLanguage: string;
  setSelectedLevel: (level: string) => void;
  setSelectedLanguage: (lang: string) => void;
  selectTruthOrDare: (type: "truth" | "dare") => void;
  nextTurn: () => void;
  resetGame: () => void;
  clearChallenge: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  selectedLanguage,
  players,
  currentPlayerIndex,
  currentChallenge,
  challengeType,
  isLoading,
  completedChallenges,
  setSelectedLevel,
  setSelectedLanguage,
  selectTruthOrDare,
  nextTurn,
  resetGame,
  clearChallenge,
}) => {
  console.log({ currentChallenge });
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-12">
          <Badge className="bg-white/20 text-white/80 px-4 py-2 rounded-full text-sm mb-4">
            Round {completedChallenges + 1}
          </Badge>
          <h1 className="text-2xl font-bold text-white mb-2">Truth or Dare</h1>
        </div>

        {/* Current Player Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 mb-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white mb-1">
              {players[currentPlayerIndex]}
            </h2>
            <p className="text-gray-400 text-sm">{`It's your turn!`}</p>
          </div>

          {/* Challenge Interaction */}
          {!currentChallenge ? (
            !isLoading ? (
              <GameControls selectTruthOrDare={selectTruthOrDare} />
            ) : (
              <div className="w-full flex items-center justify-center text-white">
                <LoaderCircle size={50} className="animate-spin" />
              </div>
            )
          ) : (
            <ChallengeDisplay
              defaultLanguage={selectedLanguage}
              challengeType={challengeType}
              currentChallenge={currentChallenge}
              nextTurn={nextTurn}
              clearChallenge={clearChallenge}
            />
          )}
        </div>

        {/* Language & Level Select */}
        <div className="flex flex-wrap gap-4 mb-10">
          <MySelect
            title="Select Level"
            options={categories}
            onChange={setSelectedLevel}
          />
          <MySelect
            title="Select Language"
            options={languages}
            onChange={setSelectedLanguage}
          />
        </div>

        {/* Info */}
        <StatusPanel
          players={players}
          completedChallenges={completedChallenges}
        />

        {/* Reset Button */}
        <Button
          onClick={resetGame}
          variant="ghost"
          className="w-full text-white/60 hover:text-white hover:bg-white/10 rounded-2xl h-12"
        >
          New Game
        </Button>

        <div className="h-8" />
      </div>
    </div>
  );
};
