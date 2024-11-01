import React from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
// import { Outlet, Link } from 'react-router-dom';
import { Tabbar } from "@telegram-apps/telegram-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Layout = ({children}: {children: React.ReactNode}) => {
    const tabs = [
        {name: "Discover", route: "/discover", Icon: () => <FontAwesomeIcon icon="compass" />}, 
        {name: "Create Event", route: "/create-event", Icon: () => <FontAwesomeIcon icon="plus" />},
        {name: "My Events", route: "/my-events", Icon: () => <FontAwesomeIcon icon="user" />}]
    const location = useLocation();
    const navigate = useNavigate();
    const handleTabClick = (route: string) => {
        navigate(route);
    }

    return (
        <div>
            <Outlet />
            <Tabbar>
                {tabs.map(({ name, route, Icon }) => (
                    <Tabbar.Item key={name} text={name} selected={location.pathname === route} onClick={() => handleTabClick(route)}>
                        <Icon />
                    </Tabbar.Item>
                ))}
            </Tabbar>
        </div>
    )
}