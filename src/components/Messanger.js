import { auth, firestore, firebase } from '../Auth';
import { useRef, useState, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { TextField, Button } from "@material-ui/core";
import Message from './Message';

function Messanger(props) {
    const messagesRef = firestore.collection(props.room);
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, { idField: 'id' });

    const [formValue, setFormValue] = useState('');
    const [messageSended, isMessageSended] = useState(0);
    const dummy = useRef();
    const sendMessage = async (e) => {
        if (formValue.trim() === '') {
            alert("Сообщение пустое");
            return;
        }
        isMessageSended(true);
        e.preventDefault();

        const { uid, photoURL, displayName } = auth.currentUser;
        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL,
            displayName
        });

        setFormValue('');

        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    const roboAnswer = async () => {

        const { displayName } = auth.currentUser;
        await messagesRef.add({
            text: `Робот видит, что сейчас писал ${displayName}`,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid: "010101",
            photoURL: 'https://yt3.ggpht.com/a/AGF-l7-EzR4dncrYFOsecUoJB-sjtshdJoZ-thEr5A=s900-c-k-c0xffffffff-no-rj-mo',
            displayName: 'ChatBot'

        });

        setFormValue('');

        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    const firstUpdate = useRef(true);
    useEffect(() => {
        if (firstUpdate.current) firstUpdate.current = false;
        else {
            let timer = setTimeout(() => roboAnswer(), 1500);
            return () => clearTimeout(timer);
        }
    }, [messageSended])

    return (
        <>
            <div className="messages">
                {messages && messages.map(msg => <Message key={msg.id} message={msg} />)}
                <div ref={dummy}></div>
            </div>
            <form onSubmit={sendMessage} className="sendForm">
                <div className="sendFormContainer">
                    <TextField label="Сообщение"
                        fullWidth onChange={(e) => setFormValue(e.target.value)}
                        value={formValue}
                        style={{ backgroundColor: 'white', outline: '0', borderRadius: '5px' }}
                        variant="filled"
                        autoFocus
                        multiline />
                    <Button className="coloredButton" type="submit"> Отправить </Button>
                </div>
            </form>

        </>
    )
}

export default Messanger;