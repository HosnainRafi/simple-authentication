import './App.css';
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import app from './firebase/firebase.init';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';


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
    const email = event.target.email.value;
    const password = event.target.password.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Signed in 
        const user = result.user;
        setUser(result.user);
        console.log(user);
      })
      .catch((error) => {
        console.log('error', error.message);
        setUser({});
      });
  }

  return (
    <div  className='w-50 mx-auto !important'>

      {/* <form onSubmit={handleRegister}>
        <input type="email" name='email' id='email' placeholder='Your Email' />
        <br />
        <input type="password" name='password' id='password' placeholder='Your Password' />
        <br />
        <button type='submit'>Register</button>
      </form> */}

      {
        user.uid ?
          <button onClick={handleSignOut}>Sign Out</button>
          :
          <>

            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" />
              </Form.Group>
              
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>

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
