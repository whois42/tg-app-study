import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type User = {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    telegram_id: string
} | null

// Define the context value type
interface UserContextType {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
  }
  
  // Create the UserContext with a default value of `null` for the initial state
  export const UserContext = createContext<UserContextType | undefined>(undefined);
  
  // Props for UserProvider
  interface UserProviderProps {
    children: ReactNode;
  }
  
  // Create the UserProvider
  export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User>(null);
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
  };