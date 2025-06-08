"use client";
import React, { useCallback, useState } from "react";
import { SetupScreen } from "@/components/truth-or-dare/SetupScreen";
import { GameScreen } from "@/components/truth-or-dare/GameScreen";
import { chatPuter } from "@/app/services/puter";
import truthOrDare from "@/app/prompt/truthOrDare";

const TruthOrDareGame = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedLevel, setSelectedLevel] = useState(
    "A clean, fun, and age-appropriate question for a family-level game. Simple, inclusive, and suitable for all ages."
  );
  const [gameState, setGameState] = useState<"setup" | "playing">("setup");
  const [players, setPlayers] = useState<string[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState<string | null>(null);
  const [challengeType, setChallengeType] = useState<string | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState(0);
  const [previousQuestions, setPreviousQuestions] = useState<string[]>([]);

  // Add player
  const addPlayer = () => {
    const trimmedName = newPlayerName.trim();
    if (trimmedName && !players.includes(trimmedName)) {
      setPlayers([...players, trimmedName]);
      setNewPlayerName("");
    }
  };

  // Remove player
  const removePlayer = (index: number) => {
    const updated = players.filter((_, i) => i !== index);
    setPlayers(updated);
    if (currentPlayerIndex >= updated.length) {
      setCurrentPlayerIndex(0);
    }
  };

  // Start game
  const startGame = () => {
    if (players.length >= 2) {
      setGameState("playing");
      setCurrentPlayerIndex(0);
      setCompletedChallenges(0);
    }
  };

  // Select truth or dare
  const selectTruthOrDare = useCallback(
    async (type: "truth" | "dare") => {
      setIsLoading(true);
      const { ok, content: response } = await chatPuter(
        truthOrDare({
          previousQuestions,
          type,
          level: selectedLevel,
          language: selectedLanguage,
        })
      );
      console.log("Chosen type is ", type);
      if (ok) {
        console.log("Connection Established");
        setCurrentChallenge(response);
        setChallengeType(type);
        setPreviousQuestions((prev) => [...prev, response]);
      } else {
        console.error("Connection Lost...");
      }
      setIsLoading(false);
    },
    [selectedLanguage, selectedLevel, previousQuestions]
  );

  // Next turn
  const nextTurn = () => {
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
    setCurrentChallenge(null);
    setChallengeType(null);
    setCompletedChallenges((prev) => prev + 1);
  };

  // Reset game
  const resetGame = () => {
    setGameState("setup");
    setCurrentPlayerIndex(0);
    setCurrentChallenge(null);
    setChallengeType(null);
    setCompletedChallenges(0);
    setPreviousQuestions([]);
  };

  // Clear current challenge without moving to next player
  const clearChallenge = () => {
    setCurrentChallenge(null);
    setChallengeType(null);
  };

  const editPlayer = (newName: string, index: number) => {
    players[index] = newName;
    setPlayers(players);
  };

  return gameState === "setup" ? (
    <SetupScreen
      editPlayer={(newName, index) => editPlayer(newName, index)}
      players={players}
      newPlayerName={newPlayerName}
      setNewPlayerName={setNewPlayerName}
      addPlayer={addPlayer}
      removePlayer={removePlayer}
      startGame={startGame}
    />
  ) : (
    <GameScreen
      players={players}
      currentPlayerIndex={currentPlayerIndex}
      currentChallenge={currentChallenge}
      challengeType={challengeType}
      isLoading={isLoading}
      completedChallenges={completedChallenges}
      selectedLevel={selectedLevel}
      selectedLanguage={selectedLanguage}
      setSelectedLevel={setSelectedLevel}
      setSelectedLanguage={setSelectedLanguage}
      selectTruthOrDare={selectTruthOrDare}
      nextTurn={nextTurn}
      resetGame={resetGame}
      clearChallenge={clearChallenge}
    />
  );
};

export default TruthOrDareGame;
