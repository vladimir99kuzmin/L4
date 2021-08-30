import { List, ListItem } from "@material-ui/core";
import { useState } from 'react';
import Messanger from './Messanger'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function Rooms() {
    const rooms =
        [{ id: 'messages', name: 'Room One' },
        { id: 'messages2', name: 'Room Two' },
        { id: 'messages3', name: 'Room Three' }];
    //const [chatRoom, setChatRoom] = useState('messages');

    const onClickHandler = (element) => {
        //setChatRoom(element.id);
        let timer = setTimeout(() => window.location.reload(), 0);
        return () => clearTimeout(timer);
    }

    const chatList = rooms.map((element, key) => {
        return (
            <ListItem key={key} component={Link} to={'/chat/' + element.id} button onClick={() => onClickHandler(element)}>{element.name}</ListItem>
        );
    });

    return (
        <main>
            <List className="roomChanger">
                {chatList}
            </List>
            <Router>
                <Switch>
                    {rooms.map((element, key) => {
                        return (
                            <Route key={key} path={'/chat/' + element.id}>
                                <Messanger room={element.id} />
                            </Route>
                        );
                    })}
                </Switch>
            </Router>

        </main>
    );
}
export default Rooms;