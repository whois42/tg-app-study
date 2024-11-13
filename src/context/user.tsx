import { createContext, useState, ReactNode, useContext } from 'react';

type User = {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    telegram_id: string
}

type UserContextType = {
    user: User | null;
    updateUser: (userData: User) => void;
};
const UserContext = createContext<UserContextType|null>(null); // Use appropriate types if necessary

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Define updateUser explicitly with a parameter
  const updateUser = (userData: User) => {  // Replace `any` with the appropriate type if available
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};