type User = {
    id: number,
    username: string,
    first_name: string
    last_name: string
    telegram_id: string
}
import { createContext, useState, ReactNode } from 'react';

interface UserContextType {
  user: User | null;
  updateUser: (userData: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};