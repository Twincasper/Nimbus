import { useState, useEffect, ReactNode } from 'react';
import CurrentUserContext, { CurrentUser, CurrentUserContextType } from './current-user-context';
import {getCurrentUser, login as loginAdapter, register as registerAdapter} from '@/adapters/authAdapter';
import { updateUser as updateUserAdapter } from '@/adapters/userAdapter';

interface UserContextProviderProps {
  children: ReactNode;
}

export default function CurrentUserContextProvider({ children }: UserContextProviderProps) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch {
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    validateSession();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const login = async (username: string, password: string): Promise<void> => {
    const user = await loginAdapter(username, password);
    setCurrentUser(user);
  };

  const logout = async () => {
    await fetch('http://localhost:8080/api/auth/logout', {
      method: 'POST',
      credentials: 'include' // Send cookies
    });
    setCurrentUser(null);
  };

  const register = async (
      username: string,
      password: string,
      pronouns: string,
      profilePicture: string
  ): Promise<void> => {
    const user = await registerAdapter(username, password, pronouns, profilePicture);
    setCurrentUser(user);
  };

  const updateUser = async (id: number, updates: Partial<CurrentUser>) => {
    const requiredUpdates = {
        username: updates.username || '',
        pronouns: updates.pronouns || '',
        profilePicture: updates.profilePicture || '',
        bio: updates.bio || ''
    };
    
    const [updatedUser, error] = await updateUserAdapter(id, requiredUpdates);
    if (error) throw error;
    setCurrentUser(updatedUser as CurrentUser);
  };

  const contextValue: CurrentUserContextType = {
    currentUser,
    login,
    register,
    logout,
    updateUser,
  };

  return (
      <CurrentUserContext.Provider value={contextValue}>
        {children}
      </CurrentUserContext.Provider>
  );
}
