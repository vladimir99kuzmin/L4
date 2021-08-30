import { auth } from '../Auth';
import { Button } from "@material-ui/core";

function MessangerHeader() {
    return auth.currentUser && (
        <div className="heading">
            <h1 className="mainHeading">Мой первый реакт чат</h1>
            <Button className="logOutBtn" variant="contained" onClick={() => auth.signOut()}>Выход</Button>
        </div>
    )
}

export default MessangerHeader;