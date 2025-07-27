import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  Trophy, 
  TrendingUp, 
  Clock,
  MapPin,
  Zap,
  ArrowRight
} from 'lucide-react';

const Dashboard = () => {
  const recentHackathons = [
    {
      id: 1,
      name: 'AI & Music Fusion Hack',
      date: 'Feb 15-17, 2025',
      location: 'San Francisco',
      participants: 2500,
      prize: '$50,000',
      tags: ['AI', 'Music', 'Creative Tech'],
      match: 95
    },
    {
      id: 2,
      name: 'Cyberpunk Future Jam',
      date: 'Feb 22-24, 2025',
      location: 'Virtual',
      participants: 1800,
      prize: '$25,000',
      tags: ['Cyberpunk', 'VR', 'Gaming'],
      match: 88
    },
    {
      id: 3,
      name: 'GreenTech Innovation',
      date: 'Mar 1-3, 2025',
      location: 'Austin',
      participants: 3200,
      prize: '$75,000',
      tags: ['Sustainability', 'IoT', 'Climate'],
      match: 82
    }
  ];

  const activeProjects = [
    {
      id: 1,
      name: 'NeuroBeats',
      description: 'AI-powered music creation using brain signals',
      progress: 65,
      team: ['Alex', 'Maya', 'Jordan'],
      deadline: '2 days'
    },
    {
      id: 2,
      name: 'CyberNeon UI',
      description: 'Futuristic design system for web3 apps',
      progress: 40,
      team: ['Sam', 'Riley'],
      deadline: '5 days'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Alex!</h1>
        <p className="text-gray-400">Ready to forge something amazing?</p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        {[
          { icon: Trophy, label: 'Hackathons Won', value: '3', color: 'text-yellow-400' },
          { icon: Users, label: 'Team Matches', value: '12', color: 'text-cyan-400' },
          { icon: Zap, label: 'Ideas Created', value: '8', color: 'text-purple-400' },
          { icon: TrendingUp, label: 'Success Rate', value: '92%', color: 'text-green-400' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recommended Hackathons */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Recommended for You</h2>
              <Link to="/discovery" className="text-purple-400 hover:text-purple-300 flex items-center space-x-1">
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {recentHackathons.map((hackathon) => (
                <motion.div
                  key={hackathon.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-purple-500/30 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-white mb-1">{hackathon.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{hackathon.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{hackathon.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-purple-400 font-medium mb-1">
                        {hackathon.match}% match
                      </div>
                      <div className="text-xs text-gray-400">{hackathon.prize}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {hackathon.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{hackathon.participants}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Active Projects */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Active Projects</h2>
              <Link to="/workspace" className="text-purple-400 hover:text-purple-300">
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="space-y-4">
              {activeProjects.map((project) => (
                <div key={project.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="mb-3">
                    <h3 className="font-semibold text-white mb-1">{project.name}</h3>
                    <p className="text-sm text-gray-400">{project.description}</p>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-cyan-400">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400">{project.team.join(', ')}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-orange-400">
                      <Clock className="w-4 h-4" />
                      <span>{project.deadline}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {[
                { label: 'Find Teammates', path: '/teammates', icon: Users },
                { label: 'New Project Idea', path: '/incubator', icon: Zap },
                { label: 'Join Workspace', path: '/workspace', icon: Trophy }
              ].map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link key={index} to={action.path}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center space-x-3 p-3 bg-white/5 border border-white/10 rounded-lg hover:border-purple-500/30 transition-all cursor-pointer"
                    >
                      <Icon className="w-5 h-5 text-purple-400" />
                      <span className="text-white">{action.label}</span>
                      <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;