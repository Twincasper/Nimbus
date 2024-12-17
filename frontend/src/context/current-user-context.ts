import { createContext } from 'react';

export interface CurrentUser {
  // Define the properties of your currentUser object here
  // For example:
  id?: string;
  name?: string;
  // Add other properties as needed
}

export interface CurrentUserContextType {
  currentUser: CurrentUser | null;
  setCurrentUser?: (user: CurrentUser | null) => void;
}

const CurrentUserContext = createContext<CurrentUserContextType>({
  currentUser: null
});

export default CurrentUserContext;