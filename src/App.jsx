import './App.css'

import { useEffect, useState } from 'react';
// import {BrowserRouter, Route, Routes} from "react-router-dom";

import { WebAppUser } from '@twa-dev/types';
import WebApp from '@twa-dev/sdk'
import { MainButton, BottomBar } from '@twa-dev/sdk/react';
import {ProfileForm} from "./components/ProfileForm";
import {telegramLogin} from "./services/auth";
import {getEvents} from "./services/events";

type User = WebAppUser & { added_to_attachment_menu?: boolean; allows_write_to_pm?: boolean } | null

function App() {
  const [user, setUser] = useState<User>(null)
  const [events, setEvents] = useState([]);
  useEffect(() => {
    handleTelegramLogin()
    
  }, [])

  const handleClick = () => {
    WebApp.showAlert(`AAAA`)
  }

  const handleTelegramLogin = async () => {
    if(WebApp.initDataUnsafe.user){
    const telegramData = WebApp.initDataUnsafe || {}; // Use Telegram data
    setUser(telegramData);
    try {
      await telegramLogin(telegramData);
      // Reload events after login
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
      <h1>{txt}</h1>
      <ProfileForm user={user}/>
      <div className="card">
        <MainButton
          text="{events.length}"
          onClick={handleClick}
        />
      </div>
      
      <BottomBar  bgColor='#4287f5'/>
    </>
  )
}

export default App
