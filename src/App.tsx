import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Hero from './pages/Hero';
import Dashboard from './pages/Dashboard';
import Discovery from './pages/Discovery';
import TeammateFinder from './pages/TeammateFinder';
import IdeaIncubator from './pages/IdeaIncubator';
import Workspace from './pages/Workspace';
import Showcase from './pages/Showcase';
import Profile from './pages/Profile';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          {/* Animated background */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
              animate={{
                x: [0, -100, 0],
                y: [0, 50, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <Routes>
            {/* Public routes */}
            <Route path="/" element={<><Navbar /><Hero /></>} />
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Navbar />
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/discovery" element={
              <ProtectedRoute>
                <Navbar />
                <Discovery />
              </ProtectedRoute>
            } />
            <Route path="/teammates" element={
              <ProtectedRoute>
                <Navbar />
                <TeammateFinder />
              </ProtectedRoute>
            } />
            <Route path="/incubator" element={
              <ProtectedRoute>
                <Navbar />
                <IdeaIncubator />
              </ProtectedRoute>
            } />
            <Route path="/workspace" element={
              <ProtectedRoute>
                <Navbar />
                <Workspace />
              </ProtectedRoute>
            } />
            <Route path="/showcase" element={
              <ProtectedRoute>
                <Navbar />
                <Showcase />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Navbar />
                <Profile />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;