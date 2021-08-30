import './App.css';
import { auth } from './Auth';
import { useAuthState } from 'react-firebase-hooks/auth'
import SignIn from './components/SignIn';
import MessangerHeader from './components/MessangerHeader';
import Rooms from './components/Rooms'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Profile from './components/Profile';
import Home from './components/Home';

function App() {
  const [user] = useAuthState(auth);
  if (user) {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}> <Home /> </Route>
          <Route path="/chat">
            <div className="app">
              <section className="mainFrame">
                <><MessangerHeader /> <Rooms /></>
              </section>
            </div>
          </Route>
          <Route path="/profile" component={Profile} />
        </Switch>
      </Router>
    );
  } else { return (<SignIn />); }
}

export default App;
