import './App.css'

import { useEffect, useState } from 'react';
// import {BrowserRouter, Route, Routes} from "react-router-dom";

// import { WebAppUser } from '@twa-dev/types';
import WebApp from '@twa-dev/sdk'
// import { BottomBar } from '@twa-dev/sdk/react';
import {RegistrationForm} from "./screens/Registration";
import {telegramLogin} from "./services/auth";
import {getEvents} from "./services/events";
import {getSelf} from "./services/user";

// type User = WebAppUser & { added_to_attachment_menu?: boolean; allows_write_to_pm?: boolean } | null

function App() {
  const [user, setUser] = useState(null)
  const [events, setEvents] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
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
          setShowProfile(true);
        } else {
          console.error("Failed to fetch or create user:", error);
        }
      }
      const events = await getEvents();

      setEvents(events);
    } catch (error) {
      console.error("Telegram login failed:", error);
    }
  }
  };
  const txt = events.length > 0 ? `You have ${events.length} events` : "No events yet";

  return (
    <>
      
      {showProfile? <RegistrationForm user={user}/> : <div>{txt}</div>}
    </>
  )
}

export default App
