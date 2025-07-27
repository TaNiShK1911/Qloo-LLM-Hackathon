import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Users, 
  MapPin, 
  Clock,
  Code,
  Heart,
  MessageCircle,
  Star,
  Zap,
  Music,
  Coffee,
  Moon
} from 'lucide-react';

const TeammateFinder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const teammates = [
    {
      id: 1,
      name: 'Aanya Patel',
      title: 'Full-Stack Developer & AI Enthusiast',
      location: 'San Francisco, CA',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150',
      skills: ['React', 'Python', 'TensorFlow', 'Node.js'],
      interests: ['Techno Music', 'Cyberpunk', 'Startup Culture'],
      workingStyle: ['Night Owl', 'Agile Sprints', 'Remote-First'],
      compatibility: 95,
      bio: 'Building the future one algorithm at a time. Love creating AI-powered experiences that blend technology with creativity.',
      hackathonsWon: 8,
      projectsCompleted: 23,
      rating: 4.9,
      availability: 'Available',
      timezone: 'PST',
      preferredRole: 'Tech Lead',
      languages: ['JavaScript', 'Python', 'Go'],
      recentActivity: '2 hours ago'
    },
    {
      id: 2,
      name: 'Marcus Chen',
      title: 'UI/UX Designer & Creative Technologist',
      location: 'New York, NY',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      skills: ['Figma', 'React', 'Three.js', 'After Effects'],
      interests: ['Synthwave', 'Anime', 'Digital Art'],
      workingStyle: ['Early Bird', 'Design Thinking', 'Collaborative'],
      compatibility: 88,
      bio: 'Crafting immersive digital experiences. Obsessed with the intersection of design and technology.',
      hackathonsWon: 5,
      projectsCompleted: 31,
      rating: 4.8,
      availability: 'Available',
      timezone: 'EST',
      preferredRole: 'Design Lead',
      languages: ['JavaScript', 'Swift', 'C#'],
      recentActivity: '1 hour ago'
    },
    {
      id: 3,
      name: 'Sofia Rodriguez',
      title: 'Blockchain Developer & Web3 Pioneer',
      location: 'Austin, TX',
      avatar: 'https://images.pexels.com/photos/3671083/pexels-photo-3671083.jpeg?auto=compress&cs=tinysrgb&w=150',
      skills: ['Solidity', 'Rust', 'Web3.js', 'Smart Contracts'],
      interests: ['DeFi', 'Electronic Music', 'Crypto Art'],
      workingStyle: ['Flexible Hours', 'Deep Work', 'Innovation-Focused'],
      compatibility: 82,
      bio: 'Decentralizing the world through code. Building the infrastructure for Web3\'s future.',
      hackathonsWon: 12,
      projectsCompleted: 18,
      rating: 4.9,
      availability: 'Busy until Mar 1',
      timezone: 'CST',
      preferredRole: 'Blockchain Lead',
      languages: ['Solidity', 'Rust', 'JavaScript'],
      recentActivity: '30 minutes ago'
    },
    {
      id: 4,
      name: 'David Kim',
      title: 'Data Scientist & ML Engineer',
      location: 'Seattle, WA',
      avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150',
      skills: ['Python', 'PyTorch', 'SQL', 'Docker'],
      interests: ['Jazz', 'Philosophy', 'Open Source'],
      workingStyle: ['Morning Person', 'Research-Driven', 'Methodical'],
      compatibility: 75,
      bio: 'Turning data into insights and insights into impact. Passionate about ethical AI and sustainable tech.',
      hackathonsWon: 6,
      projectsCompleted: 27,
      rating: 4.7,
      availability: 'Available weekends',
      timezone: 'PST',
      preferredRole: 'Data Lead',
      languages: ['Python', 'R', 'Java'],
      recentActivity: '4 hours ago'
    },
    {
      id: 5,
      name: 'Luna Nakamura',
      title: 'Game Developer & VR Specialist',
      location: 'Los Angeles, CA',
      avatar: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=150',
      skills: ['Unity', 'C#', 'Blender', 'VR/AR'],
      interests: ['Gaming', 'Anime', 'J-Pop'],
      workingStyle: ['Night Owl', 'Creative Bursts', 'Prototype-First'],
      compatibility: 90,
      bio: 'Creating immersive worlds and unforgettable experiences. VR is the future, and I\'m building it.',
      hackathonsWon: 9,
      projectsCompleted: 15,
      rating: 4.8,
      availability: 'Available',
      timezone: 'PST',
      preferredRole: 'Game Dev Lead',
      languages: ['C#', 'JavaScript', 'C++'],
      recentActivity: '1 day ago'
    }
  ];

  const skills = [
    'React', 'Python', 'Node.js', 'TypeScript', 'Figma', 'Unity', 
    'Solidity', 'TensorFlow', 'Docker', 'AWS', 'GraphQL', 'Vue.js',
    'Swift', 'Kotlin', 'Rust', 'Go', 'PostgreSQL', 'MongoDB'
  ];

  const filteredTeammates = teammates.filter(teammate => {
    const matchesSearch = teammate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teammate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teammate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSkills = selectedSkills.length === 0 || 
                         selectedSkills.some(skill => teammate.skills.includes(skill));
    
    return matchesSearch && matchesSkills;
  });

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const renderCompatibilityScore = (score: number) => {
    const getColor = (score: number) => {
      if (score >= 90) return 'text-green-400';
      if (score >= 80) return 'text-cyan-400';
      if (score >= 70) return 'text-yellow-400';
      return 'text-orange-400';
    };

    return (
      <div className={`text-lg font-bold ${getColor(score)}`}>
        {score}% match
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Find Your Perfect Teammates</h1>
        <p className="text-gray-400">AI-powered matching based on skills, culture, and working style</p>
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
            placeholder="Search by name, skills, or interests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
          />
        </div>

        {/* Skill Filters */}
        <div className="flex items-center space-x-4 mb-4">
          <Filter className="text-gray-400 w-5 h-5" />
          <span className="text-gray-300 font-medium">Skills:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <motion.button
              key={skill}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleSkill(skill)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                selectedSkills.includes(skill)
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {skill}
            </motion.button>
          ))}
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
          Found {filteredTeammates.length} potential teammates
        </p>
      </motion.div>

      {/* Teammate Cards */}
      <div className="grid lg:grid-cols-2 gap-6">
        {filteredTeammates.map((teammate, index) => (
          <motion.div
            key={teammate.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={teammate.avatar}
                    alt={teammate.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-gray-900 ${
                    teammate.availability === 'Available' ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{teammate.name}</h3>
                  <p className="text-purple-300 text-sm">{teammate.title}</p>
                  <div className="flex items-center space-x-1 text-gray-400 text-xs">
                    <MapPin className="w-3 h-3" />
                    <span>{teammate.location}</span>
                    <span>•</span>
                    <span>{teammate.timezone}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                {renderCompatibilityScore(teammate.compatibility)}
                <div className="flex items-center space-x-1 text-yellow-400 text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{teammate.rating}</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {teammate.bio}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4 text-center">
              <div>
                <div className="text-cyan-400 font-bold">{teammate.hackathonsWon}</div>
                <div className="text-gray-400 text-xs">Hackathons Won</div>
              </div>
              <div>
                <div className="text-purple-400 font-bold">{teammate.projectsCompleted}</div>
                <div className="text-gray-400 text-xs">Projects</div>
              </div>
              <div>
                <div className="text-orange-400 font-bold">{teammate.preferredRole}</div>
                <div className="text-gray-400 text-xs">Preferred Role</div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Code className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm font-medium">Skills</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {teammate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Interests & Working Style */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Heart className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300 text-sm font-medium">Interests</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {teammate.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-lg"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300 text-sm font-medium">Work Style</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {teammate.workingStyle.map((style) => (
                    <span
                      key={style}
                      className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-lg"
                    >
                      {style}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability & Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center space-x-4 text-sm">
                <div className={`flex items-center space-x-1 ${
                  teammate.availability === 'Available' ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    teammate.availability === 'Available' ? 'bg-green-400' : 'bg-yellow-400'
                  }`} />
                  <span>{teammate.availability}</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400">Active {teammate.recentActivity}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-white/10 border border-white/20 rounded-lg text-gray-300 hover:text-white hover:bg-white/20 transition-all"
                >
                  <Heart className="w-4 h-4" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg text-white text-sm font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all flex items-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TeammateFinder;