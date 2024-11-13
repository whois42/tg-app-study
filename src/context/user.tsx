import { createContext, useState, ReactNode } from 'react';

type User = {
    id: number,
    username: string,
    first_name: string
    last_name: string
    telegram_id: string
}

interface UserContextType {
  user: User | null;
  updateUser: (userData: User) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
    {
        user: null,
        updateUser: () => {}
    }
);

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
