/*
  # Initial Schema for TeamForge Platform

  1. New Tables
    - `profiles` - User profiles with skills, interests, and preferences
    - `hackathons` - Hackathon events and details
    - `teams` - Team formations and memberships
    - `projects` - Project ideas and implementations
    - `messages` - Real-time chat messages
    - `project_collaborators` - Project team members
    - `hackathon_participants` - User hackathon registrations
    - `compatibility_scores` - AI-generated teammate compatibility
    - `qloo_profiles` - Qloo API cultural taste data
    - `ai_suggestions` - GPT-4 generated suggestions and mentorship

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Secure data access based on user relationships

  3. Real-time Features
    - Enable real-time subscriptions for messages
    - Project collaboration updates
    - Team formation notifications
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  avatar_url text,
  title text,
  bio text,
  location text,
  timezone text DEFAULT 'UTC',
  skills text[] DEFAULT '{}',
  interests text[] DEFAULT '{}',
  working_style text[] DEFAULT '{}',
  preferred_role text,
  github_username text,
  linkedin_url text,
  website_url text,
  hackathons_won integer DEFAULT 0,
  projects_completed integer DEFAULT 0,
  rating numeric(3,2) DEFAULT 0.0,
  availability_status text DEFAULT 'available',
  qloo_user_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Hackathons table
CREATE TABLE IF NOT EXISTS hackathons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  location text,
  format text DEFAULT 'hybrid', -- 'in-person', 'virtual', 'hybrid'
  max_participants integer,
  current_participants integer DEFAULT 0,
  prize_pool text,
  tags text[] DEFAULT '{}',
  organizer text NOT NULL,
  image_url text,
  registration_open boolean DEFAULT true,
  featured boolean DEFAULT false,
  qloo_taste_tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  hackathon_id uuid REFERENCES hackathons(id) ON DELETE CASCADE,
  leader_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  max_members integer DEFAULT 4,
  current_members integer DEFAULT 1,
  looking_for text[] DEFAULT '{}',
  tech_stack text[] DEFAULT '{}',
  status text DEFAULT 'forming', -- 'forming', 'active', 'completed'
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Team members junction table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES teams(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  role text DEFAULT 'member',
  joined_at timestamptz DEFAULT now(),
  UNIQUE(team_id, user_id)
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  team_id uuid REFERENCES teams(id) ON DELETE SET NULL,
  hackathon_id uuid REFERENCES hackathons(id) ON DELETE SET NULL,
  creator_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  category text,
  tags text[] DEFAULT '{}',
  tech_stack text[] DEFAULT '{}',
  difficulty text DEFAULT 'intermediate',
  estimated_hours integer DEFAULT 48,
  status text DEFAULT 'idea', -- 'idea', 'in-progress', 'completed', 'submitted'
  github_url text,
  demo_url text,
  pitch_url text,
  likes_count integer DEFAULT 0,
  views_count integer DEFAULT 0,
  featured boolean DEFAULT false,
  ai_suggestions jsonb DEFAULT '{}',
  qloo_recommendations jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Project collaborators
CREATE TABLE IF NOT EXISTS project_collaborators (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  role text DEFAULT 'contributor',
  permissions text[] DEFAULT '{"read"}',
  joined_at timestamptz DEFAULT now(),
  UNIQUE(project_id, user_id)
);

-- Messages table for real-time chat
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  sender_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  team_id uuid REFERENCES teams(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  message_type text DEFAULT 'text', -- 'text', 'file', 'code', 'ai_suggestion'
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Hackathon participants
CREATE TABLE IF NOT EXISTS hackathon_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hackathon_id uuid REFERENCES hackathons(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  registration_date timestamptz DEFAULT now(),
  status text DEFAULT 'registered', -- 'registered', 'checked_in', 'completed'
  UNIQUE(hackathon_id, user_id)
);

-- Compatibility scores (AI-generated)
CREATE TABLE IF NOT EXISTS compatibility_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user1_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  user2_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  score numeric(5,2) NOT NULL,
  factors jsonb DEFAULT '{}', -- Skills, interests, working style matches
  ai_explanation text,
  calculated_at timestamptz DEFAULT now(),
  UNIQUE(user1_id, user2_id)
);

-- Qloo profiles for cultural taste data
CREATE TABLE IF NOT EXISTS qloo_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  qloo_user_id text UNIQUE,
  taste_profile jsonb DEFAULT '{}',
  cultural_interests jsonb DEFAULT '{}',
  psychographic_traits jsonb DEFAULT '{}',
  recommendation_preferences jsonb DEFAULT '{}',
  last_synced timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- AI suggestions and mentorship
CREATE TABLE IF NOT EXISTS ai_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  suggestion_type text NOT NULL, -- 'tech_stack', 'api', 'scope', 'mentor', 'code_review'
  content text NOT NULL,
  metadata jsonb DEFAULT '{}',
  status text DEFAULT 'active', -- 'active', 'accepted', 'dismissed'
  created_at timestamptz DEFAULT now()
);

-- Project likes
CREATE TABLE IF NOT EXISTS project_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(project_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hackathons ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_collaborators ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE hackathon_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE compatibility_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE qloo_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_likes ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles: Users can read all profiles, but only update their own
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Hackathons: Public read access
CREATE POLICY "Hackathons are viewable by everyone" ON hackathons
  FOR SELECT USING (true);

-- Teams: Public read, authenticated users can create
CREATE POLICY "Teams are viewable by everyone" ON teams
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create teams" ON teams
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Team leaders can update their teams" ON teams
  FOR UPDATE USING (auth.uid() = leader_id);

-- Team members: Viewable by everyone, manageable by team leaders and members
CREATE POLICY "Team members are viewable by everyone" ON team_members
  FOR SELECT USING (true);

CREATE POLICY "Users can join teams" ON team_members
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Team members can leave teams" ON team_members
  FOR DELETE USING (auth.uid() = user_id);

-- Projects: Public read, authenticated users can create
CREATE POLICY "Projects are viewable by everyone" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create projects" ON projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Project creators can update their projects" ON projects
  FOR UPDATE USING (auth.uid() = creator_id);

-- Project collaborators: Viewable by everyone, manageable by project creators
CREATE POLICY "Project collaborators are viewable by everyone" ON project_collaborators
  FOR SELECT USING (true);

CREATE POLICY "Project creators can manage collaborators" ON project_collaborators
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_collaborators.project_id 
      AND projects.creator_id = auth.uid()
    )
  );

-- Messages: Only team/project members can read and create
CREATE POLICY "Team members can read team messages" ON messages
  FOR SELECT USING (
    team_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM team_members 
      WHERE team_members.team_id = messages.team_id 
      AND team_members.user_id = auth.uid()
    )
    OR
    project_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM project_collaborators 
      WHERE project_collaborators.project_id = messages.project_id 
      AND project_collaborators.user_id = auth.uid()
    )
  );

CREATE POLICY "Team members can send messages" ON messages
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND (
      team_id IS NOT NULL AND EXISTS (
        SELECT 1 FROM team_members 
        WHERE team_members.team_id = messages.team_id 
        AND team_members.user_id = auth.uid()
      )
      OR
      project_id IS NOT NULL AND EXISTS (
        SELECT 1 FROM project_collaborators 
        WHERE project_collaborators.project_id = messages.project_id 
        AND project_collaborators.user_id = auth.uid()
      )
    )
  );

-- Hackathon participants: Users can read all, manage their own
CREATE POLICY "Hackathon participants are viewable by everyone" ON hackathon_participants
  FOR SELECT USING (true);

CREATE POLICY "Users can register for hackathons" ON hackathon_participants
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Compatibility scores: Users can read scores involving them
CREATE POLICY "Users can read their compatibility scores" ON compatibility_scores
  FOR SELECT USING (auth.uid() = user1_id OR auth.uid() = user2_id);

-- Qloo profiles: Users can only access their own
CREATE POLICY "Users can read their own qloo profile" ON qloo_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own qloo profile" ON qloo_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own qloo profile" ON qloo_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- AI suggestions: Users can read suggestions for their projects
CREATE POLICY "Users can read AI suggestions for their projects" ON ai_suggestions
  FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = ai_suggestions.project_id 
      AND projects.creator_id = auth.uid()
    )
  );

-- Project likes: Users can read all, manage their own
CREATE POLICY "Project likes are viewable by everyone" ON project_likes
  FOR SELECT USING (true);

CREATE POLICY "Users can like projects" ON project_likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike projects" ON project_likes
  FOR DELETE USING (auth.uid() = user_id);

-- Functions and Triggers

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hackathons_updated_at BEFORE UPDATE ON hackathons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON teams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment project likes
CREATE OR REPLACE FUNCTION increment_project_likes()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE projects SET likes_count = likes_count + 1 WHERE id = NEW.project_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE projects SET likes_count = likes_count - 1 WHERE id = OLD.project_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for project likes
CREATE TRIGGER on_project_like_change
  AFTER INSERT OR DELETE ON project_likes
  FOR EACH ROW EXECUTE FUNCTION increment_project_likes();

-- Insert sample data
INSERT INTO hackathons (name, description, start_date, end_date, location, format, max_participants, prize_pool, tags, organizer, image_url, featured, qloo_taste_tags) VALUES
('AI & Music Fusion Hack', 'Create the next generation of AI-powered music experiences. From composition to live performance, explore the intersection of artificial intelligence and sonic creativity.', '2025-02-15 09:00:00+00', '2025-02-17 18:00:00+00', 'San Francisco, CA', 'in-person', 2500, '$50,000', '{"AI", "Music", "Creative Tech", "Machine Learning"}', 'TechBeats Inc.', 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=600', true, '{"electronic_music", "artificial_intelligence", "creative_technology"}'),
('Cyberpunk Future Jam', 'Build immersive digital experiences inspired by cyberpunk aesthetics. VR, AR, and interactive installations welcome.', '2025-02-22 09:00:00+00', '2025-02-24 18:00:00+00', 'Virtual', 'virtual', 1800, '$25,000', '{"Cyberpunk", "VR", "Gaming", "Digital Art"}', 'NeonLabs', 'https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg?auto=compress&cs=tinysrgb&w=600', false, '{"cyberpunk", "virtual_reality", "gaming", "digital_art"}'),
('GreenTech Innovation Summit', 'Develop sustainable solutions for climate change using cutting-edge technology. Focus on IoT, renewable energy, and environmental monitoring.', '2025-03-01 09:00:00+00', '2025-03-03 18:00:00+00', 'Austin, TX', 'hybrid', 3200, '$75,000', '{"Sustainability", "IoT", "Climate", "GreenTech"}', 'ClimateCode', 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=600', true, '{"sustainability", "environmental_technology", "clean_energy"}'),
('Blockchain & DeFi Revolution', 'Shape the future of decentralized finance. Build protocols, dApps, and tools for the next generation of web3.', '2025-03-08 09:00:00+00', '2025-03-10 18:00:00+00', 'Miami, FL', 'in-person', 2100, '$100,000', '{"Blockchain", "DeFi", "Web3", "Cryptocurrency"}', 'CryptoBuilders', 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=600', false, '{"blockchain", "cryptocurrency", "decentralized_finance"}'),
('HealthTech Innovation', 'Revolutionize healthcare with technology. From medical devices to health apps, create solutions that save lives.', '2025-03-15 09:00:00+00', '2025-03-17 18:00:00+00', 'Boston, MA', 'in-person', 2800, '$60,000', '{"HealthTech", "Medical", "AI", "Wearables"}', 'MedTech Labs', 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=600', false, '{"healthcare", "medical_technology", "wellness"}');