import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, ExternalLink, Github as GitHub, Play, Heart, Eye, Star, Filter, Search, Award, Users, Calendar, Code, Zap } from 'lucide-react';

const Showcase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('popular');

  const projects = [
    {
      id: 1,
      title: 'NeuroBeats',
      description: 'AI-powered music creation using brain signals and EEG sensors. Generate unique soundscapes from your neural patterns.',
      team: ['Alex Chen', 'Maya Rodriguez', 'Jordan Kim'],
      hackathon: 'AI & Music Fusion Hack 2025',
      award: 'Winner - Best AI Innovation',
      category: 'AI & Music',
      tags: ['AI', 'Music', 'Neuroscience', 'React', 'TensorFlow'],
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=600',
      demo: 'https://neurobeats-demo.com',
      github: 'https://github.com/team/neurobeats',
      pitch: 'https://pitch-deck.com/neurobeats',
      likes: 156,
      views: 2847,
      stars: 89,
      techStack: ['React', 'Node.js', 'TensorFlow', 'Web Audio API'],
      date: '2025-02-17',
      featured: true
    },
    {
      id: 2,
      title: 'CyberPunk City VR',
      description: 'Immersive VR city builder with cyberpunk aesthetics, holographic interfaces, and atmospheric soundscapes.',
      team: ['Luna Nakamura', 'David Kim', 'Sofia Rodriguez'],
      hackathon: 'Cyberpunk Future Jam 2025',
      award: '2nd Place - Best Design',
      category: 'Gaming & VR',
      tags: ['VR', 'Gaming', 'Unity', 'C#', '3D Modeling'],
      image: 'https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg?auto=compress&cs=tinysrgb&w=600',
      demo: 'https://cyberpunk-city.com',
      github: 'https://github.com/team/cyberpunk-city-vr',
      pitch: 'https://pitch-deck.com/cyberpunk-city',
      likes: 134,
      views: 2156,
      stars: 67,
      techStack: ['Unity', 'C#', 'Blender', 'Oculus SDK'],
      date: '2025-02-24',
      featured: true
    },
    {
      id: 3,
      title: 'EcoChain',
      description: 'Blockchain-based carbon credit marketplace with transparent tracking and satellite verification.',
      team: ['Marcus Chen', 'Aanya Patel'],
      hackathon: 'GreenTech Innovation 2025',
      award: 'Winner - Best Sustainability Impact',
      category: 'Blockchain & Climate',
      tags: ['Blockchain', 'Sustainability', 'Solidity', 'React'],
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=600',
      demo: 'https://ecochain-app.com',
      github: 'https://github.com/team/ecochain',
      pitch: 'https://pitch-deck.com/ecochain',
      likes: 98,
      views: 1743,
      stars: 54,
      techStack: ['Solidity', 'React', 'Web3.js', 'IPFS'],
      date: '2025-03-03',
      featured: false
    },
    {
      id: 4,
      title: 'MindMeld',
      description: 'Real-time collaborative mind mapping with AI-powered idea connections and creativity insights.',
      team: ['Sam Wilson', 'Riley Parker', 'Casey Taylor'],
      hackathon: 'Future of Work Hack 2025',
      award: '3rd Place - People\'s Choice',
      category: 'Collaboration & AI',
      tags: ['AI', 'Collaboration', 'WebRTC', 'D3.js'],
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600',
      demo: 'https://mindmeld-app.com',
      github: 'https://github.com/team/mindmeld',
      pitch: 'https://pitch-deck.com/mindmeld',
      likes: 87,
      views: 1534,
      stars: 43,
      techStack: ['React', 'Node.js', 'Socket.io', 'OpenAI API'],
      date: '2025-02-10',
      featured: false
    },
    {
      id: 5,
      title: 'HealthAI Assistant',
      description: 'AI-powered health monitoring app with wearable integration and predictive analytics.',
      team: ['Dr. Emily Johnson', 'Alex Singh'],
      hackathon: 'HealthTech Innovation 2025',
      award: 'Winner - Best Health Impact',
      category: 'HealthTech',
      tags: ['HealthTech', 'AI', 'Wearables', 'React Native'],
      image: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=600',
      demo: 'https://healthai-app.com',
      github: 'https://github.com/team/healthai-assistant',
      pitch: 'https://pitch-deck.com/healthai',
      likes: 112,
      views: 1987,
      stars: 61,
      techStack: ['React Native', 'Python', 'TensorFlow', 'Firebase'],
      date: '2025-03-17',
      featured: false
    },
    {
      id: 6,
      title: 'DeFi Yield Optimizer',
      description: 'Automated DeFi yield farming with risk assessment and portfolio optimization algorithms.',
      team: ['Michael Chang', 'Jessica Wu', 'Robert Davis'],
      hackathon: 'Blockchain & DeFi Revolution 2025',
      award: '2nd Place - Best Technical Implementation',
      category: 'DeFi & Finance',
      tags: ['DeFi', 'Blockchain', 'Smart Contracts', 'Web3'],
      image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=600',
      demo: 'https://defi-optimizer.com',
      github: 'https://github.com/team/defi-yield-optimizer',
      pitch: 'https://pitch-deck.com/defi-optimizer',
      likes: 76,
      views: 1432,
      stars: 38,
      techStack: ['Solidity', 'Hardhat', 'React', 'Ethers.js'],
      date: '2025-03-10',
      featured: false
    }
  ];

  const categories = [
    'all', 'AI & Music', 'Gaming & VR', 'Blockchain & Climate', 
    'Collaboration & AI', 'HealthTech', 'DeFi & Finance'
  ];

  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'recent', label: 'Most Recent' },
    { value: 'liked', label: 'Most Liked' },
    { value: 'starred', label: 'Most Starred' }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (selectedSort) {
      case 'recent':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'liked':
        return b.likes - a.likes;
      case 'starred':
        return b.stars - a.stars;
      default: // popular
        return b.views - a.views;
    }
  });

  const getAwardIcon = (award: string) => {
    if (award.includes('Winner') || award.includes('1st')) return Trophy;
    if (award.includes('2nd')) return Award;
    if (award.includes('3rd')) return Star;
    return Award;
  };

  const getAwardColor = (award: string) => {
    if (award.includes('Winner') || award.includes('1st')) return 'text-yellow-400';
    if (award.includes('2nd')) return 'text-gray-400';
    if (award.includes('3rd')) return 'text-orange-400';
    return 'text-purple-400';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Project Showcase</h1>
        <p className="text-gray-400">Discover amazing projects built by the hackathon community</p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects, technologies, or teams..."
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

          {/* Sort */}
          <div className="lg:w-48">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="w-full py-3 px-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-900">
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <p className="text-gray-400">
          Found {filteredProjects.length} projects
        </p>
      </motion.div>

      {/* Project Cards */}
      <div className="grid gap-8">
        {filteredProjects.map((project, index) => {
          const AwardIcon = getAwardIcon(project.award);
          const awardColor = getAwardColor(project.award);
          
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white/5 backdrop-blur-sm border rounded-2xl p-6 hover:border-purple-500/30 transition-all group ${
                project.featured ? 'border-purple-500/20' : 'border-white/10'
              }`}
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Project Image */}
                <div className="lg:w-80 flex-shrink-0">
                  <div 
                    className="w-full h-48 bg-cover bg-center rounded-xl relative overflow-hidden"
                    style={{ backgroundImage: `url(${project.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    
                    {project.featured && (
                      <div className="absolute top-3 left-3 flex items-center space-x-1 bg-purple-500/90 text-white text-xs px-2 py-1 rounded-lg">
                        <Zap className="w-3 h-3" />
                        <span>Featured</span>
                      </div>
                    )}
                    
                    <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/60 text-white text-xs px-2 py-1 rounded-lg">
                      <AwardIcon className={`w-3 h-3 ${awardColor}`} />
                      <span>{project.award.split(' - ')[0]}</span>
                    </div>
                    
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-cyan-400 text-sm font-medium">{project.category}</span>
                      <div className="flex items-center space-x-4 text-white text-sm">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{project.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{project.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="flex-1">
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-yellow-400 font-medium">{project.stars}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <div className="flex items-center space-x-2 text-gray-400 mb-2">
                        <Users className="w-4 h-4" />
                        <span>Team</span>
                      </div>
                      <div className="text-gray-300">{project.team.join(', ')}</div>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2 text-gray-400 mb-2">
                        <Trophy className="w-4 h-4" />
                        <span>Hackathon</span>
                      </div>
                      <div className="text-gray-300">{project.hackathon}</div>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2 text-gray-400 mb-2">
                        <Award className="w-4 h-4" />
                        <span>Award</span>
                      </div>
                      <div className={`font-medium ${awardColor}`}>{project.award}</div>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2 text-gray-400 mb-2">
                        <Code className="w-4 h-4" />
                        <span>Tech Stack</span>
                      </div>
                      <div className="text-gray-300">{project.techStack.join(', ')}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-4">
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg text-white font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
                    >
                      <Play className="w-4 h-4" />
                      <span>Live Demo</span>
                    </motion.a>
                    
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-gray-300 hover:text-white hover:bg-white/20 transition-all"
                    >
                      <GitHub className="w-4 h-4" />
                      <span>Code</span>
                    </motion.a>
                    
                    <motion.a
                      href={project.pitch}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-gray-300 hover:text-white hover:bg-white/20 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Pitch</span>
                    </motion.a>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-white/10 border border-white/20 rounded-lg text-gray-300 hover:text-red-400 hover:bg-white/20 transition-all"
                    >
                      <Heart className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Showcase;