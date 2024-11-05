import './App.css'
import { useLaunchParams, miniApp, useSignal } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
// import { useIntegration } from '@telegram-apps/react-router-integration';

import { useEffect, useState } from 'react';
// import {BrowserRouter, Route, Routes} from "react-router-dom";

// import { WebAppUser } from '@twa-dev/types';
import WebApp from '@twa-dev/sdk'
// import { BottomBar } from '@twa-dev/sdk/react';
import {RegistrationScreen} from "./screens/Registration.jsx";
import {CreateEventScreen} from "./screens/CreateEvent.jsx";
import {Layout} from "./screens/Layout.tsx";
import {DiscoverScreen} from "./screens/Discover.jsx";
import {UserEventsScreen} from "./screens/UserEvents.jsx";

import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import {getSelf} from "./services/user";
import {telegramLogin} from "./services/auth";

// type User = WebAppUser & { added_to_attachment_menu?: boolean; allows_write_to_pm?: boolean } | null

function App() {
  const [user, setUser] = useState(null)
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  // const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
  // const [location, reactNavigator] = useIntegration(navigator);

  const handleTelegramLogin = async () => {
    console.log("handleTelegramLogin");
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
          setIsFirstVisit(true);
        } else {
          console.error("Failed to fetch or create user:", error);
        }
      }
    } catch (error) {
      console.error("Telegram login failed:", error);
    }
  }
  };

  // Don't forget to attach the navigator to allow it to control the BackButton state as well
  // as browser history.
  // useEffect(() => {
  //   navigator.attach();
  //   return () => navigator.detach();
  // }, [navigator]);

  useEffect(() => {
    // init();
    WebApp.ready();
    handleTelegramLogin();
    console.log("App.js");
    console.log(user, "user");
    console.log(isFirstVisit, "isFirstVisit");
    
    
    
  },[]);

  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);


  return (
    <AppRoot
    appearance={isDark ? 'dark' : 'light'}
    platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
  >
    <div>AAAAAA</div>
    <HashRouter>
      <Routes>
        <Route path="/"  />
        <Route path="/register" element={<RegistrationScreen user={user} />} />
        <Route path="/discover" element={<DiscoverScreen />} />
        
        <Route element={<Layout />}>
          <Route path="/discover" element={<DiscoverScreen />} />
          <Route path="/create-event" element={<CreateEventScreen />} />
          <Route path="/my-events" element={<UserEventsScreen />} />
        </Route>
        <Route path="*" element={isFirstVisit ? <Navigate to="/discover" /> : <Navigate to="/register" />}/>
      </Routes>
    </HashRouter>
    </AppRoot>
  )
}

export default App
