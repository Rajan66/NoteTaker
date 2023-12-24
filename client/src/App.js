import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import './App.css';
import { Button } from "@mui/material"
import NotesListPage from './pages/NotesListPage';
import Header from './components/Header';
import NotePage from './pages/NotePage';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { useEffect, useState } from "react";


function App() {
  const [auth, setAuth] = useState(false || window.localStorage.getItem('auth') === 'true')
  const [token, setToken] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userCred) => {
      if (userCred) {
        setUsername(userCred.displayName)
        setAuth(true)
        window.localStorage.setItem('auth', 'true')
        userCred.getIdToken()
          .then((token) => setToken(token))
      }
    })
  }, [username])

  const loginWithGoogle = () => {
    firebase.auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(
        (userCred) => {
          if (userCred) {
            setUsername(userCred.displayName)
            setAuth(true)
            window.localStorage.setItem('auth', 'true')
          }
        }
      ).catch((error) => {
        console.log(error.message)
      })
  }

  const handleLogout = () => {
    firebase.auth().signOut()
      .then(() => {
        setAuth(false)
        setUsername('')
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
            <div className="welcome-user" style={{ marginBottom: "10px" }}>
              Welcome {username} !📝
            </div>
            <div className="app">
              <Header />
              <Routes>
                <Route path='/' element={<NotesListPage token={token} />} />
                <Route path='/note/:id' element={<NotePage token={token} />} />
              </Routes>

            </div>
            <Button
              variant="contained"
              style={{
                backgroundColor: "var(--color-main)",
                fontSize: "16px",
                marginTop: "15px"
              }}
              onClick={handleLogout}>
              Logout
            </Button>
          </div>

        </Router>
      ) : (
        <div className="container dark" >
          <div>
            <h1 style={{ fontSize: "60px" }}>👋🏻 Welcome to NoteTaker 😺 </h1>
          </div>
          <Button
            variant="contained"
            className="buttons"
            style={{
              backgroundColor: "var(--color-main)",
              fontSize: "16px",
              marginTop: "55px"
            }}
            onClick={loginWithGoogle}>
            Login with Google
          </Button>
        </div>
      )}
    </>
  );
}

export default App;
