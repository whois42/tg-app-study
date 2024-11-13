import './App.css'
import { useLaunchParams, miniApp, useSignal } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk'
import {RegistrationScreen} from "./screens/Registration.jsx";
import {CreateEventScreen} from "./screens/CreateEvent.jsx";
import {Layout} from "./screens/Layout.tsx";
import {DiscoverScreen} from "./screens/Discover.jsx";
import {UserEventsScreen} from "./screens/UserEvents.jsx";

import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import {getSelf} from "./services/user";
import {telegramLogin} from "./services/auth";


function App() {
  const [user, setUser] = useState(null)
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleTelegramLogin = async () => {
    if(WebApp.initDataUnsafe.user){
    const telegramData = WebApp.initDataUnsafe || {}; // Use Telegram data
    setUser(telegramData.user);
    try {
      await telegramLogin(telegramData);
      // Reload events after login
      try {
        const user = await getSelf();
        setUser(user);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // User not found, create a new user
          console.log("User not found, creating a new user");
          setIsFirstVisit(true);
          
        } else {
          console.error("Failed to fetch or create user:", error);
        }
      }
    } catch (error) {
      console.error("Telegram login failed:", error);
    } finally
    {
      console.log("Finally");
      setIsLoading(false);
    }
  }
  };
  
  useEffect(() => {
    // init();
    WebApp.ready();
    handleTelegramLogin();
  },[]);

  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);
  console.log(lp, "launch params");
  console.log(isFirstVisit, "isFirstVisit");
  
  


  return (
    <AppRoot
    appearance={isDark ? 'dark' : 'light'}
    platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
  >
{  isLoading ?  <div>Loading</div> :
    <HashRouter>
      <Routes>
        <Route path="/" element={!isFirstVisit ? <Navigate to="/events/discover" /> : <Navigate to="/register" />} />
        <Route path="/register" element={<RegistrationScreen user={user} />} />
        <Route path="/events" element={<Layout />}>
          <Route path="discover" element={<DiscoverScreen />} />
          <Route path="create-event" element={<CreateEventScreen />} />
          <Route path="my-events" element={<UserEventsScreen />} />
        </Route>
      </Routes>
    </HashRouter>}
    </AppRoot>
  )
}

export default App
