import { auth } from '../Auth';

function Message(props) {
    const { text, photoURL, uid, displayName } = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'

    const author = displayName ? displayName : 'анонимус';

    return (
        <div className={`${messageClass} messageBox`}>
            <p>{author} :</p>
            <div className={`message`}>
                <p>{text}</p>
                <img alt={`${author}`} src={photoURL} />
            </div>
        </div>
    )
}

export default Message;