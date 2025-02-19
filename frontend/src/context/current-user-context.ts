import { createContext } from 'react';

export interface CurrentUser {
  id: number;
  username: string;
  pronouns?: string;
  bio?: string;
  profilePicture?: string;
}

export interface CurrentUserContextType {
  currentUser: CurrentUser | null;
  login: (username: string, password: string) => Promise<void>;
  // Updated register function signature to include pronouns and profilePicture
  register: (
      username: string,
      password: string,
      pronouns: string,
      profilePicture: string
  ) => Promise<void>;
  logout: () => void;
  updateUser: (id: number, updates: Partial<CurrentUser>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const CurrentUserContext = createContext<CurrentUserContextType>({
  currentUser: null,
  login: (username: string, password: string): Promise<void> => {
    return Promise.resolve();
  },
  register: (
      username: string,
      password: string,
      pronouns: string,
      profilePicture: string
  ): Promise<void> => {
    return Promise.resolve();
  },
  logout: () => {},
  updateUser: (id: number, updates: Partial<CurrentUser>): Promise<void> => {
    return Promise.resolve();
  },
  refreshUser: () => Promise.resolve(),
});

export default CurrentUserContext;
