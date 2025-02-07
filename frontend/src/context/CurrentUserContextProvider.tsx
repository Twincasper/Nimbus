import React, { useState, useEffect, ReactNode } from 'react';
import CurrentUserContext, { CurrentUser, CurrentUserContextType } from './current-user-context';
import { login as loginAdapter, register as registerAdapter } from '@/adapters/authAdapter';

interface UserContextProviderProps {
  children: ReactNode;
}

export default function CurrentUserContextProvider({ children }: UserContextProviderProps) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  // On mount, try to load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // Whenever currentUser changes, update localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const login = async (username: string, password: string): Promise<void> => {
    const user = await loginAdapter(username, password);
    setCurrentUser(user);
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

  const logout = () => {
    setCurrentUser(null);
  };

  const contextValue: CurrentUserContextType = {
    currentUser,
    login,
    register,
    logout,
  };

  return (
      <CurrentUserContext.Provider value={contextValue}>
        {children}
      </CurrentUserContext.Provider>
  );
}
