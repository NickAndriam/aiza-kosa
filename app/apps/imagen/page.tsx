"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Sparkles,
  Download,
  Share,
  RotateCcw,
  Square,
  RectangleHorizontal,
  RectangleVertical,
  Plus,
} from "lucide-react";
import { generatePuterImage } from "@/app/services/puter";

const ImageGeneratorApp = () => {
  const [currentStep, setCurrentStep] = useState("prompt"); // 'prompt', 'generated'
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("none");
  const [selectedShape, setSelectedShape] = useState("square");
  const [isGenerating, setIsGenerating] = useState(false);
  type GeneratedImage = { id: number; url: string; prompt: string };
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(
    null
  );
  const [credits, setCredits] = useState(47);

  const styles = [
    { id: "none", name: "None", preview: "🎨" },
    { id: "watercolor", name: "Watercolor", preview: "🎨" },
    { id: "anime", name: "Anime", preview: "🎌" },
    { id: "dreamy", name: "Dreamy", preview: "✨" },
    { id: "realistic", name: "Realistic", preview: "📸" },
    { id: "cyberpunk", name: "Cyberpunk", preview: "🌆" },
    { id: "fantasy", name: "Fantasy", preview: "🧙" },
    { id: "oil", name: "Oil Paint", preview: "🖼️" },
  ];

  const shapes = [
    { id: "square", name: "Square", icon: Square },
    { id: "landscape", name: "Landscape", icon: RectangleHorizontal },
    { id: "portrait", name: "Portrait", icon: RectangleVertical },
    { id: "custom", name: "Custom Size", icon: Plus },
  ];

  const inspirationPrompts = [
    "A serene mountain landscape at sunset",
    "Futuristic city with flying cars",
    "Magical forest with glowing mushrooms",
    "Space explorer on alien planet",
    "Cozy coffee shop in the rain",
    "Dragon flying over medieval castle",
  ];

  const mockGeneratedImages = [
    {
      id: 1,
      url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23667eea;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23764ba2;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='300' height='300' fill='url(%23grad1)' /%3E%3Ccircle cx='150' cy='150' r='80' fill='%23fff' opacity='0.3' /%3E%3Ctext x='150' y='160' text-anchor='middle' fill='white' font-size='24' font-family='Arial'%3EArt 1%3C/text%3E%3C/svg%3E",
      prompt: "Space explorer on alien planet",
    },
    {
      id: 2,
      url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f093fb;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23f5576c;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='300' height='300' fill='url(%23grad2)' /%3E%3Ccircle cx='150' cy='150' r='80' fill='%23fff' opacity='0.3' /%3E%3Ctext x='150' y='160' text-anchor='middle' fill='white' font-size='24' font-family='Arial'%3EArt 2%3C/text%3E%3C/svg%3E",
      prompt: "Magical forest scene",
    },
    {
      id: 3,
      url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%234facfe;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%2300f2fe;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='300' height='300' fill='url(%23grad3)' /%3E%3Ccircle cx='150' cy='150' r='80' fill='%23fff' opacity='0.3' /%3E%3Ctext x='150' y='160' text-anchor='middle' fill='white' font-size='24' font-family='Arial'%3EArt 3%3C/text%3E%3C/svg%3E",
      prompt: "Futuristic cityscape",
    },
    {
      id: 4,
      url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Cdefs%3E%3ClinearGradient id='grad4' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ff9a9e;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23fecfef;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='300' height='300' fill='url(%23grad4)' /%3E%3Ccircle cx='150' cy='150' r='80' fill='%23fff' opacity='0.3' /%3E%3Ctext x='150' y='160' text-anchor='middle' fill='white' font-size='24' font-family='Arial'%3EArt 4%3C/text%3E%3C/svg%3E",
      prompt: "Abstract art composition",
    },
  ];

  const handleInspireMe = () => {
    const randomPrompt =
      inspirationPrompts[Math.floor(Math.random() * inspirationPrompts.length)];
    setPrompt(randomPrompt);
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || credits <= 0) return;

    setIsGenerating(true);
    setCredits((prev) => prev - 1);
    const { ok, url, prompt: imagePrompt } = await generatePuterImage(prompt);

    if (ok) {
      // Await for the API call
      setGeneratedImages(mockGeneratedImages);
      setSelectedImage({ id: 1, url, prompt: imagePrompt });
      setCurrentStep("generated");
      setIsGenerating(false);
    }
  };

  const handleRegenerate = () => {
    if (credits <= 0) return;
    setIsGenerating(true);
    setCredits((prev) => prev - 1);

    setTimeout(() => {
      // Shuffle the images for demo
      const shuffled = [...mockGeneratedImages].sort(() => Math.random() - 0.5);
      setGeneratedImages(shuffled);
      setSelectedImage(shuffled[0]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleBack = () => {
    setCurrentStep("prompt");
    setGeneratedImages([]);
    setSelectedImage(null);
  };

  const handleDownload = () => {
    if (selectedImage) {
      // In a real app, this would download the actual image
      const link = document.createElement("a");
      link.href = selectedImage.url;
      link.download = "generated-image.png";
      link.click();
    }
  };

  const handleShare = () => {
    if (navigator.share && selectedImage) {
      navigator.share({
        title: "Generated Image",
        text: selectedImage.prompt,
        url: selectedImage.url,
      });
    }
  };

  if (currentStep === "prompt") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 p-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8 pt-12">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/60 hover:text-white hover:bg-white/10 rounded-xl p-2 mr-3"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold text-white">Prompt</h1>
          </div>

          {/* Prompt Input */}
          <div className="mb-8">
            <p className="text-white text-lg mb-4">
              {"Describe what you'd like to create"}
            </p>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 mb-4">
              <Input
                placeholder="Enter your prompt..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="bg-transparent border-none text-white placeholder:text-gray-400 text-base focus-visible:ring-0 min-h-[80px] resize-none"
                style={{ minHeight: "80px" }}
              />
            </div>
            <Button
              onClick={handleInspireMe}
              variant="ghost"
              className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/20 rounded-xl text-sm"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Inspire me
            </Button>
          </div>

          {/* Style Selection */}
          <div className="mb-8">
            <p className="text-white text-lg mb-4">Choose a style</p>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {styles.slice(0, 4).map((style) => (
                <div
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`bg-white/10 backdrop-blur-xl rounded-2xl p-3 border cursor-pointer transition-all ${
                    selectedStyle === style.id
                      ? "border-purple-500 bg-purple-500/20"
                      : "border-white/20 hover:border-white/40"
                  }`}
                >
                  <div className="aspect-square bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-xl mb-2 flex items-center justify-center text-2xl">
                    {style.preview}
                  </div>
                  <p className="text-white text-xs text-center font-medium">
                    {style.name}
                  </p>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              className="text-white/60 hover:text-white text-sm"
            >
              View all +100 styles
            </Button>
          </div>

          {/* Shape Selection */}
          <div className="mb-8">
            <p className="text-white text-lg mb-4">Choose Shape</p>
            <div className="flex gap-3">
              {shapes.map((shape) => {
                const IconComponent = shape.icon;
                return (
                  <div
                    key={shape.id}
                    onClick={() => setSelectedShape(shape.id)}
                    className={`flex-1 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border cursor-pointer transition-all ${
                      selectedShape === shape.id
                        ? "border-purple-500 bg-purple-500/20"
                        : "border-white/20 hover:border-white/40"
                    }`}
                  >
                    <IconComponent className="w-6 h-6 text-white mx-auto mb-2" />
                    <p className="text-white text-xs text-center font-medium">
                      {shape.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || credits <= 0 || isGenerating}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl h-14 text-lg font-semibold disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Images
              </>
            )}
          </Button>

          {/* Credits */}
          <div className="text-center mt-4">
            <p className="text-yellow-400 text-sm">
              👑 Use 1 of {credits} credits.{" "}
              <span className="text-purple-400 underline cursor-pointer">
                Upgrade for more
              </span>
            </p>
          </div>

          <div className="h-8"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8 pt-12">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="text-white/60 hover:text-white hover:bg-white/10 rounded-xl p-2 mr-3"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold text-white">Generate Images</h1>
        </div>

        {/* Main Generated Image */}
        <div className="mb-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 border border-white/20">
            {selectedImage && (
              <img
                src={selectedImage.url}
                alt="Generated artwork"
                className="w-full aspect-square object-cover rounded-2xl"
              />
            )}
          </div>
        </div>

        {/* Image Variations */}
        <div className="mb-6">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {generatedImages.map((image) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                  selectedImage?.id === image.id
                    ? "border-purple-500"
                    : "border-white/20 hover:border-white/40"
                }`}
              >
                <img
                  src={image.url}
                  alt="Variation"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Regenerate Button */}
        <Button
          onClick={handleRegenerate}
          disabled={credits <= 0 || isGenerating}
          className="w-full bg-purple-600/80 hover:bg-purple-600 text-white rounded-2xl h-14 text-lg font-semibold mb-6 disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Generating...
            </>
          ) : (
            <>
              <RotateCcw className="w-5 h-5 mr-2" />
              Re-Generate Images
            </>
          )}
        </Button>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <Button
            onClick={handleShare}
            variant="ghost"
            className="flex-1 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 rounded-2xl h-12 border border-white/20"
          >
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button
            onClick={handleDownload}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl h-12"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>

        {/* Credits */}
        <div className="text-center">
          <p className="text-yellow-400 text-sm">
            👑 Use 1 of {credits} credits.{" "}
            <span className="text-purple-400 underline cursor-pointer">
              Upgrade for more
            </span>
          </p>
        </div>

        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default ImageGeneratorApp;
