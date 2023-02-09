import './App.css';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import app from './firebase/firebase.init';
import { useState } from 'react';


function App() {
  const [user, setUser] = useState({});


  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();


  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result.user);
        setUser(result.user);
      }).catch((error) => {
        console.log('error: ', error.message);
        setUser({});
      });
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        console.log(result.user);
        setUser(result.user);
      }).catch((error) => {
        console.log('error: ', error.message);
        setUser({});
      });
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {

        setUser({});
      }).catch((error) => {
        console.log('An error happened.');
      });
  }
  console.log(user);

  return (
    <div>
      {
        user.uid ?
          <button onClick={handleSignOut}>Sign Out</button>
          :
          <>
            <button onClick={handleGoogleSignIn}>Google sign in</button>
            <button onClick={handleGithubSignIn}>Github sign in</button>
          </>

      }
      {user.uid && <div>
        <h3>User name: {user.displayName}</h3>
        <p>Email address: {user.email}</p>
        <img src={user.photoURL} alt="" />
      </div>}

    </div>
  );
}

export default App;
