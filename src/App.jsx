import './App.css';
import { useLaunchParams, miniApp, useSignal } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import { RegistrationScreen } from "./screens/Registration.jsx";
import { CreateEventScreen } from "./screens/CreateEvent.jsx";
import { Layout } from "./screens/Layout.tsx";
import { DiscoverScreen } from "./screens/Discover.jsx";
import { UserEventsScreen } from "./screens/UserEvents.jsx";
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getSelf } from "./services/user";
import { telegramLogin } from "./services/auth";
import { UserProvider, useUser } from './context/user';

function App() {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const userCtx = useUser();

  const handleTelegramLogin = async () => {
    const telegramData = WebApp.initDataUnsafe || {}; 
    if (telegramData.user) {
      try {
        await telegramLogin(telegramData);
        try {
          const fetchedUser = await getSelf();
          userCtx.updateUser(fetchedUser);
        } catch (error) {
          if (error.response && error.response.status === 404) {
            setIsFirstVisit(true);
          } else {
            console.error("Error fetching user:", error);
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
    console.log(isFirstVisit);
    console.log(userCtx.user);
    
    
  }, []);

  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);

  return (
    <UserProvider>
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
    >
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <HashRouter>
          <Routes>
            {/* Redirect based on first visit */}
            <Route path="/" element={<Navigate to={"/events/discover"} replace />} />
            
            {/* Registration Screen */}
            <Route path="/register" element={<RegistrationScreen/>} />
            
            {/* Events layout with sub-routes */}
            <Route path="/events" element={<Layout/>}>
              <Route path="discover" element={<DiscoverScreen />} />
              <Route path="create-event" element={<CreateEventScreen />} />
              <Route path="my-events" element={<UserEventsScreen />} />
              <Route path="*" element={<Navigate to="discover" replace />} />
            </Route>

            {/* Catch-all for undefined routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HashRouter>
      )}
    </AppRoot>
    </UserProvider>
  );
}

export default App;
