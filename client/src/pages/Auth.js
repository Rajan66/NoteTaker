import React from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const Auth = () => {

    const loginWithGoogle = () => {
        firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then(
                (userCred) => {
                    console.log(userCred)
                }
            )
    }

    return (
        <div>
            <button onClick={loginWithGoogle}>Login with Google</button>
        </div>
    )
}

export default Auth