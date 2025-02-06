// src/context/CurrentUserContextProvider.tsx
import React, { useState } from 'react';
import CurrentUserContext, { CurrentUser, CurrentUserContextType } from './current-user-context';
import { login as loginAdapter, register as registerAdapter } from '@/adapters/authAdapter';
import {updateUser} from "@/adapters/userAdapter.ts";

interface UserContextProviderProps {
  children: React.ReactNode;
}

export default function CurrentUserContextProvider({ children }: UserContextProviderProps) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  // A helper that handles both login and sign up
  const handleAuth = async (
      action: (...args: any[]) => Promise<any>,
      ...args: any[]
  ) => {
    try {
      const [userData] = await action(...args);
      if (userData) setCurrentUser(userData);
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  };

  const contextValue: CurrentUserContextType = {
    currentUser,
    login: (username, password) => handleAuth(loginAdapter, username, password),
    register: (username, password, pronouns, profilePicture) => handleAuth(registerAdapter, username, password, pronouns, profilePicture),
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
