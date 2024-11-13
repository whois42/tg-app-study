import { createContext, useState, ReactNode } from 'react';

type User = {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    telegram_id: string
}

const UserContext = createContext<{ user: User | null, updateUser: (userData: User) => void } | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Define updateUser explicitly with a parameter
  const updateUser = (userData: User) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};