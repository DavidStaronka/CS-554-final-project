import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import { callSignInWithEmailAndPassword, callPasswordReset } from "../firebase/FirebaseFunctions";

function Login() {
  const { currentUser } = useContext(AuthContext);
  const handleLogin = async (event) => {
    event.preventDefault();
    let { email, password } = event.target.elements;
    console.log(event.target.elements);

    try {
      await callSignInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
    }
  };

  const passwordReset = (event) => {
    event.preventDefault();
    let email = document.getElementById("email").value;
    if (email) {
      callPasswordReset(email);
      alert("If your email is registered, a password reset email was sent");
    } else {
      alert(
        "Please enter the email address you are trying to reset the password and then click the forgot password link"
      );
    }
  };
  if (currentUser) {
    // console.log(currentUser.uid);
    return (
      <Navigate
        to={{
          pathname: "/",
        }}
      />
    );
  }
  return (
    <div>
      <br></br>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>
            Email:
            <input
              className="form-control"
              required
              id="email"
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
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              required
            />
          </label>
        </div>
        <br></br>
        <button id="submitButton" name="submitButton" type="submit">
          Login
        </button>
      </form>
      <br></br>
      <button onClick={passwordReset}> Forgot Password?</button>
      <br />
      <br></br>

      <Link to="/">Don't have an account?</Link>
    </div>
  );
}

export default Login;
