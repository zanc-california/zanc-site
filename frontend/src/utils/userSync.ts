import supabase from '../supabaseClient';

export const ensureUserInDatabase = async (userId: string, email: string, name?: string) => {
  try {
    // Get current session to get the access token
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.access_token) {
      throw new Error('No access token available');
    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        id: userId,
        email,
        name
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to sync user: ${response.statusText}`);
    }

    const user = await response.json();
    console.log('User synced successfully:', user);
    return user;
  } catch (error) {
    console.error('Error syncing user:', error);
    throw error;
  }
};
