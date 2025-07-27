import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Settings, 
  Trophy, 
  Heart, 
  Code,
  MapPin,
  Calendar,
  Mail,
  Link as LinkIcon,
  Edit,
  Save,
  Music,
  Coffee,
  Moon,
  Zap,
  Brain,
  Palette,
  Camera
} from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const userProfile = {
    name: 'Alex Chen',
    title: 'Full-Stack Developer & AI Enthusiast',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200',
    coverImage: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1200',
    location: 'San Francisco, CA',
    email: 'alex.chen@email.com',
    website: 'https://alexchen.dev',
    joinDate: 'January 2024',
    bio: 'Passionate about building the future through code and creativity. I love exploring the intersection of AI, music, and human experience. Always looking for innovative projects that can make a positive impact.',
    skills: ['React', 'Python', 'TensorFlow', 'Node.js', 'GraphQL', 'Docker', 'AWS', 'TypeScript'],
    interests: ['Techno Music', 'Cyberpunk', 'AI Ethics', 'Startup Culture', 'Digital Art'],
    workingStyle: ['Night Owl', 'Agile Sprints', 'Remote-First', 'Deep Work'],
    stats: {
      hackathonsWon: 8,
      projectsCompleted: 23,
      teamMatches: 47,
      ideasCreated: 15
    },
    achievements: [
      { title: 'AI Innovation Award', description: 'Winner at AI & Music Fusion Hack 2025', icon: Brain, color: 'text-purple-400' },
      { title: 'Team Player', description: 'Successfully completed 20+ collaborative projects', icon: Heart, color: 'text-red-400' },
      { title: 'Code Master', description: '50,000+ lines of code contributed', icon: Code, color: 'text-green-400' },
      { title: 'Creative Visionary', description: 'Top 10% in design and innovation', icon: Palette, color: 'text-cyan-400' }
    ],
    recentProjects: [
      {
        name: 'NeuroBeats',
        description: 'AI-powered music creation using brain signals',
        award: 'Winner - Best AI Innovation',
        image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      {
        name: 'EcoChain',
        description: 'Blockchain carbon credit marketplace',
        award: '2nd Place - Sustainability',
        image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=300'
      }
    ],
    culturalProfile: {
      musicTaste: ['Techno', 'Synthwave', 'Ambient Electronic'],
      movieGenres: ['Sci-Fi', 'Cyberpunk', 'Documentary'],
      bookInterests: ['AI Ethics', 'Future Technology', 'Philosophy'],
      hobbies: ['Digital Art', 'Photography', 'Meditation']
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'cultural', label: 'Cultural Profile', icon: Music },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cover Image & Avatar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden mb-8"
      >
        {/* Cover Image */}
        <div 
          className="h-48 md:h-64 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${userProfile.coverImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all"
          >
            <Camera className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Profile Info */}
        <div className="relative px-6 pb-6">
          {/* Avatar */}
          <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6 -mt-16">
            <div className="relative">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-900 bg-gray-900"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute -bottom-2 -right-2 p-2 bg-purple-600 rounded-full text-white shadow-lg hover:bg-purple-700 transition-all"
              >
                <Camera className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-1">{userProfile.name}</h1>
                  <p className="text-purple-300 text-lg mb-2">{userProfile.title}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{userProfile.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {userProfile.joinDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Mail className="w-4 h-4" />
                      <span>{userProfile.email}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <LinkIcon className="w-4 h-4" />
                      <a href={userProfile.website} className="text-purple-400 hover:text-purple-300">
                        {userProfile.website}
                      </a>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 rounded-lg text-white font-medium hover:bg-purple-700 transition-all"
                >
                  {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  <span>{isEditing ? 'Save Profile' : 'Edit Profile'}</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        {[
          { label: 'Hackathons Won', value: userProfile.stats.hackathonsWon, icon: Trophy, color: 'text-yellow-400' },
          { label: 'Projects Completed', value: userProfile.stats.projectsCompleted, icon: Code, color: 'text-green-400' },
          { label: 'Team Matches', value: userProfile.stats.teamMatches, icon: Heart, color: 'text-red-400' },
          { label: 'Ideas Created', value: userProfile.stats.ideasCreated, icon: Zap, color: 'text-purple-400' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
              <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          );
        })}
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center space-x-1 mb-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-1 overflow-x-auto"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
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

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Bio & Skills */}
            <div className="lg:col-span-2 space-y-6">
              {/* Bio */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">About</h3>
                {isEditing ? (
                  <textarea
                    className="w-full h-32 p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 resize-none"
                    placeholder="Tell us about yourself..."
                    defaultValue={userProfile.bio}
                  />
                ) : (
                  <p className="text-gray-300 leading-relaxed">{userProfile.bio}</p>
                )}
              </div>

              {/* Skills */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {userProfile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Working Style */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Working Style</h3>
                <div className="flex flex-wrap gap-2">
                  {userProfile.workingStyle.map((style) => (
                    <span
                      key={style}
                      className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-lg text-sm"
                    >
                      {style}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Interests */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {userProfile.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1 bg-green-500/20 text-green-300 rounded-lg text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span>Won AI & Music Fusion Hack 2025</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Heart className="w-4 h-4 text-red-400" />
                    <span>Matched with 3 new teammates</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Code className="w-4 h-4 text-green-400" />
                    <span>Created NeuroBeats project</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="grid md:grid-cols-2 gap-6">
            {userProfile.recentProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all"
              >
                <div 
                  className="h-48 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${project.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-lg font-semibold text-white mb-1">{project.name}</h4>
                    <p className="text-gray-300 text-sm">{project.description}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-yellow-400 text-sm font-medium">{project.award}</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="grid md:grid-cols-2 gap-6">
            {userProfile.achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">{achievement.title}</h4>
                      <p className="text-gray-400 text-sm">{achievement.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {activeTab === 'cultural' && (
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Music Taste', items: userProfile.culturalProfile.musicTaste, icon: Music, color: 'purple' },
              { title: 'Movie Genres', items: userProfile.culturalProfile.movieGenres, icon: Camera, color: 'cyan' },
              { title: 'Book Interests', items: userProfile.culturalProfile.bookInterests, icon: Coffee, color: 'green' },
              { title: 'Hobbies', items: userProfile.culturalProfile.hobbies, icon: Heart, color: 'red' }
            ].map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <Icon className={`w-5 h-5 text-${category.color}-400`} />
                    <h4 className="text-lg font-semibold text-white">{category.title}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className={`px-3 py-1 bg-${category.color}-500/20 text-${category.color}-300 rounded-lg text-sm`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="text-center py-12">
              <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Profile Settings</h3>
              <p className="text-gray-400 mb-6">Manage your account preferences and privacy settings</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl text-white font-semibold"
              >
                Open Settings
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;