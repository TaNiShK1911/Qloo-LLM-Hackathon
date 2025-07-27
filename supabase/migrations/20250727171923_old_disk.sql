/*
  # Add missing tables for dynamic functionality

  1. New Tables
    - `user_onboarding` - Track user onboarding completion
    - `user_preferences` - Store user cultural preferences for Qloo integration
    - `hackathon_registrations` - Track hackathon registrations
    - `user_activities` - Track user activities for dashboard

  2. Security
    - Enable RLS on all new tables
    - Add appropriate policies for each table
*/

-- User onboarding tracking
CREATE TABLE IF NOT EXISTS user_onboarding (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  step text DEFAULT 'basic_info' NOT NULL,
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

CREATE INDEX idx_user_onboarding_user_id ON user_onboarding(user_id);

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

CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);

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

CREATE INDEX idx_hackathon_registrations_hackathon_id ON hackathon_registrations(hackathon_id);
CREATE INDEX idx_hackathon_registrations_user_id ON hackathon_registrations(user_id);

-- User activities for dashboard
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

CREATE INDEX idx_user_activities_user_id ON user_activities(user_id);
CREATE INDEX idx_user_activities_created_at ON user_activities(created_at DESC);

-- Function to complete user onboarding when preferences are inserted
CREATE OR REPLACE FUNCTION complete_user_onboarding()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_onboarding (user_id, step, completed)
  VALUES (NEW.user_id, 'completed', true)
  ON CONFLICT (user_id) DO UPDATE SET
    step = 'completed',
    completed = true,
    updated_at = now();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_preferences_insert
  AFTER INSERT ON user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION complete_user_onboarding();