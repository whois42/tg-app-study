import './App.css'
import { useLaunchParams, miniApp, useSignal } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import WebApp from '@twa-dev/sdk';

import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';

import { RegistrationScreen } from "./screens/Registration.jsx";
import { CreateEventScreen } from "./screens/CreateEvent.jsx";
import { Layout } from "./screens/Layout.tsx";
import { DiscoverScreen } from "./screens/Discover.jsx";
import { UserEventsScreen } from "./screens/UserEvents.jsx";

import { getSelf } from "./services/user";
import { telegramLogin } from "./services/auth";

function App() {
  const [user, setUser] = useState(null);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  const handleTelegramLogin = async () => {
    if (WebApp.initDataUnsafe.user) {
      const telegramData = WebApp.initDataUnsafe || {};
      setUser(telegramData.user);

      try {
        await telegramLogin(telegramData);
        const user = await getSelf();
        setUser(user);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setIsFirstVisit(true);
          console.log(isFirstVisit);
          
          navigate("/register");
        } else {
          console.error("Failed to fetch or create user:", error);
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      console.warn("Telegram data is unavailable.");
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
    <AppRoot appearance={isDark ? 'dark' : 'light'} platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="register" element={<RegistrationScreen user={user} />} />
              <Route path="discover" element={<DiscoverScreen />} />
              <Route path="create-event" element={<CreateEventScreen />} />
              <Route path="my-events" element={<UserEventsScreen />} />
            </Route>
          </Routes>
        </HashRouter>
      )}
    </AppRoot>
  );
}

export default App;
