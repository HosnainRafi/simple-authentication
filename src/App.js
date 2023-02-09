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

  const handleRegister = (event) => {
    event.preventDefault();
    console.log(event.target.email.value);
  }

  return (
    <div className='App'>

      <form onSubmit={handleRegister}>
        <input type="email" name='email' id='email' placeholder='Your Email' />
        <br />
        <input type="password" name='password' id='password' placeholder='Your Password' />
        <br />
        <button type='submit'>Register</button>
      </form>

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
