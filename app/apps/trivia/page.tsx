"use client";
import React, { useState, useEffect } from "react";
import {
  Brain,
  Trophy,
  RotateCcw,
  Play,
  Clock,
  CheckCircle,
  XCircle,
  Award,
  Target,
  Zap,
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  points: number;
}

interface GameState {
  currentQuestion: number;
  score: number;
  timeLeft: number;
  isGameActive: boolean;
  selectedAnswer: number | null;
  showResult: boolean;
  answeredQuestions: number[];
  streak: number;
  bestStreak: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
    category: "Geography",
    difficulty: "Easy",
    points: 10,
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
    category: "Science",
    difficulty: "Easy",
    points: 10,
  },
  {
    id: 3,
    question: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    correctAnswer: 1,
    category: "Nature",
    difficulty: "Easy",
    points: 10,
  },
  {
    id: 4,
    question: "In which year did World War II end?",
    options: ["1944", "1945", "1946", "1947"],
    correctAnswer: 1,
    category: "History",
    difficulty: "Medium",
    points: 20,
  },
  {
    id: 5,
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: 2,
    category: "Science",
    difficulty: "Medium",
    points: 20,
  },
  {
    id: 6,
    question: "Which programming language was created by Guido van Rossum?",
    options: ["Java", "Python", "C++", "JavaScript"],
    correctAnswer: 1,
    category: "Technology",
    difficulty: "Medium",
    points: 20,
  },
  {
    id: 7,
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: 2,
    category: "Mathematics",
    difficulty: "Hard",
    points: 30,
  },
  {
    id: 8,
    question: "Which composer wrote 'The Four Seasons'?",
    options: ["Bach", "Vivaldi", "Mozart", "Beethoven"],
    correctAnswer: 1,
    category: "Arts",
    difficulty: "Hard",
    points: 30,
  },
];

const categories = [
  "All",
  "Geography",
  "Science",
  "Nature",
  "History",
  "Technology",
  "Mathematics",
  "Arts",
];

export default function QuizGame() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 0,
    score: 0,
    timeLeft: 30,
    isGameActive: false,
    selectedAnswer: null,
    showResult: false,
    answeredQuestions: [],
    streak: 0,
    bestStreak: 0,
  });
  const [gameStarted, setGameStarted] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const filtered =
      selectedCategory === "All"
        ? questions
        : questions.filter((q) => q.category === selectedCategory);
    setFilteredQuestions(filtered);
  }, [selectedCategory]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (
      gameState.isGameActive &&
      gameState.timeLeft > 0 &&
      !gameState.showResult
    ) {
      timer = setTimeout(() => {
        setGameState((prev) => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (gameState.timeLeft === 0 && gameState.isGameActive) {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [gameState.timeLeft, gameState.isGameActive, gameState.showResult]);

  const startGame = () => {
    setGameStarted(true);
    setGameState({
      currentQuestion: 0,
      score: 0,
      timeLeft: 30,
      isGameActive: true,
      selectedAnswer: null,
      showResult: false,
      answeredQuestions: [],
      streak: 0,
      bestStreak: 0,
    });
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (gameState.showResult || !gameState.isGameActive) return;

    setGameState((prev) => ({
      ...prev,
      selectedAnswer: answerIndex,
      showResult: true,
    }));

    setTimeout(() => {
      const currentQ = filteredQuestions[gameState.currentQuestion];
      const isCorrect = answerIndex === currentQ.correctAnswer;
      const newStreak = isCorrect ? gameState.streak + 1 : 0;
      const newBestStreak = Math.max(gameState.bestStreak, newStreak);

      setGameState((prev) => ({
        ...prev,
        score: isCorrect
          ? prev.score + currentQ.points + newStreak * 5
          : prev.score,
        answeredQuestions: [...prev.answeredQuestions, prev.currentQuestion],
        streak: newStreak,
        bestStreak: newBestStreak,
      }));

      setTimeout(() => {
        if (gameState.currentQuestion < filteredQuestions.length - 1) {
          setGameState((prev) => ({
            ...prev,
            currentQuestion: prev.currentQuestion + 1,
            timeLeft: 30,
            selectedAnswer: null,
            showResult: false,
          }));
        } else {
          endGame();
        }
      }, 1500);
    }, 1000);
  };

  const handleTimeUp = () => {
    setGameState((prev) => ({ ...prev, showResult: true, streak: 0 }));
    setTimeout(() => {
      if (gameState.currentQuestion < filteredQuestions.length - 1) {
        setGameState((prev) => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1,
          timeLeft: 30,
          selectedAnswer: null,
          showResult: false,
        }));
      } else {
        endGame();
      }
    }, 1500);
  };

  const endGame = () => {
    setGameState((prev) => ({ ...prev, isGameActive: false }));
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameState({
      currentQuestion: 0,
      score: 0,
      timeLeft: 30,
      isGameActive: false,
      selectedAnswer: null,
      showResult: false,
      answeredQuestions: [],
      streak: 0,
      bestStreak: 0,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "from-green-500 to-emerald-500";
      case "Medium":
        return "from-yellow-500 to-orange-500";
      case "Hard":
        return "from-red-500 to-pink-500";
      default:
        return "from-blue-500 to-purple-500";
    }
  };

  const getScoreRating = (score: number, total: number) => {
    const percentage = (score / (total * 30)) * 100;
    if (percentage >= 90) return { text: "Genius!", color: "text-yellow-400" };
    if (percentage >= 75)
      return { text: "Excellent!", color: "text-green-400" };
    if (percentage >= 60) return { text: "Good Job!", color: "text-blue-400" };
    if (percentage >= 40) return { text: "Not Bad!", color: "text-orange-400" };
    return { text: "Keep Trying!", color: "text-red-400" };
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center p-6">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-2xl w-full">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Brain className="w-10 h-10" />
            </div>

            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Quiz Master
            </h1>
            <p className="text-gray-400 mb-8">
              Test your knowledge across multiple categories
            </p>

            {/* Category Selection */}
            <div className="mb-8">
              <p className="text-sm text-gray-400 mb-4">Select Category</p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                        : "bg-slate-700/50 text-gray-300 hover:bg-slate-600/50"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Game Info */}
            <div className="bg-slate-700/30 rounded-2xl p-4 mb-8">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-blue-400">
                    {filteredQuestions.length}
                  </div>
                  <div className="text-xs text-gray-400">Questions</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-green-400">30s</div>
                  <div className="text-xs text-gray-400">Per Question</div>
                </div>
              </div>
            </div>

            <button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-blue-500/25"
            >
              <Play className="w-6 h-6" />
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!gameState.isGameActive && gameState.answeredQuestions.length > 0) {
    const maxPossibleScore = filteredQuestions.reduce(
      (sum, q) => sum + q.points,
      0
    );
    const rating = getScoreRating(gameState.score, filteredQuestions.length);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center p-6">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-2xl w-full">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Trophy className="w-10 h-10" />
            </div>

            <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
            <p className={`text-xl font-semibold mb-6 ${rating.color}`}>
              {rating.text}
            </p>

            {/* Score Display */}
            <div className="bg-slate-700/30 rounded-2xl p-6 mb-6">
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                {gameState.score}
              </div>
              <div className="text-sm text-gray-400 mb-4">Total Score</div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-green-400">
                    {gameState.bestStreak}
                  </div>
                  <div className="text-xs text-gray-400">Best Streak</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-400">
                    {Math.round((gameState.score / maxPossibleScore) * 100)}%
                  </div>
                  <div className="text-xs text-gray-400">Accuracy</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={resetGame}
                className="flex-1 bg-slate-700/50 hover:bg-slate-600/50 text-white py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                New Game
              </button>
              <button
                onClick={startGame}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                Play Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = filteredQuestions[gameState.currentQuestion];
  if (!currentQ) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-4 bg-slate-800/50 backdrop-blur-sm rounded-2xl px-6 py-3 border border-slate-700/50">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-400">
                Question {gameState.currentQuestion + 1} of{" "}
                {filteredQuestions.length}
              </span>
            </div>
            <div className="w-px h-6 bg-slate-600"></div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-gray-400">
                Score: {gameState.score}
              </span>
            </div>
            <div className="w-px h-6 bg-slate-600"></div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-400">
                Streak: {gameState.streak}
              </span>
            </div>
          </div>
        </div>

        {/* Timer */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-orange-400" />
            <span
              className={`text-2xl font-bold ${
                gameState.timeLeft <= 10 ? "text-red-400" : "text-orange-400"
              }`}
            >
              {gameState.timeLeft}s
            </span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${
                gameState.timeLeft <= 10 ? "bg-red-500" : "bg-orange-500"
              }`}
              style={{ width: `${(gameState.timeLeft / 30) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span
              className={`px-3 py-1 bg-gradient-to-r ${getDifficultyColor(
                currentQ.difficulty
              )} text-white text-sm font-medium rounded-full`}
            >
              {currentQ.difficulty}
            </span>
            <span className="px-3 py-1 bg-slate-700/50 text-gray-300 text-sm font-medium rounded-full">
              {currentQ.category}
            </span>
            <span className="px-3 py-1 bg-slate-700/50 text-yellow-400 text-sm font-medium rounded-full">
              +{currentQ.points} pts
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-bold mb-8 text-white leading-relaxed">
            {currentQ.question}
          </h2>

          <div className="grid gap-4">
            {currentQ.options.map((option, index) => {
              let buttonClass =
                "w-full p-4 rounded-xl font-medium transition-all duration-300 text-left border-2 ";

              if (gameState.showResult) {
                if (index === currentQ.correctAnswer) {
                  buttonClass +=
                    "bg-green-500/20 border-green-500 text-green-400";
                } else if (index === gameState.selectedAnswer) {
                  buttonClass += "bg-red-500/20 border-red-500 text-red-400";
                } else {
                  buttonClass +=
                    "bg-slate-700/30 border-slate-600 text-gray-400";
                }
              } else {
                buttonClass +=
                  "bg-slate-700/30 border-slate-600 text-gray-300 hover:bg-slate-600/50 hover:border-slate-500 hover:text-white";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={gameState.showResult}
                  className={buttonClass}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-sm font-bold">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                    {gameState.showResult &&
                      index === currentQ.correctAnswer && (
                        <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
                      )}
                    {gameState.showResult &&
                      index === gameState.selectedAnswer &&
                      index !== currentQ.correctAnswer && (
                        <XCircle className="w-5 h-5 text-red-400 ml-auto" />
                      )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
