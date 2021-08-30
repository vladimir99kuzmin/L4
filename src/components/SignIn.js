import { auth, firebase } from '../Auth';
import { Button } from "@material-ui/core";

function SignIn() {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    return (
        <div className="signIn-btnHandler">
            <Button className="coloredButton" onClick={signInWithGoogle}>Войти с Google</Button>
        </div>
    )
}

export default SignIn;