import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Auth helpers
export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      }
    }
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// Database helpers
export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};

export const updateProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  return { data, error };
};

export const getHackathons = async () => {
  const { data, error } = await supabase
    .from('hackathons')
    .select('*')
    .order('start_date', { ascending: true });
  return { data, error };
};

export const getProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      creator:profiles!creator_id(full_name, avatar_url),
      hackathon:hackathons(name),
      likes_count,
      project_likes(user_id)
    `)
    .order('created_at', { ascending: false });
  return { data, error };
};

export const getTeammates = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .neq('id', (await getCurrentUser()).user?.id)
    .order('created_at', { ascending: false });
  return { data, error };
};

export const getCompatibilityScore = async (user1Id: string, user2Id: string) => {
  const { data, error } = await supabase
    .from('compatibility_scores')
    .select('*')
    .or(`and(user1_id.eq.${user1Id},user2_id.eq.${user2Id}),and(user1_id.eq.${user2Id},user2_id.eq.${user1Id})`)
    .single();
  return { data, error };
};

export const createProject = async (project: any) => {
  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()
    .single();
  return { data, error };
};

export const likeProject = async (projectId: string, userId: string) => {
  const { data, error } = await supabase
    .from('project_likes')
    .insert({ project_id: projectId, user_id: userId });
  return { data, error };
};

export const unlikeProject = async (projectId: string, userId: string) => {
  const { data, error } = await supabase
    .from('project_likes')
    .delete()
    .eq('project_id', projectId)
    .eq('user_id', userId);
  return { data, error };
};

// Real-time subscriptions
export const subscribeToMessages = (teamId: string, callback: (payload: any) => void) => {
  return supabase
    .channel(`team-${teamId}`)
    .on('postgres_changes', 
      { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: `team_id=eq.${teamId}`
      }, 
      callback
    )
    .subscribe();
};

export const sendMessage = async (message: any) => {
  const { data, error } = await supabase
    .from('messages')
    .insert(message)
    .select(`
      *,
      sender:profiles!sender_id(full_name, avatar_url)
    `)
    .single();
  return { data, error };
};