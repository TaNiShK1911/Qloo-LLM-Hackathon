import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Plus, 
  ThumbsUp, 
  MessageCircle, 
  Share,
  Sparkles,
  Code,
  Palette,
  Zap,
  Users,
  Clock,
  TrendingUp,
  Filter,
  Search
} from 'lucide-react';

const IdeaIncubator = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const ideas = [
    {
      id: 1,
      title: 'NeuroBeats - AI Music from Brain Signals',
      description: 'Create music by reading brainwave patterns using EEG sensors. Each person\'s unique neural patterns generate personalized soundscapes and melodies.',
      author: 'Alex Chen',
      authorAvatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100',
      category: 'AI & Music',
      tags: ['AI', 'Music', 'Neuroscience', 'Hardware'],
      likes: 47,
      comments: 12,
      timeAgo: '2 hours ago',
      difficulty: 'Advanced',
      estimatedTime: '48 hours',
      techStack: ['Python', 'TensorFlow', 'Web Audio API', 'Arduino'],
      aiSuggestions: {
        scope: 'MVP: Simple brainwave detection → basic tone generation',
        apis: ['Brain.js', 'Tone.js', 'Web Audio API'],
        implementation: 'Start with mouse movement as brainwave simulation'
      },
      collaboration: {
        looking: ['Hardware Engineer', 'Music Producer', 'ML Engineer'],
        teamSize: '3-4 people'
      }
    },
    {
      id: 2,
      title: 'CyberPunk City Builder VR',
      description: 'Immersive VR experience where players design and build cyberpunk cities with neon aesthetics, holographic interfaces, and atmospheric soundscapes.',
      author: 'Maya Rodriguez',
      authorAvatar: 'https://images.pexels.com/photos/3671083/pexels-photo-3671083.jpeg?auto=compress&cs=tinysrgb&w=100',
      category: 'Gaming & VR',
      tags: ['VR', 'Gaming', 'Cyberpunk', '3D Modeling'],
      likes: 63,
      comments: 18,
      timeAgo: '4 hours ago',
      difficulty: 'Intermediate',
      estimatedTime: '36 hours',
      techStack: ['Unity', 'C#', 'Blender', 'Oculus SDK'],
      aiSuggestions: {
        scope: 'MVP: Simple block-based building in VR with cyberpunk assets',
        apis: ['Unity XR Toolkit', 'OpenXR'],
        implementation: 'Focus on core building mechanics first'
      },
      collaboration: {
        looking: ['3D Artist', 'VR Developer', 'Sound Designer'],
        teamSize: '4-5 people'
      }
    },
    {
      id: 3,
      title: 'EcoChain - Carbon Credit Marketplace',
      description: 'Blockchain-based platform for trading verified carbon credits with transparent tracking, satellite verification, and gamified sustainability challenges.',
      author: 'Jordan Kim',
      authorAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
      category: 'Blockchain & Climate',
      tags: ['Blockchain', 'Sustainability', 'Smart Contracts', 'DeFi'],
      likes: 39,
      comments: 8,
      timeAgo: '6 hours ago',
      difficulty: 'Advanced',
      estimatedTime: '54 hours',
      techStack: ['Solidity', 'React', 'Web3.js', 'IPFS'],
      aiSuggestions: {
        scope: 'MVP: Simple credit creation and trading with mock verification',
        apis: ['OpenSea API', 'Polygon', 'IPFS'],
        implementation: 'Start with ERC-721 tokens for carbon credits'
      },
      collaboration: {
        looking: ['Blockchain Developer', 'Environmental Scientist', 'UI Designer'],
        teamSize: '3-4 people'
      }
    },
    {
      id: 4,
      title: 'MindMeld - Collaborative Thought Mapping',
      description: 'Real-time collaborative mind mapping tool with AI-powered idea connections, emotion analysis, and group creativity insights.',
      author: 'Sam Wilson',
      authorAvatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=100',
      category: 'Collaboration & AI',
      tags: ['AI', 'Collaboration', 'Mind Mapping', 'WebRTC'],
      likes: 52,
      comments: 15,
      timeAgo: '1 day ago',
      difficulty: 'Intermediate',
      estimatedTime: '42 hours',
      techStack: ['React', 'Node.js', 'Socket.io', 'D3.js'],
      aiSuggestions: {
        scope: 'MVP: Real-time collaborative canvas with basic AI suggestions',
        apis: ['OpenAI API', 'Socket.io', 'Canvas API'],
        implementation: 'Focus on real-time sync first, add AI later'
      },
      collaboration: {
        looking: ['Frontend Developer', 'AI Engineer', 'UX Designer'],
        teamSize: '3-4 people'
      }
    }
  ];

  const categories = [
    'all', 'AI & Music', 'Gaming & VR', 'Blockchain & Climate', 
    'Collaboration & AI', 'HealthTech', 'FinTech', 'EdTech'
  ];

  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || idea.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-500/20';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-500/20';
      case 'Advanced': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Idea Incubator</h1>
        <p className="text-gray-400">Collaborate on project ideas with AI-powered suggestions</p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center space-x-1 mb-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-1"
      >
        {[
          { id: 'browse', label: 'Browse Ideas', icon: Search },
          { id: 'create', label: 'Create Idea', icon: Plus },
          { id: 'my-ideas', label: 'My Ideas', icon: Lightbulb }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-500 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
            </motion.button>
          );
        })}
      </motion.div>

      {activeTab === 'browse' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Search and Filters */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search ideas, tags, or technologies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              {/* Category Filter */}
              <div className="lg:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full py-3 px-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                >
                  {categories.map((category) => (
                    <option key={category} value={category} className="bg-gray-900">
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Ideas Grid */}
          <div className="grid gap-6">
            {filteredIdeas.map((idea, index) => (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all group"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Main Content */}
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={idea.authorAvatar}
                          alt={idea.author}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                            {idea.title}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <span>by {idea.author}</span>
                            <span>•</span>
                            <span>{idea.timeAgo}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getDifficultyColor(idea.difficulty)}`}>
                          {idea.difficulty}
                        </span>
                        <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-lg">
                          {idea.category}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {idea.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {idea.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center space-x-6 text-sm text-gray-400 mb-4">
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{idea.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{idea.comments}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{idea.estimatedTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{idea.collaboration.teamSize}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-gray-300 hover:text-white hover:bg-white/20 transition-all"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>Like</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-gray-300 hover:text-white hover:bg-white/20 transition-all"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Comment</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg text-white font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
                      >
                        Join Project
                      </motion.button>
                    </div>
                  </div>

                  {/* AI Suggestions Sidebar */}
                  <div className="lg:w-80 bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                      <h4 className="font-semibold text-white">AI Suggestions</h4>
                    </div>

                    <div className="space-y-4 text-sm">
                      <div>
                        <div className="text-gray-300 font-medium mb-1">Scope</div>
                        <div className="text-gray-400">{idea.aiSuggestions.scope}</div>
                      </div>

                      <div>
                        <div className="text-gray-300 font-medium mb-1">Recommended APIs</div>
                        <div className="flex flex-wrap gap-1">
                          {idea.aiSuggestions.apis.map((api) => (
                            <span key={api} className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-lg">
                              {api}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-gray-300 font-medium mb-1">Tech Stack</div>
                        <div className="flex flex-wrap gap-1">
                          {idea.techStack.map((tech) => (
                            <span key={tech} className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-lg">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-gray-300 font-medium mb-1">Looking For</div>
                        <div className="flex flex-wrap gap-1">
                          {idea.collaboration.looking.map((role) => (
                            <span key={role} className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-lg">
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/10">
                        <div className="text-gray-400 text-xs">
                          <strong>Implementation tip:</strong> {idea.aiSuggestions.implementation}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'create' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
        >
          <div className="text-center py-12">
            <Plus className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Create New Idea</h3>
            <p className="text-gray-400 mb-6">Share your innovative project concept with the community</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
            >
              Start Creating
            </motion.button>
          </div>
        </motion.div>
      )}

      {activeTab === 'my-ideas' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
        >
          <div className="text-center py-12">
            <Lightbulb className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Your Ideas</h3>
            <p className="text-gray-400 mb-6">Manage and track your project ideas</p>
            <div className="text-gray-400">No ideas created yet. Start by browsing existing ideas or creating your own!</div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default IdeaIncubator;