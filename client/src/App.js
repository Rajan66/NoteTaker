import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import './App.css';
import NotesListPage from './pages/NotesListPage';
import Header from './components/Header';
import NotePage from './pages/NotePage';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { useEffect, useState } from "react";


function App() {
  const [auth, setAuth] = useState(false || window.localStorage.getItem('auth') === 'true')
  const [token, setToken] = useState('')

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userCred) => {
      if (userCred) {
        setAuth(true)
        window.localStorage.setItem('auth', 'true')
        userCred.getIdToken()
          .then((token) => setToken(token))
      }
    })
  }, [])

  const loginWithGoogle = () => {
    firebase.auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(
        (userCred) => {
          if (userCred) {
            setAuth(true)
            window.localStorage.setItem('auth', 'true')
          }
        }
      )
  }

  const handleLogout = () => {
    firebase.auth().signOut()
      .then(() => {
        console.log('User logged out');
        setAuth(false)
        window.localStorage.setItem('auth', 'false')
      }).catch((error) => {
        console.error('Error during logout:', error);
      });
  };
  return (
    <>
      {auth ? (
        <Router>
          <div className="container dark">
            <div className="app">
              <Header />
              <Routes>
                <Route path='/' element={<NotesListPage token={token} />} />
                <Route path='/note/:id' element={<NotePage token={token} />} />
              </Routes>

            </div>
            <button style={{ marginTop: "20px" }} >Logout</button>
          </div>

        </Router>
      ) : (
        <div>
          <button onClick={loginWithGoogle}>Login with Google</button>
        </div>
      )}
    </>
  );
}

export default App;
