/*
  # Add onboarding and dynamic data tables

  1. New Tables
    - `user_onboarding` - Track onboarding completion status
    - `user_preferences` - Store detailed user preferences for Qloo integration
    - `hackathon_registrations` - Track user hackathon registrations
    - `user_activities` - Track user activities for dynamic feeds

  2. Security
    - Enable RLS on all new tables
    - Add policies for authenticated users to manage their own data

  3. Functions
    - Add function to handle user onboarding completion
    - Add function to generate compatibility scores
*/

-- User onboarding tracking
CREATE TABLE IF NOT EXISTS user_onboarding (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  step text NOT NULL DEFAULT 'basic_info',
  completed boolean DEFAULT false,
  data jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_onboarding ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own onboarding"
  ON user_onboarding
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- User preferences for Qloo integration
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  music_genres text[] DEFAULT '{}',
  movie_genres text[] DEFAULT '{}',
  book_genres text[] DEFAULT '{}',
  hobbies text[] DEFAULT '{}',
  work_environment text[] DEFAULT '{}',
  personality_traits text[] DEFAULT '{}',
  preferred_hackathon_types text[] DEFAULT '{}',
  preferred_team_size integer DEFAULT 4,
  availability_hours text DEFAULT 'flexible',
  communication_style text DEFAULT 'collaborative',
  qloo_profile_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own preferences"
  ON user_preferences
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Hackathon registrations
CREATE TABLE IF NOT EXISTS hackathon_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hackathon_id uuid REFERENCES hackathons(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  status text DEFAULT 'registered',
  team_id uuid REFERENCES teams(id) ON DELETE SET NULL,
  registered_at timestamptz DEFAULT now(),
  UNIQUE(hackathon_id, user_id)
);

ALTER TABLE hackathon_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own registrations"
  ON hackathon_registrations
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Registrations are viewable by everyone"
  ON hackathon_registrations
  FOR SELECT
  TO authenticated
  USING (true);

-- User activities for dynamic feeds
CREATE TABLE IF NOT EXISTS user_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  activity_type text NOT NULL,
  activity_data jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create their own activities"
  ON user_activities
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Activities are viewable by everyone"
  ON user_activities
  FOR SELECT
  TO authenticated
  USING (true);

-- Function to handle user onboarding completion
CREATE OR REPLACE FUNCTION complete_user_onboarding()
RETURNS TRIGGER AS $$
BEGIN
  -- Update user onboarding status
  UPDATE user_onboarding 
  SET completed = true, updated_at = now()
  WHERE user_id = NEW.user_id;
  
  -- Create activity record
  INSERT INTO user_activities (user_id, activity_type, activity_data)
  VALUES (NEW.user_id, 'onboarding_completed', '{"step": "preferences_set"}');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for onboarding completion
CREATE TRIGGER on_preferences_insert
  AFTER INSERT ON user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION complete_user_onboarding();

-- Add some sample hackathons with more realistic data
INSERT INTO hackathons (name, description, start_date, end_date, location, format, max_participants, prize_pool, tags, organizer, image_url, qloo_taste_tags) VALUES
('AI & Music Fusion Hack 2025', 'Create the next generation of AI-powered music experiences. From composition to live performance, explore the intersection of artificial intelligence and sonic creativity.', '2025-02-15 09:00:00+00', '2025-02-17 18:00:00+00', 'San Francisco, CA', 'in-person', 2500, '$50,000', ARRAY['AI', 'Music', 'Creative Tech', 'Machine Learning'], 'TechBeats Inc.', 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg', ARRAY['electronic_music', 'artificial_intelligence', 'creative_technology']),

('Cyberpunk Future Jam', 'Build immersive digital experiences inspired by cyberpunk aesthetics. VR, AR, and interactive installations welcome.', '2025-02-22 10:00:00+00', '2025-02-24 20:00:00+00', 'Virtual', 'remote', 1800, '$25,000', ARRAY['Cyberpunk', 'VR', 'Gaming', 'Digital Art'], 'NeonLabs', 'https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg', ARRAY['cyberpunk', 'virtual_reality', 'gaming']),

('GreenTech Innovation Summit', 'Develop sustainable solutions for climate change using cutting-edge technology. Focus on IoT, renewable energy, and environmental monitoring.', '2025-03-01 08:00:00+00', '2025-03-03 19:00:00+00', 'Austin, TX', 'hybrid', 3200, '$75,000', ARRAY['Sustainability', 'IoT', 'Climate', 'GreenTech'], 'ClimateCode', 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg', ARRAY['sustainability', 'environmental_tech', 'innovation']),

('Blockchain & DeFi Revolution', 'Shape the future of decentralized finance. Build protocols, dApps, and tools for the next generation of web3.', '2025-03-08 09:00:00+00', '2025-03-10 21:00:00+00', 'Miami, FL', 'in-person', 2100, '$100,000', ARRAY['Blockchain', 'DeFi', 'Web3', 'Cryptocurrency'], 'CryptoBuilders', 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg', ARRAY['blockchain', 'cryptocurrency', 'fintech']),

('HealthTech Innovation Challenge', 'Revolutionize healthcare with technology. From medical devices to health apps, create solutions that save lives.', '2025-03-15 07:00:00+00', '2025-03-17 18:00:00+00', 'Boston, MA', 'in-person', 2800, '$60,000', ARRAY['HealthTech', 'Medical', 'AI', 'Wearables'], 'MedTech Labs', 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg', ARRAY['healthcare', 'medical_technology', 'wellness']);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_onboarding_user_id ON user_onboarding(user_id);
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_hackathon_registrations_user_id ON hackathon_registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_hackathon_registrations_hackathon_id ON hackathon_registrations(hackathon_id);
CREATE INDEX IF NOT EXISTS idx_user_activities_user_id ON user_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activities_created_at ON user_activities(created_at DESC);