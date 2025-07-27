// AI Service for GPT-4 integration and AI mentorship

interface AIProjectSuggestion {
  techStack: string[];
  apis: string[];
  scope: string;
  implementation: string;
  estimatedHours: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface AIMentorResponse {
  suggestion: string;
  reasoning: string;
  nextSteps: string[];
  resources: {
    title: string;
    url: string;
    type: 'tutorial' | 'documentation' | 'example';
  }[];
}

interface AICodeReview {
  suggestions: {
    line: number;
    type: 'improvement' | 'bug' | 'optimization';
    message: string;
    example?: string;
  }[];
  overallScore: number;
  summary: string;
}

class AIService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || 'demo-key';
    this.baseUrl = 'https://api.openai.com/v1';
  }

  // Generate project suggestions based on idea and team preferences
  async generateProjectSuggestions(
    projectIdea: string,
    teamSkills: string[],
    culturalPreferences: any
  ): Promise<AIProjectSuggestion> {
    try {
      // In a real implementation, this would call the OpenAI API
      // For demo purposes, we'll return mock suggestions based on the input
      
      const mockSuggestions: AIProjectSuggestion = {
        techStack: this.suggestTechStack(projectIdea, teamSkills),
        apis: this.suggestAPIs(projectIdea),
        scope: this.generateScope(projectIdea),
        implementation: this.generateImplementationPlan(projectIdea),
        estimatedHours: this.estimateHours(projectIdea),
        difficulty: this.assessDifficulty(projectIdea, teamSkills)
      };

      return mockSuggestions;
    } catch (error) {
      console.error('Error generating project suggestions:', error);
      throw error;
    }
  }

  // AI Mentor for project guidance
  async getMentorAdvice(
    projectDescription: string,
    currentProgress: string,
    challenges: string[]
  ): Promise<AIMentorResponse> {
    try {
      // Mock AI mentor response
      const mentorResponse: AIMentorResponse = {
        suggestion: "Based on your progress, I recommend focusing on the core MVP features first. Your brain-wave to music conversion is ambitious - start with mouse movement simulation to test the audio generation pipeline.",
        reasoning: "Building the full EEG integration upfront adds complexity. By simulating brain signals with mouse movement, you can validate your audio synthesis approach and user interface before tackling hardware integration.",
        nextSteps: [
          "Implement mouse movement tracking as brain signal simulation",
          "Build the audio synthesis engine using Tone.js",
          "Create a simple visualization for the 'brain waves'",
          "Test the complete pipeline with simulated data",
          "Plan EEG integration for post-hackathon development"
        ],
        resources: [
          {
            title: "Tone.js Documentation",
            url: "https://tonejs.github.io/",
            type: "documentation"
          },
          {
            title: "Web Audio API Tutorial",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API",
            type: "tutorial"
          },
          {
            title: "Mouse Movement Audio Example",
            url: "https://codepen.io/example/mouse-audio",
            type: "example"
          }
        ]
      };

      return mentorResponse;
    } catch (error) {
      console.error('Error getting mentor advice:', error);
      throw error;
    }
  }

  // Generate compatibility explanation for teammates
  async generateCompatibilityExplanation(
    user1: any,
    user2: any,
    compatibilityFactors: any
  ): Promise<string> {
    try {
      // Mock compatibility explanation
      const explanations = [
        `You and ${user2.full_name} both love ${compatibilityFactors.sharedInterests?.join(' and ')}`,
        `Your working styles complement each other - you're both ${compatibilityFactors.workingStyle}`,
        `You share ${compatibilityFactors.skillOverlap} technical skills`,
        `Your cultural tastes align on ${compatibilityFactors.culturalOverlap?.join(', ')}`
      ];

      return explanations.filter(Boolean).join('. ') + '.';
    } catch (error) {
      console.error('Error generating compatibility explanation:', error);
      throw error;
    }
  }

  // Code review and suggestions
  async reviewCode(code: string, language: string): Promise<AICodeReview> {
    try {
      // Mock code review
      const review: AICodeReview = {
        suggestions: [
          {
            line: 15,
            type: 'improvement',
            message: 'Consider adding error handling for audio context initialization',
            example: 'try { const audioContext = new AudioContext(); } catch (error) { console.error("Audio not supported"); }'
          },
          {
            line: 23,
            type: 'optimization',
            message: 'Use useCallback to prevent unnecessary re-renders',
            example: 'const generateBrainwave = useCallback(() => { ... }, []);'
          }
        ],
        overallScore: 85,
        summary: 'Good structure and implementation. Consider adding error handling and performance optimizations.'
      };

      return review;
    } catch (error) {
      console.error('Error reviewing code:', error);
      throw error;
    }
  }

  // Generate boilerplate code
  async generateBoilerplate(
    framework: string,
    projectType: string,
    features: string[]
  ): Promise<string> {
    try {
      // Mock boilerplate generation
      if (framework === 'React' && projectType === 'music-app') {
        return `
import React, { useState, useEffect } from 'react';
import { Tone } from 'tone';

const MusicApp = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [frequency, setFrequency] = useState(440);

  useEffect(() => {
    // Initialize audio context
    const synth = new Tone.Synth().toDestination();
    
    return () => {
      synth.dispose();
    };
  }, []);

  const playTone = () => {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(frequency, '8n');
  };

  return (
    <div className="music-app">
      <h1>Music Generator</h1>
      <button onClick={playTone}>Play Tone</button>
      <input 
        type="range" 
        min="200" 
        max="800" 
        value={frequency}
        onChange={(e) => setFrequency(Number(e.target.value))}
      />
    </div>
  );
};

export default MusicApp;
        `;
      }

      return '// Boilerplate code will be generated based on your specifications';
    } catch (error) {
      console.error('Error generating boilerplate:', error);
      throw error;
    }
  }

  private suggestTechStack(idea: string, teamSkills: string[]): string[] {
    const ideaLower = idea.toLowerCase();
    let suggestions = ['React', 'Node.js', 'TypeScript'];

    if (ideaLower.includes('ai') || ideaLower.includes('machine learning')) {
      suggestions.push('Python', 'TensorFlow', 'OpenAI API');
    }

    if (ideaLower.includes('music') || ideaLower.includes('audio')) {
      suggestions.push('Web Audio API', 'Tone.js');
    }

    if (ideaLower.includes('blockchain') || ideaLower.includes('web3')) {
      suggestions.push('Solidity', 'Web3.js', 'Hardhat');
    }

    if (ideaLower.includes('vr') || ideaLower.includes('ar')) {
      suggestions.push('Unity', 'C#', 'Three.js');
    }

    // Filter based on team skills
    return suggestions.filter(tech => 
      teamSkills.length === 0 || teamSkills.some(skill => 
        skill.toLowerCase().includes(tech.toLowerCase()) || 
        tech.toLowerCase().includes(skill.toLowerCase())
      )
    );
  }

  private suggestAPIs(idea: string): string[] {
    const ideaLower = idea.toLowerCase();
    const apis = [];

    if (ideaLower.includes('ai')) apis.push('OpenAI API', 'Hugging Face API');
    if (ideaLower.includes('music')) apis.push('Spotify API', 'Web Audio API');
    if (ideaLower.includes('blockchain')) apis.push('Ethereum API', 'Polygon API');
    if (ideaLower.includes('map')) apis.push('Google Maps API', 'Mapbox API');
    if (ideaLower.includes('payment')) apis.push('Stripe API', 'PayPal API');

    return apis.length > 0 ? apis : ['REST API', 'GraphQL'];
  }

  private generateScope(idea: string): string {
    return `MVP: Focus on core functionality with a simple, working prototype. Implement the main feature that demonstrates your concept, then add polish and additional features if time permits.`;
  }

  private generateImplementationPlan(idea: string): string {
    return `Start with a basic UI mockup, implement core logic with mock data, integrate real APIs/services, add styling and animations, then test and refine the user experience.`;
  }

  private estimateHours(idea: string): number {
    const complexity = idea.toLowerCase();
    if (complexity.includes('ai') || complexity.includes('blockchain')) return 48;
    if (complexity.includes('vr') || complexity.includes('complex')) return 36;
    return 24;
  }

  private assessDifficulty(idea: string, teamSkills: string[]): 'beginner' | 'intermediate' | 'advanced' {
    const ideaLower = idea.toLowerCase();
    const hasAdvancedConcepts = ideaLower.includes('ai') || ideaLower.includes('blockchain') || ideaLower.includes('vr');
    const teamHasRelevantSkills = teamSkills.length > 3;

    if (hasAdvancedConcepts && !teamHasRelevantSkills) return 'advanced';
    if (hasAdvancedConcepts || !teamHasRelevantSkills) return 'intermediate';
    return 'beginner';
  }
}

export const aiService = new AIService();
export type { AIProjectSuggestion, AIMentorResponse, AICodeReview };