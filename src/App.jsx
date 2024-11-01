import './App.css'

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
import {telegramLogin} from "./services/auth";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {getSelf} from "./services/user";

// type User = WebAppUser & { added_to_attachment_menu?: boolean; allows_write_to_pm?: boolean } | null

function App() {
  const [user, setUser] = useState(null)
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  useEffect(() => {
    handleTelegramLogin()
  }, [])

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

  return (
    <Router>
      <Routes>
        {/* Redirect to Registration if user is new, otherwise show MainLayout */}
        <Route path="/" element={!isFirstVisit ? <Navigate to="/discover" /> : <Navigate to="/register" />} />
        <Route path="/register" element={<RegistrationScreen user={user} />} />
        
        {/* Main layout with nested routes */}
        <Route element={<Layout />}>
          <Route path="/discover" element={<DiscoverScreen />} />
          <Route path="/create-event" element={<CreateEventScreen />} />
          <Route path="/my-events" element={<UserEventsScreen />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
