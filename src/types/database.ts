export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          avatar_url: string | null;
          title: string | null;
          bio: string | null;
          location: string | null;
          timezone: string;
          skills: string[];
          interests: string[];
          working_style: string[];
          preferred_role: string | null;
          github_username: string | null;
          linkedin_url: string | null;
          website_url: string | null;
          hackathons_won: number;
          projects_completed: number;
          rating: number;
          availability_status: string;
          qloo_user_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          avatar_url?: string | null;
          title?: string | null;
          bio?: string | null;
          location?: string | null;
          timezone?: string;
          skills?: string[];
          interests?: string[];
          working_style?: string[];
          preferred_role?: string | null;
          github_username?: string | null;
          linkedin_url?: string | null;
          website_url?: string | null;
          hackathons_won?: number;
          projects_completed?: number;
          rating?: number;
          availability_status?: string;
          qloo_user_id?: string | null;
        };
        Update: {
          email?: string;
          full_name?: string;
          avatar_url?: string | null;
          title?: string | null;
          bio?: string | null;
          location?: string | null;
          timezone?: string;
          skills?: string[];
          interests?: string[];
          working_style?: string[];
          preferred_role?: string | null;
          github_username?: string | null;
          linkedin_url?: string | null;
          website_url?: string | null;
          hackathons_won?: number;
          projects_completed?: number;
          rating?: number;
          availability_status?: string;
          qloo_user_id?: string | null;
          updated_at?: string;
        };
      };
      hackathons: {
        Row: {
          id: string;
          name: string;
          description: string;
          start_date: string;
          end_date: string;
          location: string | null;
          format: string;
          max_participants: number | null;
          current_participants: number;
          prize_pool: string | null;
          tags: string[];
          organizer: string;
          image_url: string | null;
          registration_open: boolean;
          featured: boolean;
          qloo_taste_tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          description: string;
          start_date: string;
          end_date: string;
          location?: string | null;
          format?: string;
          max_participants?: number | null;
          current_participants?: number;
          prize_pool?: string | null;
          tags?: string[];
          organizer: string;
          image_url?: string | null;
          registration_open?: boolean;
          featured?: boolean;
          qloo_taste_tags?: string[];
        };
        Update: {
          name?: string;
          description?: string;
          start_date?: string;
          end_date?: string;
          location?: string | null;
          format?: string;
          max_participants?: number | null;
          current_participants?: number;
          prize_pool?: string | null;
          tags?: string[];
          organizer?: string;
          image_url?: string | null;
          registration_open?: boolean;
          featured?: boolean;
          qloo_taste_tags?: string[];
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          team_id: string | null;
          hackathon_id: string | null;
          creator_id: string;
          category: string | null;
          tags: string[];
          tech_stack: string[];
          difficulty: string;
          estimated_hours: number;
          status: string;
          github_url: string | null;
          demo_url: string | null;
          pitch_url: string | null;
          likes_count: number;
          views_count: number;
          featured: boolean;
          ai_suggestions: any;
          qloo_recommendations: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          description: string;
          team_id?: string | null;
          hackathon_id?: string | null;
          creator_id: string;
          category?: string | null;
          tags?: string[];
          tech_stack?: string[];
          difficulty?: string;
          estimated_hours?: number;
          status?: string;
          github_url?: string | null;
          demo_url?: string | null;
          pitch_url?: string | null;
          likes_count?: number;
          views_count?: number;
          featured?: boolean;
          ai_suggestions?: any;
          qloo_recommendations?: any;
        };
        Update: {
          title?: string;
          description?: string;
          team_id?: string | null;
          hackathon_id?: string | null;
          category?: string | null;
          tags?: string[];
          tech_stack?: string[];
          difficulty?: string;
          estimated_hours?: number;
          status?: string;
          github_url?: string | null;
          demo_url?: string | null;
          pitch_url?: string | null;
          likes_count?: number;
          views_count?: number;
          featured?: boolean;
          ai_suggestions?: any;
          qloo_recommendations?: any;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          content: string;
          sender_id: string;
          team_id: string | null;
          project_id: string | null;
          message_type: string;
          metadata: any;
          created_at: string;
        };
        Insert: {
          content: string;
          sender_id: string;
          team_id?: string | null;
          project_id?: string | null;
          message_type?: string;
          metadata?: any;
        };
        Update: {
          content?: string;
          message_type?: string;
          metadata?: any;
        };
      };
      compatibility_scores: {
        Row: {
          id: string;
          user1_id: string;
          user2_id: string;
          score: number;
          factors: any;
          ai_explanation: string | null;
          calculated_at: string;
        };
        Insert: {
          user1_id: string;
          user2_id: string;
          score: number;
          factors?: any;
          ai_explanation?: string | null;
        };
        Update: {
          score?: number;
          factors?: any;
          ai_explanation?: string | null;
        };
      };
      qloo_profiles: {
        Row: {
          id: string;
          user_id: string;
          qloo_user_id: string;
          taste_profile: any;
          cultural_interests: any;
          psychographic_traits: any;
          recommendation_preferences: any;
          last_synced: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          qloo_user_id: string;
          taste_profile?: any;
          cultural_interests?: any;
          psychographic_traits?: any;
          recommendation_preferences?: any;
        };
        Update: {
          qloo_user_id?: string;
          taste_profile?: any;
          cultural_interests?: any;
          psychographic_traits?: any;
          recommendation_preferences?: any;
          last_synced?: string;
        };
      };
    };
  };
}