import { AuthContext } from '../firebase/Auth';
import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import '../App.css'
import { callProfileUpload } from '../firebase/FirebaseFunctions';
function Profile() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser)
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0])
      console.log(photo)
    }
  }

  async function handleClick() {
    console.log("clicked")
    await callProfileUpload(photo, currentUser, setLoading);
    window.location.reload()
  }

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser])

  if (!currentUser){
    return <p> Please login to view your profile</p>
  } else {
    return (
    <div >

      <h1>Email</h1>
      <p> {currentUser.email} </p>
      <br></br>

      <h1>Current Profile Picture</h1>
      <br></br>
      <img src={photoURL} alt="Avatar" className="avatar" />
      <br></br>
      <br></br>

    <input type="file" onChange={handleChange} />
    <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
  </div>);
  }
}

export default Profile;
