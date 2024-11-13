import './App.css';
import { useLaunchParams, miniApp, useSignal } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { useEffect, useState, useContext } from 'react';
import WebApp from '@twa-dev/sdk';
import { RegistrationScreen } from "./screens/Registration";
import { CreateEventScreen } from "./screens/CreateEvent";
import { Layout } from "./screens/Layout";
import { DiscoverScreen } from "./screens/Discover";
import { UserEventsScreen } from "./screens/UserEvents";

import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getSelf } from "./services/user";
import { telegramLogin } from "./services/auth";
import { UserProvider, UserContext } from './context/user';

function App() {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);  // Directly accessing UserContext

  const handleTelegramLogin = async () => {
    const telegramData = WebApp.initDataUnsafe || {}; // Use Telegram data
    if (telegramData.user) {
      setUser(telegramData.user); // Set user in context
      try {
        await telegramLogin(telegramData);

        // Reload events after login
        try {
          const fetchedUser = await getSelf();
          setUser(fetchedUser); // Update user in context
          console.log(user);
          
        } catch (error) {
          if (error.response && error.response.status === 404) {
            console.log("User not found, creating a new user");
            setIsFirstVisit(true);
          } else {
            console.error("Failed to fetch or create user:", error);
          }
        }
      } catch (error) {
        console.error("Telegram login failed:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    WebApp.ready();
    handleTelegramLogin();
  }, []);

  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
    >
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <HashRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/events" />} />
            <Route path="/events" element={<Layout />}>
              <Route path="discover" element={<DiscoverScreen />} />
              <Route path="create-event" element={<CreateEventScreen />} />
              <Route path="my-events" element={<UserEventsScreen />} />
              <Route path="*" element={<Navigate to="discover" />} />
            </Route>
            <Route path="/register" element={<RegistrationScreen />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </HashRouter>
      )}
    </AppRoot>
  );
}

export default function RootApp() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}
