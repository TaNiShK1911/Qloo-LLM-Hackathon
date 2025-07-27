import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  FileText, 
  Kanban, 
  Users, 
  MessageCircle,
  Video,
  Settings,
  Play,
  Save,
  Share,
  GitBranch,
  Terminal,
  Palette,
  Clock,
  CheckSquare
} from 'lucide-react';

const Workspace = () => {
  const [activeTab, setActiveTab] = useState('code');
  const [code, setCode] = useState(`// NeuroBeats - AI Music from Brain Signals
import React, { useState, useEffect } from 'react';
import { Tone } from 'tone';

const NeuroBeats = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [brainwaves, setBrainwaves] = useState([]);

  // Simulate brainwave data (replace with actual EEG input)
  const generateBrainwave = () => {
    return Math.random() * 100;
  };

  const createTone = (frequency) => {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(frequency, '8n');
  };

  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        const wave = generateBrainwave();
        setBrainwaves(prev => [...prev.slice(-50), wave]);
        
        // Convert brainwave to musical note
        const frequency = 200 + (wave * 8);
        createTone(frequency);
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isRecording]);

  return (
    <div className="neuro-beats">
      <h2>NeuroBeats Controller</h2>
      <button onClick={() => setIsRecording(!isRecording)}>
        {isRecording ? 'Stop' : 'Start'} Recording
      </button>
      
      <div className="waveform">
        {brainwaves.map((wave, index) => (
          <div 
            key={index}
            style={{ 
              height: \`\${wave}%\`,
              backgroundColor: \`hsl(\${wave * 3.6}, 70%, 50%)\`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NeuroBeats;`);

  const tabs = [
    { id: 'code', label: 'Code Editor', icon: Code },
    { id: 'docs', label: 'Documents', icon: FileText },
    { id: 'kanban', label: 'Kanban', icon: Kanban },
    { id: 'chat', label: 'Team Chat', icon: MessageCircle },
    { id: 'whiteboard', label: 'Whiteboard', icon: Palette }
  ];

  const teamMembers = [
    { name: 'Alex', avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=50', status: 'online' },
    { name: 'Maya', avatar: 'https://images.pexels.com/photos/3671083/pexels-photo-3671083.jpeg?auto=compress&cs=tinysrgb&w=50', status: 'online' },
    { name: 'Jordan', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50', status: 'away' }
  ];

  const kanbanTasks = {
    todo: [
      { id: 1, title: 'Set up EEG sensor integration', assignee: 'Alex', priority: 'high' },
      { id: 2, title: 'Design audio synthesis engine', assignee: 'Maya', priority: 'medium' },
      { id: 3, title: 'Create user interface mockups', assignee: 'Jordan', priority: 'low' }
    ],
    inProgress: [
      { id: 4, title: 'Implement brainwave visualization', assignee: 'Alex', priority: 'high' },
      { id: 5, title: 'Build tone generation system', assignee: 'Maya', priority: 'medium' }
    ],
    done: [
      { id: 6, title: 'Research brainwave-to-music algorithms', assignee: 'Team', priority: 'high' },
      { id: 7, title: 'Set up development environment', assignee: 'Alex', priority: 'low' }
    ]
  };

  const chatMessages = [
    { id: 1, user: 'Maya', message: 'Just pushed the tone generation updates!', time: '2:34 PM', avatar: 'https://images.pexels.com/photos/3671083/pexels-photo-3671083.jpeg?auto=compress&cs=tinysrgb&w=40' },
    { id: 2, user: 'Alex', message: 'Great! The EEG simulation is working now. We can test the full pipeline.', time: '2:35 PM', avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=40' },
    { id: 3, user: 'Jordan', message: 'I\'ve got some UI mockups ready. Should we review them in the next standup?', time: '2:37 PM', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40' },
    { id: 4, user: 'AI Assistant', message: 'Suggestion: Consider using Web Audio API\'s AnalyserNode for real-time frequency analysis', time: '2:38 PM', avatar: '/api/placeholder/40/40' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-500/10';
      case 'medium': return 'border-l-yellow-500 bg-yellow-500/10';
      case 'low': return 'border-l-green-500 bg-green-500/10';
      default: return 'border-l-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">NeuroBeats Workspace</h1>
          <p className="text-gray-400">AI-powered music creation using brain signals</p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Team Members */}
          <div className="flex items-center space-x-2">
            {teamMembers.map((member, index) => (
              <div key={index} className="relative">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-gray-700"
                />
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-gray-900 ${
                  member.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-white/10 border border-white/20 rounded-lg text-gray-300 hover:text-white hover:bg-white/20 transition-all"
            >
              <Video className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-white/10 border border-white/20 rounded-lg text-gray-300 hover:text-white hover:bg-white/20 transition-all"
            >
              <Share className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-white/10 border border-white/20 rounded-lg text-gray-300 hover:text-white hover:bg-white/20 transition-all"
            >
              <Settings className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-medium">Project Progress</span>
          <span className="text-cyan-400 font-bold">65%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '65%' }}
            transition={{ duration: 1, delay: 0.5 }}
            className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full"
          />
        </div>
        <div className="flex items-center justify-between mt-2 text-sm text-gray-400">
          <span>Deadline: Feb 17, 2025</span>
          <span>2 days remaining</span>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center space-x-1 mb-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-1"
      >
        {tabs.map((tab) => {
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

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'code' && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
            {/* Code Editor Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <span className="text-gray-300 text-sm">NeuroBeats.jsx</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-3 py-1 bg-green-600 rounded-lg text-white text-sm"
                >
                  <Play className="w-4 h-4" />
                  <span>Run</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-3 py-1 bg-white/20 rounded-lg text-white text-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </motion.button>
              </div>
            </div>

            {/* Code Editor */}
            <div className="relative">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-96 p-4 bg-gray-900/50 text-gray-300 font-mono text-sm resize-none focus:outline-none"
                style={{ fontFamily: 'Monaco, Consolas, monospace' }}
              />
              
              {/* AI Assistant Sidebar */}
              <div className="absolute top-0 right-0 w-80 h-full bg-white/5 border-l border-white/10 p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Terminal className="w-5 h-5 text-purple-400" />
                  <h4 className="font-semibold text-white">AI Assistant</h4>
                </div>
                
                <div className="space-y-4 text-sm">
                  <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-3">
                    <div className="text-purple-300 font-medium mb-1">Suggestion</div>
                    <div className="text-gray-300">Consider adding error handling for audio context initialization on line 15.</div>
                  </div>
                  
                  <div className="bg-cyan-500/20 border border-cyan-500/30 rounded-lg p-3">
                    <div className="text-cyan-300 font-medium mb-1">Performance Tip</div>
                    <div className="text-gray-300">Use useCallback for the generateBrainwave function to prevent unnecessary re-renders.</div>
                  </div>
                  
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                    <div className="text-green-300 font-medium mb-1">API Recommendation</div>
                    <div className="text-gray-300">Try the Web Audio API's createOscillator() for more complex waveforms.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'kanban' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['todo', 'inProgress', 'done'].map((column) => (
              <div key={column} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white capitalize">
                    {column === 'inProgress' ? 'In Progress' : column}
                  </h3>
                  <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full">
                    {kanbanTasks[column as keyof typeof kanbanTasks].length}
                  </span>
                </div>
                
                <div className="space-y-3">
                  {kanbanTasks[column as keyof typeof kanbanTasks].map((task) => (
                    <motion.div
                      key={task.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-3 rounded-lg border-l-4 cursor-pointer ${getPriorityColor(task.priority)}`}
                    >
                      <div className="font-medium text-white text-sm mb-2">{task.title}</div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">{task.assignee}</span>
                        <span className={`px-2 py-1 rounded-full ${
                          task.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                          task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-green-500/20 text-green-300'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 p-2 border-2 border-dashed border-white/20 rounded-lg text-gray-400 hover:border-purple-500/50 hover:text-purple-300 transition-all"
                >
                  + Add Task
                </motion.button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-white/10">
              <h3 className="font-semibold text-white">Team Chat</h3>
              <p className="text-gray-400 text-sm">3 members online</p>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((message) => (
                <div key={message.id} className="flex items-start space-x-3">
                  <img
                    src={message.avatar}
                    alt={message.user}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-white text-sm">{message.user}</span>
                      <span className="text-gray-400 text-xs">{message.time}</span>
                    </div>
                    <div className={`p-3 rounded-lg max-w-md ${
                      message.user === 'AI Assistant' 
                        ? 'bg-purple-500/20 border border-purple-500/30' 
                        : 'bg-white/10'
                    }`}>
                      <p className="text-gray-300 text-sm">{message.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg text-white font-medium"
                >
                  Send
                </motion.button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'docs' && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Project Documentation</h3>
              <p className="text-gray-400 mb-6">Collaborative markdown editor for project docs</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl text-white font-semibold"
              >
                Create Document
              </motion.button>
            </div>
          </div>
        )}

        {activeTab === 'whiteboard' && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="text-center py-12">
              <Palette className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Collaborative Whiteboard</h3>
              <p className="text-gray-400 mb-6">Visual brainstorming and design collaboration</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl text-white font-semibold"
              >
                Open Whiteboard
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Workspace;