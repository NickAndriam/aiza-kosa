"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface GameControlsProps {
  selectTruthOrDare: (type: "truth" | "dare") => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
  selectTruthOrDare,
}) => {
  return (
    <div className="space-y-4 text-center">
      <p className="text-white/80 mb-6">What do you choose?</p>
      <Button
        onClick={() => selectTruthOrDare("truth")}
        className="w-full bg-blue-600/80 hover:bg-blue-600 text-white rounded-2xl h-14 text-lg font-semibold backdrop-blur-sm"
      >
        Truth
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>

      <Button
        onClick={() => selectTruthOrDare("dare")}
        className="w-full bg-purple-600/80 hover:bg-purple-600 text-white rounded-2xl h-14 text-lg font-semibold backdrop-blur-sm"
      >
        Dare
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  );
};
