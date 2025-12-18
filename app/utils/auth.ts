import { ID } from 'appwrite';
import { account } from './appwrite';

export async function signUp(
  email: string,
  password: string,
  name: string
) {
  try {
    return await account.create(ID.unique(), email, password, name);
  } catch (error) {
    console.log('sign up error: ', error);
    throw error;
  }
}
export async function LoginFuction(email: string, password: string) {
  try {
    return await account.createEmailPasswordSession(email, password);
  } catch (error) {
    console.log("Error logging in : ", error);
    throw error;
  }
}
export async function LogOut() {
  try {
    await account.deleteSessions();
  } catch (error) {
    console.log("Error Logging out : ", error);
    throw error;
  }
}
export async function getCurrentUser() {
  try {
    return await account.get();
  } catch {
    return null;
  }
}