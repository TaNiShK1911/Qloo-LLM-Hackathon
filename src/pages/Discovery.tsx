import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Users, 
  Trophy,
  Heart,
  Bookmark,
  ExternalLink,
  Sparkles
} from 'lucide-react';

const Discovery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const hackathons = [
    {
      id: 1,
      name: 'AI & Music Fusion Hack',
      description: 'Create the next generation of AI-powered music experiences. From composition to live performance, explore the intersection of artificial intelligence and sonic creativity.',
      date: 'Feb 15-17, 2025',
      location: 'San Francisco, CA',
      format: 'In-Person',
      participants: 2500,
      prize: '$50,000',
      tags: ['AI', 'Music', 'Creative Tech', 'Machine Learning'],
      match: 95,
      organizer: 'TechBeats Inc.',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=600',
      registrationOpen: true,
      featured: true
    },
    {
      id: 2,
      name: 'Cyberpunk Future Jam',
      description: 'Build immersive digital experiences inspired by cyberpunk aesthetics. VR, AR, and interactive installations welcome.',
      date: 'Feb 22-24, 2025',
      location: 'Virtual',
      format: 'Remote',
      participants: 1800,
      prize: '$25,000',
      tags: ['Cyberpunk', 'VR', 'Gaming', 'Digital Art'],
      match: 88,
      organizer: 'NeonLabs',
      image: 'https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg?auto=compress&cs=tinysrgb&w=600',
      registrationOpen: true,
      featured: false
    },
    {
      id: 3,
      name: 'GreenTech Innovation Summit',
      description: 'Develop sustainable solutions for climate change using cutting-edge technology. Focus on IoT, renewable energy, and environmental monitoring.',
      date: 'Mar 1-3, 2025',
      location: 'Austin, TX',
      format: 'Hybrid',
      participants: 3200,
      prize: '$75,000',
      tags: ['Sustainability', 'IoT', 'Climate', 'GreenTech'],
      match: 82,
      organizer: 'ClimateCode',
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=600',
      registrationOpen: true,
      featured: true
    },
    {
      id: 4,
      name: 'Blockchain & DeFi Revolution',
      description: 'Shape the future of decentralized finance. Build protocols, dApps, and tools for the next generation of web3.',
      date: 'Mar 8-10, 2025',
      location: 'Miami, FL',
      format: 'In-Person',
      participants: 2100,
      prize: '$100,000',
      tags: ['Blockchain', 'DeFi', 'Web3', 'Cryptocurrency'],
      match: 75,
      organizer: 'CryptoBuilders',
      image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=600',
      registrationOpen: true,
      featured: false
    },
    {
      id: 5,
      name: 'HealthTech Innovation',
      description: 'Revolutionize healthcare with technology. From medical devices to health apps, create solutions that save lives.',
      date: 'Mar 15-17, 2025',
      location: 'Boston, MA',
      format: 'In-Person',
      participants: 2800,
      prize: '$60,000',
      tags: ['HealthTech', 'Medical', 'AI', 'Wearables'],
      match: 70,
      organizer: 'MedTech Labs',
      image: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=600',
      registrationOpen: true,
      featured: false
    }
  ];

  const filterCategories = [
    'AI', 'Music', 'Creative Tech', 'Cyberpunk', 'VR', 'Gaming', 
    'Sustainability', 'IoT', 'Climate', 'Blockchain', 'DeFi', 'Web3', 
    'HealthTech', 'Medical', 'In-Person', 'Remote', 'Hybrid'
  ];

  const filteredHackathons = hackathons.filter(hackathon => {
    const matchesSearch = hackathon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hackathon.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hackathon.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilters = selectedFilters.length === 0 || 
                          selectedFilters.some(filter => 
                            hackathon.tags.includes(filter) || hackathon.format === filter
                          );
    
    return matchesSearch && matchesFilters;
  });

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Discover Hackathons</h1>
        <p className="text-gray-400">Find your perfect hackathon match powered by AI recommendations</p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8"
      >
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search hackathons, themes, or technologies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
          />
        </div>

        {/* Filter Tags */}
        <div className="flex items-center space-x-4 mb-4">
          <Filter className="text-gray-400 w-5 h-5" />
          <span className="text-gray-300 font-medium">Filters:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {filterCategories.map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleFilter(filter)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                selectedFilters.includes(filter)
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </div>

        {selectedFilters.length > 0 && (
          <div className="mt-4 flex items-center space-x-2">
            <span className="text-sm text-gray-400">Active filters:</span>
            {selectedFilters.map((filter) => (
              <span
                key={filter}
                className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-lg flex items-center space-x-1"
              >
                <span>{filter}</span>
                <button
                  onClick={() => toggleFilter(filter)}
                  className="text-purple-300 hover:text-white"
                >
                  ×
                </button>
              </span>
            ))}
            <button
              onClick={() => setSelectedFilters([])}
              className="text-xs text-gray-400 hover:text-white underline"
            >
              Clear all
            </button>
          </div>
        )}
      </motion.div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <p className="text-gray-400">
          Found {filteredHackathons.length} hackathons
          {selectedFilters.length > 0 && ` matching your filters`}
        </p>
      </motion.div>

      {/* Hackathon Cards */}
      <div className="grid gap-6">
        {filteredHackathons.map((hackathon, index) => (
          <motion.div
            key={hackathon.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white/5 backdrop-blur-sm border rounded-2xl p-6 hover:border-purple-500/30 transition-all group ${
              hackathon.featured ? 'border-purple-500/20' : 'border-white/10'
            }`}
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Image */}
              <div className="lg:w-80 flex-shrink-0">
                <div 
                  className="w-full h-48 bg-cover bg-center rounded-xl relative overflow-hidden"
                  style={{ backgroundImage: `url(${hackathon.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {hackathon.featured && (
                    <div className="absolute top-3 left-3 flex items-center space-x-1 bg-purple-500/90 text-white text-xs px-2 py-1 rounded-lg">
                      <Sparkles className="w-3 h-3" />
                      <span>Featured</span>
                    </div>
                  )}
                  
                  <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                    {hackathon.match}% match
                  </div>
                  
                  <div className="absolute bottom-3 right-3 flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                    >
                      <Heart className="w-4 h-4 text-white" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                    >
                      <Bookmark className="w-4 h-4 text-white" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {hackathon.name}
                    </h3>
                    <div className="text-right">
                      <div className="text-lg font-bold text-cyan-400">{hackathon.prize}</div>
                      <div className="text-xs text-gray-400">Prize Pool</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {hackathon.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hackathon.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{hackathon.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{hackathon.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{hackathon.participants.toLocaleString()} participants</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    Organized by <span className="text-purple-400">{hackathon.organizer}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm hover:bg-white/20 transition-all flex items-center space-x-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View Details</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg text-white text-sm font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
                    >
                      Register Now
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Discovery;