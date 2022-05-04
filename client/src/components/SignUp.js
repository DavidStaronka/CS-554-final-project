import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { callCreateUserWithEmailAndPassword } from "../firebase/FirebaseFunctions";
import { callSignOut } from "../firebase/FirebaseFunctions";
import { AuthContext } from "../firebase/Auth";
import axios from "axios";

const SignOutButton = () => {
  return (
    <button type="button" onClick={callSignOut}>
      Sign Out
    </button>
  );
};

const addtoMongo = async (firebase, email) => {
  try {
    let response = await axios.post(`http://localhost:5000/users/create/` + firebase + "/" + email);
    console.log(response);
  } catch (e) {
    alert(e);
  }
};

function SignUp() {
  const { currentUser } = useContext(AuthContext);
  const [pwMatch, setPwMatch] = useState("");
  const [signingUp, setSigningUp] = useState(false);

  const SignOutButton = () => {
    return (
      <button
        type="button"
        onClick={() => {
          callSignOut();
          setSigningUp(false);
        }}
      >
        Sign Out
      </button>
    );
  };

  useEffect(() => {
    if (currentUser && signingUp) {
      addtoMongo(currentUser.uid, currentUser.email);
    }
  }, [currentUser, signingUp]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { email, passwordOne, passwordTwo } = e.target.elements;
    if (passwordOne.value !== passwordTwo.value) {
      setPwMatch("Passwords do not match");
      return false;
    }

    try {
      let seethis = await callCreateUserWithEmailAndPassword(email.value, passwordOne.value);
      console.log(seethis);
      setSigningUp(true);
      // addtoMongo()
    } catch (error) {
      alert(error);
    }
  };

  if (currentUser) {
    console.log(currentUser.uid);

    return (
      <div>
        You are signed in as {currentUser.email}
        <br></br>
        <br></br>
        <Link to="/profile">View your profile</Link>
        <br></br>
        <br></br>
        <SignOutButton />
      </div>
    );
  }

  return (
    <div>
      <h1>Sign up</h1>
      {pwMatch && <h4 className="error">{pwMatch}</h4>}
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label>
            Email:
            <input
              className="form-control"
              required
              name="email"
              type="email"
              placeholder="Email"
            />
          </label>
        </div>
        <br></br>
        <div className="form-group">
          <label>
            Password:
            <input
              className="form-control"
              id="passwordOne"
              name="passwordOne"
              type="password"
              placeholder="Password"
              required
            />
          </label>
        </div>
        <br></br>
        <div className="form-group">
          <label>
            Confirm Password:
            <input
              className="form-control"
              name="passwordTwo"
              type="password"
              placeholder="Confirm Password"
              required
            />
          </label>
        </div>
        <br></br>
        <button id="submitButton" name="submitButton" type="submit">
          Sign Up
        </button>
      </form>
      <br></br>
      <Link to="/login"> Already have an account?</Link>
      <br />
    </div>
  );
}

export default SignUp;
