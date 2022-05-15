import { AuthContext } from '../firebase/Auth';
import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import '../App.css'
import { updateProfile } from "firebase/auth";
import * as AWS from 'aws-sdk'

function Profile() {
  const { currentUser } = useContext(AuthContext);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
  const s3 = new AWS.S3({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
  });
  function handleChange(e) {
    if (e.target.files[0]) {
      var re = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i;
      if (!re.exec(e.target.files[0].name)) {
        alert("File must be a .jpg, .jpeg, .bmp, .gif, .png");
        document.getElementById("userprofile").value = ""
        return
      }

      setPhoto(e.target.files[0])
      console.log(e.target.files[0])
     
    }
  }

  async function handleClick() {
    setLoading(true)
    const params = {
      Bucket: 'cs554dnds3bucket', 
      Key: photo.name, 
      Body: photo
  };
  await s3.upload(params, async function(s3Err, data) {
    if (s3Err) throw s3Err
    // console.log(`File uploaded successfully at ${data.Location}`)
    setPhotoURL(data.Location)
    updateProfile(currentUser, {photoURL : data.Location});
    setLoading(false)
    window.location.reload()
});

  }

  useEffect(() => {
    console.log(currentUser)
    console.log(photoURL)
  }, [photoURL, currentUser, currentUser.photoURL])

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
      <img src={currentUser.photoURL} alt="Avatar" className="avatar" />
      <br></br>
      <br></br>

    <input id= "userprofile" type="file" onChange={handleChange} />
    <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
  </div>);
  }
}

export default Profile;
