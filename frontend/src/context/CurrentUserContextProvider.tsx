// src/context/CurrentUserContextProvider.tsx
import React, { useState } from 'react';
import CurrentUserContext, { CurrentUser, CurrentUserContextType } from './current-user-context';
import { login, register, updateUser } from '../adapters/userAdapter';

interface UserContextProviderProps {
  children: React.ReactNode;
}

export default function CurrentUserContextProvider({ children }: UserContextProviderProps) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  const handleAuth = async (
      action: typeof login | typeof register,
      username: string,
      password: string
  ) => {
    try {
      const [userData] = await action(username, password);
      if (userData) setCurrentUser(userData);
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  };

  const contextValue: CurrentUserContextType = {
    currentUser,
    login: (username, password) => handleAuth(login, username, password),
    register: (username, password) => handleAuth(register, username, password),
    logout: () => setCurrentUser(null),
    updateUser: async (id, updates) => {
      const [updatedUser] = await updateUser(id, updates);
      if (updatedUser) setCurrentUser(updatedUser);
    }
  };

  return (
      <CurrentUserContext.Provider value={contextValue}>
        {children}
      </CurrentUserContext.Provider>
  );
}