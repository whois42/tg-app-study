import { Tabbar } from "@telegram-apps/telegram-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

export const Layout = ({isFirstVisit}:{isFirstVisit: boolean}) => {
    const tabs = [
        {name: "Discover", route: "/discover", Icon: () => <FontAwesomeIcon icon="compass" />}, 
        {name: "Create Event", route: "/create-event", Icon: () => <FontAwesomeIcon icon="plus" />},
        {name: "My Events", route: "/my-events", Icon: () => <FontAwesomeIcon icon="user" />}]
    const location = useLocation();
    const navigate = useNavigate();
    const handleTabClick = (route: string) => {
        navigate(route);
    }
    if(isFirstVisit){
        console.log("First Visit LAyout", isFirstVisit);
        
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