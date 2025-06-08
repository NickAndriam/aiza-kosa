"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCheck } from "lucide-react";
import { Challenge } from "./ChallengeCard";

interface ChallengeDisplayProps {
  defaultLanguage: string;
  challengeType: string | null;
  currentChallenge: string;
  nextTurn: () => void;
  clearChallenge: () => void;
}

export const ChallengeDisplay: React.FC<ChallengeDisplayProps> = ({
  defaultLanguage,
  challengeType,
  currentChallenge,
  nextTurn,
  clearChallenge,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center grid place-items-center">
        <div
          className={` w-min p-1 rounded-full border-2  animate-pulse
          ${
            challengeType === "truth" ? "border-blue-500" : "border-purple-600"
          }`}
        >
          <Badge
            className={`text-sm px-4 py-2 rounded-full ${
              challengeType === "truth" ? "bg-blue-600" : "bg-purple-600"
            } text-white`}
          >
            {challengeType === "truth" ? "Truth" : "Dare"}
          </Badge>
        </div>
      </div>
      <Challenge
        defaultLanguage={defaultLanguage}
        challenge={currentChallenge}
      />
      <div className="space-y-3">
        <Button
          onClick={nextTurn}
          className="w-full border bg-transparent border-green-600 text-white hover:bg-green-700 rounded-2xl h-14 text-lg font-semibold"
        >
          <CheckCheck className="text-white mr-2" />
          Complete Challenge
        </Button>

        <Button
          onClick={clearChallenge}
          variant="ghost"
          className="w-full text-white hover:text-white hover:bg-white/10 rounded-2xl h-12 border border-white/20 text-sm"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};
