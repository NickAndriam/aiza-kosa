"use client";
import React, { useState } from "react";
import {
  Star,
  ExternalLink,
  Github,
  Play,
  Gamepad2,
  Trophy,
} from "lucide-react";
import Link from "next/link";

// Mock data for your apps - replace with your actual apps
const apps = [
  {
    id: 1,
    name: "Truth or Dare",
    description:
      "The ultimate party game with customizable levels and languages",
    icon: <Star className="w-8 h-8" />,
    color: "from-blue-500 to-purple-600",
    stats: { players: "10K+", rating: 4.8, challenges: "50K+" },
    tags: ["Party", "Social", "Multiplayer", "Games"],
    published: true,
    links: {
      play: "/apps/truth-or-dare/",
      github: "#",
      download: "#",
    },
  },
  {
    id: 5,
    name: "ScoreBoard",
    description: "Professional team scoreboard with conventional UI",
    icon: <Trophy className="w-8 h-8" />,
    color: "from-orange-500 to-pink-500",
    stats: { users: "8K+", rating: 4.5, sport: "Any" },
    tags: ["Utility", "Social", "Multiplayer", "Games"],
    published: true,
    links: {
      play: "http://snap-mark-sable.vercel.app",
      github: "#",
      download: "#",
    },
  },
  // {
  //   id: 5,
  //   name: "Photo Studio",
  //   description: "Professional photo editing with AI-powered enhancements",
  //   icon: <Camera className="w-8 h-8" />,
  //   color: "from-indigo-500 to-blue-500",
  //   stats: { editors: "8K+", rating: 4.5, photos: "500K+" },
  //   tags: ["Photo", "AI", "Creative"],
  //   published: false,
  //   links: {
  //     play: "#",
  //     github: "#",
  //     download: "#",
  //   },
  // },
  // {
  //   id: 2,
  //   name: "Task Master",
  //   description:
  //     "Productivity app with smart scheduling and team collaboration",
  //   icon: <Calendar className="w-8 h-8" />,
  //   color: "from-blue-500 to-purple-500",
  //   stats: { users: "5K+", rating: 4.6, tasks: "100K+" },
  //   tags: ["Productivity", "Teams", "Planning"],
  //   links: {
  //     play: "#",
  //     github: "#",
  //     download: "#",
  //   },
  // },
  // {
  //   id: 3,
  //   name: "Quick Calc",
  //   description: "Advanced calculator with history and scientific functions",
  //   icon: <Calculator className="w-8 h-8" />,
  //   color: "from-green-500 to-teal-500",
  //   stats: { downloads: "15K+", rating: 4.9, calculations: "1M+" },
  //   tags: ["Utility", "Education", "Math"],
  //   links: {
  //     play: "#",
  //     github: "#",
  //     download: "#",
  //   },
  // },
  // {
  //   id: 4,
  //   name: "Beat Mixer",
  //   description: "Music production suite with real-time collaboration",
  //   icon: <Music className="w-8 h-8" />,
  //   color: "from-pink-500 to-rose-500",
  //   stats: { artists: "2K+", rating: 4.7, tracks: "50K+" },
  //   tags: ["Music", "Creative", "Audio"],
  //   links: {
  //     play: "#",
  //     github: "#",
  //     download: "#",
  //   },
  // },
  // {
  //   id: 6,
  //   name: "Study Buddy",
  //   description: "Interactive learning platform with spaced repetition",
  //   icon: <BookOpen className="w-8 h-8" />,
  //   color: "from-emerald-500 to-green-500",
  //   stats: { students: "12K+", rating: 4.8, lessons: "10K+" },
  //   tags: ["Education", "Learning", "Study"],
  //   links: {
  //     play: "#",
  //     github: "#",
  //     download: "#",
  //   },
  // },
];

const categories = [
  "All",
  "Games",
  "Productivity",
  "Creative",
  "Education",
  "Utility",
];

export default function AppPortfolioLanding() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredApp, setHoveredApp] = useState<number | null>(null);

  const filteredApps =
    selectedCategory === "All"
      ? apps
      : apps.filter((app) =>
          app.tags.some(
            (tag) =>
              tag.toLowerCase().includes(selectedCategory.toLowerCase()) ||
              selectedCategory.toLowerCase().includes(tag.toLowerCase())
          )
        );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 pt-16 pb-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <Gamepad2 className="w-8 h-8" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {"Nick's Apps"}
              </h1>
              <p className="text-gray-400 text-lg">Developer & Creator</p>
            </div>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Crafting digital experiences that bring people together, boost
            productivity, and spark creativity
          </p>
        </div>
      </header>

      {/* Category Filter */}
      <div className="relative z-10 px-6 mb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                    : "bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Apps Grid */}
      <main className="relative z-10 px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className="group relative "
                onMouseEnter={() => setHoveredApp(app.id)}
                onMouseLeave={() => setHoveredApp(null)}
              >
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-slate-900/50">
                  {/* App Icon */}
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${app.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {app.icon}
                  </div>

                  {/* App Info */}
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-300 transition-colors">
                    {app.name}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {app.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {app.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-slate-700/50 text-gray-300 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                    {Object.entries(app.stats).map(([key, value]) => (
                      <div key={key} className="bg-slate-700/30 rounded-lg p-3">
                        <div className="text-lg font-bold text-white">
                          {value}
                        </div>
                        <div className="text-xs text-gray-400 capitalize">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  {app.published ? (
                    <div className="flex gap-3">
                      <Link
                        href={app.links.play}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/25"
                      >
                        <Play className="w-4 h-4" />
                        Try It
                      </Link>
                      <button className="bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 hover:text-white px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-center">
                        <Github className="w-4 h-4" />
                      </button>
                      <Link
                        target="_blank"
                        href={app.links.play}
                        className="bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 hover:text-white px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-center"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  ) : (
                    <p>Coming soon...</p>
                  )}
                </div>

                {/* Hover Effect Glow */}
                {hoveredApp === app.id && (
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${app.color} opacity-20 rounded-3xl blur-xl -z-10 transition-opacity duration-500`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex justify-center gap-6 mb-8">
              <button className="w-12 h-12 bg-slate-800/50 hover:bg-slate-700/50 rounded-full flex items-center justify-center transition-colors">
                <Github className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 bg-slate-800/50 hover:bg-slate-700/50 rounded-full flex items-center justify-center transition-colors">
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-400">
              © 2025 Nick. Building the future, one app at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
