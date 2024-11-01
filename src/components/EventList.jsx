import { Cell, List} from '@telegram-apps/telegram-ui';

export const EventList = ({events}) => {
    const renderImage = (event) => {
        if (event.image) {
            return <img src={event.cover_image_url} alt={event.title} style={{width: 48, height: 48}}/>
        }
        return null
    }
    return (
        <List>
            {events.map(event => (
                <Cell key={event.id} title={event.title} description={event.description} before={renderImage(event)}/>
            ))}
        </List>
    )
}