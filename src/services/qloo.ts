// Qloo API Integration Service
// This service handles cultural taste mapping and recommendations

interface QlooProfile {
  userId: string;
  tasteProfile: {
    music: string[];
    movies: string[];
    books: string[];
    interests: string[];
  };
  psychographicTraits: {
    creativity: number;
    innovation: number;
    collaboration: number;
    techSavviness: number;
  };
  culturalClusters: string[];
}

interface QlooRecommendation {
  type: 'hackathon' | 'teammate' | 'project';
  items: any[];
  confidence: number;
  reasoning: string;
}

class QlooService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_QLOO_API_KEY || 'demo-key';
    this.baseUrl = 'https://api.qloo.com/v1';
  }

  // Create or update user taste profile
  async createTasteProfile(userId: string, preferences: {
    music?: string[];
    movies?: string[];
    books?: string[];
    interests?: string[];
  }): Promise<QlooProfile> {
    try {
      // In a real implementation, this would call the Qloo API
      // For demo purposes, we'll simulate the response
      const mockProfile: QlooProfile = {
        userId,
        tasteProfile: {
          music: preferences.music || ['Electronic', 'Synthwave', 'Techno'],
          movies: preferences.movies || ['Sci-Fi', 'Cyberpunk', 'Thriller'],
          books: preferences.books || ['Technology', 'Future', 'AI'],
          interests: preferences.interests || ['Innovation', 'Startups', 'AI']
        },
        psychographicTraits: {
          creativity: Math.random() * 100,
          innovation: Math.random() * 100,
          collaboration: Math.random() * 100,
          techSavviness: Math.random() * 100
        },
        culturalClusters: ['tech_innovators', 'creative_technologists', 'future_builders']
      };

      return mockProfile;
    } catch (error) {
      console.error('Error creating taste profile:', error);
      throw error;
    }
  }

  // Get hackathon recommendations based on user taste
  async getHackathonRecommendations(userId: string, userProfile: QlooProfile): Promise<QlooRecommendation> {
    try {
      // Simulate API call with mock data
      const recommendations = {
        type: 'hackathon' as const,
        items: [
          {
            id: '1',
            name: 'AI & Music Fusion Hack',
            matchScore: 95,
            reasoning: 'Perfect match for your love of electronic music and AI innovation',
            culturalAlignment: ['electronic_music', 'artificial_intelligence', 'creative_technology']
          },
          {
            id: '2',
            name: 'Cyberpunk Future Jam',
            matchScore: 88,
            reasoning: 'Aligns with your cyberpunk movie preferences and tech innovation interests',
            culturalAlignment: ['cyberpunk', 'virtual_reality', 'gaming']
          }
        ],
        confidence: 0.92,
        reasoning: 'Based on your taste for electronic music, sci-fi content, and innovation focus'
      };

      return recommendations;
    } catch (error) {
      console.error('Error getting hackathon recommendations:', error);
      throw error;
    }
  }

  // Get teammate compatibility based on cultural fit
  async getTeammateCompatibility(user1Profile: QlooProfile, user2Profile: QlooProfile): Promise<{
    score: number;
    culturalOverlap: string[];
    explanation: string;
    workingStyleMatch: number;
  }> {
    try {
      // Calculate cultural overlap
      const culturalOverlap = user1Profile.culturalClusters.filter(cluster =>
        user2Profile.culturalClusters.includes(cluster)
      );

      // Calculate taste similarity
      const musicOverlap = user1Profile.tasteProfile.music.filter(genre =>
        user2Profile.tasteProfile.music.includes(genre)
      );

      const interestOverlap = user1Profile.tasteProfile.interests.filter(interest =>
        user2Profile.tasteProfile.interests.includes(interest)
      );

      // Calculate compatibility score
      const culturalScore = (culturalOverlap.length / Math.max(user1Profile.culturalClusters.length, user2Profile.culturalClusters.length)) * 100;
      const tasteScore = ((musicOverlap.length + interestOverlap.length) / 10) * 100;
      const psychographicScore = this.calculatePsychographicCompatibility(user1Profile.psychographicTraits, user2Profile.psychographicTraits);

      const overallScore = (culturalScore * 0.4 + tasteScore * 0.3 + psychographicScore * 0.3);

      return {
        score: Math.round(overallScore),
        culturalOverlap,
        explanation: this.generateCompatibilityExplanation(musicOverlap, interestOverlap, culturalOverlap),
        workingStyleMatch: psychographicScore
      };
    } catch (error) {
      console.error('Error calculating teammate compatibility:', error);
      throw error;
    }
  }

  // Get project recommendations based on team's collective taste
  async getProjectRecommendations(teamProfiles: QlooProfile[]): Promise<QlooRecommendation> {
    try {
      // Aggregate team preferences
      const aggregatedInterests = teamProfiles.flatMap(profile => profile.tasteProfile.interests);
      const aggregatedMusic = teamProfiles.flatMap(profile => profile.tasteProfile.music);
      
      // Generate project suggestions based on collective taste
      const recommendations = {
        type: 'project' as const,
        items: [
          {
            title: 'NeuroBeats - AI Music from Brain Signals',
            matchScore: 95,
            reasoning: 'Perfect blend of AI and music interests across your team',
            suggestedTechStack: ['Python', 'TensorFlow', 'Web Audio API', 'React'],
            culturalAlignment: aggregatedMusic.includes('Electronic') ? ['electronic_music', 'ai_innovation'] : ['music_technology']
          }
        ],
        confidence: 0.89,
        reasoning: 'Based on your team\'s shared interest in AI and music technology'
      };

      return recommendations;
    } catch (error) {
      console.error('Error getting project recommendations:', error);
      throw error;
    }
  }

  // Get UI/UX aesthetic recommendations
  async getAestheticRecommendations(userProfile: QlooProfile): Promise<{
    colorPalette: string[];
    designStyle: string;
    typography: string;
    reasoning: string;
  }> {
    try {
      // Map cultural preferences to design aesthetics
      const hasElectronicTaste = userProfile.tasteProfile.music.includes('Electronic') || 
                                userProfile.tasteProfile.music.includes('Synthwave');
      
      const hasCyberpunkTaste = userProfile.tasteProfile.movies.includes('Cyberpunk') ||
                               userProfile.tasteProfile.movies.includes('Sci-Fi');

      if (hasElectronicTaste && hasCyberpunkTaste) {
        return {
          colorPalette: ['#8B5CF6', '#06B6D4', '#EC4899', '#10B981'],
          designStyle: 'Cyberpunk Neon',
          typography: 'Futuristic Sans-serif',
          reasoning: 'Your love for electronic music and cyberpunk aesthetics suggests a neon-futuristic design approach'
        };
      }

      return {
        colorPalette: ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B'],
        designStyle: 'Modern Gradient',
        typography: 'Clean Sans-serif',
        reasoning: 'Based on your tech-forward interests and creative preferences'
      };
    } catch (error) {
      console.error('Error getting aesthetic recommendations:', error);
      throw error;
    }
  }

  private calculatePsychographicCompatibility(traits1: QlooProfile['psychographicTraits'], traits2: QlooProfile['psychographicTraits']): number {
    const keys = Object.keys(traits1) as (keyof typeof traits1)[];
    const similarities = keys.map(key => {
      const diff = Math.abs(traits1[key] - traits2[key]);
      return 100 - diff; // Convert difference to similarity
    });
    
    return similarities.reduce((sum, sim) => sum + sim, 0) / similarities.length;
  }

  private generateCompatibilityExplanation(musicOverlap: string[], interestOverlap: string[], culturalOverlap: string[]): string {
    const explanations = [];
    
    if (musicOverlap.length > 0) {
      explanations.push(`You both love ${musicOverlap.join(' and ')} music`);
    }
    
    if (interestOverlap.length > 0) {
      explanations.push(`share interests in ${interestOverlap.join(' and ')}`);
    }
    
    if (culturalOverlap.length > 0) {
      explanations.push(`belong to similar cultural clusters`);
    }

    return explanations.length > 0 
      ? explanations.join(', ') + '.'
      : 'You have complementary cultural backgrounds that could create interesting collaborations.';
  }
}

export const qlooService = new QlooService();
export type { QlooProfile, QlooRecommendation };