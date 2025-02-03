import { createContext } from 'react';

// src/context/current-user-context.ts
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
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (id: number, updates: Partial<CurrentUser>) => Promise<void>;
}

const CurrentUserContext = createContext<CurrentUserContextType>({
  login(username: string, password: string): Promise<void> {
    return Promise.resolve(undefined);
  }, logout(): void {
  }, register(username: string, password: string): Promise<void> {
    return Promise.resolve(undefined);
  }, updateUser(id: number, updates: Partial<CurrentUser>): Promise<void> {
    return Promise.resolve(undefined);
  },
  currentUser: null
});

export default CurrentUserContext;