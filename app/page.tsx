"use client";
import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Trash2,
  Play,
  RotateCcw,
  Star,
  ArrowRight,
  LoaderCircle,
  CheckCheck,
} from "lucide-react";
import { MySelect } from "@/components/custom/Select";
import { chatPuter } from "./services/puter";
import truthOrDare from "./prompt/truthOrDare";
import levelType from "./prompt/level.json";

const TruthOrDareGame = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("english");
  const [selectedLevel, setSelectedLevel] = useState<string>("family");
  const [gameState, setGameState] = useState("setup"); // 'setup', 'playing', 'completed'
  const [players, setPlayers] = useState<string[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState<string | null>("");
  const [challengeType, setChallengeType] = useState<string | null>("");
  const [completedChallenges, setCompletedChallenges] = useState(0);

  const addPlayer = () => {
    if (newPlayerName.trim() && !players.includes(newPlayerName.trim())) {
      setPlayers([...players, newPlayerName.trim()]);
      setNewPlayerName("");
    }
  };

  const removePlayer = (index: number) => {
    const newPlayers = players.filter((_, i) => i !== index);
    setPlayers(newPlayers);
    if (currentPlayerIndex >= newPlayers.length) {
      setCurrentPlayerIndex(0);
    }
  };

  const startGame = () => {
    if (players.length >= 2) {
      setGameState("playing");
      setCurrentPlayerIndex(0);
      setCompletedChallenges(0);
    }
  };

  //Getting truth questions from the puter
  const selectTruth = useCallback(async () => {
    setIsLoading(true);
    const response = await chatPuter(
      truthOrDare({
        type: "truth",
        level: selectedLevel,
        language: selectedLanguage,
      })
    );
    setCurrentChallenge(response);
    setChallengeType("truth");
    setIsLoading(false);

    // @typescript-eslint/no-explicit-any
  }, [selectedLanguage, selectedLevel, setChallengeType, setIsLoading]);

  //Getting dare questions from the puter
  const selectDare = useCallback(async () => {
    setIsLoading(true);
    const response = await chatPuter(
      truthOrDare({
        type: "dare",
        level: selectedLevel,
        language: selectedLanguage,
      })
    );
    setCurrentChallenge(response);
    setChallengeType("dare");
    setIsLoading(false);

    // @typescript-eslint/no-explicit-any
  }, [selectedLanguage, selectedLevel, setChallengeType, setIsLoading]);

  const nextTurn = () => {
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
    setCurrentChallenge(null);
    setChallengeType(null);
    setCompletedChallenges((prev) => prev + 1);
  };

  const resetGame = () => {
    setGameState("setup");
    setCurrentPlayerIndex(0);
    setCurrentChallenge(null);
    setChallengeType(null);
    setCompletedChallenges(0);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addPlayer();
    }
  };

  if (gameState === "setup") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 p-4">
        <div className="max-w-sm mx-auto">
          {/* Header */}
          <div className="text-center mb-12 pt-12">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Truth or Dare
            </h1>
            <p className="text-gray-400 text-sm">Add players to get started</p>
          </div>

          {/* Add Player Input */}
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
          )}

          {/* Warning */}
          {players.length < 2 && (
            <Alert className="bg-yellow-500/20 border-yellow-400/30 rounded-2xl mb-8">
              <AlertDescription className="text-yellow-200 text-center">
                Add at least 2 players to start
              </AlertDescription>
            </Alert>
          )}

          {/* Start Button */}
          <Button
            onClick={startGame}
            disabled={players.length < 2}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-2xl h-14 text-lg font-semibold disabled:opacity-50"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Game
          </Button>

          {/* Bottom spacing */}
          <div className="h-8"></div>
        </div>
      </div>
    );
  }

  console.log({ selectedLanguage, selectedLevel, challengeType });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 p-4">
      <div className="max-w-sm mx-auto">
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
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            {/* react/no-unescaped-entities */}
            <h2 className="text-xl font-bold text-white mb-1">
              {players[currentPlayerIndex]}
            </h2>
            <p className="text-gray-400 text-sm">{`It's your turn!`}</p>
          </div>

          {!currentChallenge ? (
            <div className="space-y-4">
              <p className="text-white/80 text-center mb-6">
                What do you choose?
              </p>
              {!isLoading ? (
                <div className="space-y-3">
                  <Button
                    onClick={selectTruth}
                    className="w-full bg-blue-600/80 hover:bg-blue-600 text-white rounded-2xl h-14 text-lg font-semibold backdrop-blur-sm"
                  >
                    Truth
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    onClick={selectDare}
                    className="w-full bg-red-600/80 hover:bg-red-600 text-white rounded-2xl h-14 text-lg font-semibold backdrop-blur-sm"
                  >
                    Dare
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              ) : (
                <div className="w-full flex items-center justify-center text-white">
                  <LoaderCircle size={50} className="animate-spin" />
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <Badge
                  className={`text-sm px-4 py-2 rounded-full ${
                    challengeType === "truth" ? "bg-blue-600" : "bg-red-600"
                  } text-white`}
                >
                  {challengeType === "truth" ? "Truth" : "Dare"}
                </Badge>
              </div>

              <div
                className={`bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10`}
              >
                <p className="text-white text-center leading-relaxed">
                  {currentChallenge}
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={nextTurn}
                  className="w-full border bg-transparent border-green-600 text-white hover:bg-green-700 rounded-2xl h-14 text-lg font-semibold"
                >
                  <CheckCheck className="text-white" />
                  Complete Challenge
                </Button>
                <Button
                  onClick={() => {
                    setCurrentChallenge(null);
                    setChallengeType(null);
                  }}
                  variant="ghost"
                  className="w-full text-white/60 hover:text-white hover:bg-white/10 rounded-2xl h-12"
                >
                  Go Back
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-4 mb-10">
          <MySelect
            title="Select Level"
            options={[...levelType]}
            onChange={(value) => setSelectedLevel(value)}
          />
          <MySelect
            title="Select Language"
            options={[
              { value: "English", label: "English" },
              { value: "French", label: "French" },
              { value: "Malagasy", label: "Malagasy" },
            ]}
            onChange={(value) => setSelectedLanguage(value)}
          />
        </div>

        {/* Game Info */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 mb-6">
          <div className="text-center space-y-1">
            <p className="text-white/60 text-xs">PLAYERS</p>
            <p className="text-white text-sm">{players.join(" • ")}</p>
            <p className="text-white/60 text-xs mt-2">
              CHALLENGES COMPLETED: {completedChallenges}
            </p>
          </div>
        </div>

        {/* Reset Button */}
        <Button
          onClick={resetGame}
          variant="ghost"
          className="w-full text-white/60 hover:text-white hover:bg-white/10 rounded-2xl h-12"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          New Game
        </Button>

        {/* Bottom spacing */}
        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default TruthOrDareGame;
