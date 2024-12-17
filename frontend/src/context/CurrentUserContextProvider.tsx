import React, { useState } from 'react';
import CurrentUserContext, { CurrentUser, CurrentUserContextType } from './current-user-context';

interface UserContextProviderProps {
  children: React.ReactNode;
}

export default function UserContextProvider({ children }: UserContextProviderProps) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  
  const context: CurrentUserContextType = {
    currentUser,
    setCurrentUser
  };

  return (
    <CurrentUserContext.Provider value={context}>
      {children}
    </CurrentUserContext.Provider>
  );
}