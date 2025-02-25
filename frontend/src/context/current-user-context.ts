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
}

const CurrentUserContext = createContext<CurrentUserContextType>({
  currentUser: null,
  login: (_username: string, _password: string): Promise<void> => {
    return Promise.resolve();
  },
  register: (
      _username: string,
      _password: string,
      _pronouns: string,
      _profilePicture: string
  ): Promise<void> => {
    return Promise.resolve();
  },
  logout: () => {},
  updateUser: (_id: number, _updates: Partial<CurrentUser>): Promise<void> => {
    return Promise.resolve();
  },
});

export default CurrentUserContext;
