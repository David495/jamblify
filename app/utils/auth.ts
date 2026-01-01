// app/utils/auth.ts
import { Models } from 'appwrite';
import { account, ID } from './appwrite';

type User = Models.User<Models.Preferences>;
type Session = Models.Session;

export async function signUp(
  email: string,
  password: string,
  name: string
): Promise<User> {
  try {
    // Create the user account
    const user = await account.create(ID.unique(), email, password, name);
    // Automatically log the user in after signup
    await login(email, password);
    return user;
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
}

export async function login(email: string, password: string): Promise<Session> {
  try {
    // Clear any existing sessions first
    await account.deleteSessions();
    // Create new session
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function logout(): Promise<void> {
  try {
    await account.deleteSession('current');
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    return await account.get();
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}

export async function getSession(): Promise<Session | null> {
  try {
    return await account.getSession('current');
  } catch (error) {
    console.error('Get session error:', error);
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    console.log('Checking authentication status...');
    
    // Check for session
    console.log('Fetching session...');
    const session = await account.getSession('current');
    console.log('Session:', session ? 'Found' : 'Not found');
    
    if (!session?.$id) {
      console.log('No valid session found');
      return false;
    }
    
    // Verify user exists
    console.log('Fetching user...');
    const user = await account.get().catch(err => {
      console.error('Error fetching user:', err);
      return null;
    });
    
    const isAuthenticated = !!user?.$id;
    console.log('User authenticated:', isAuthenticated);
    return isAuthenticated;
    
  } catch (error) {
    console.error('Authentication error details:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    return false;
  }
}