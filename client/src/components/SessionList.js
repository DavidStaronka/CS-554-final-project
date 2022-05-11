import { AuthContext } from '../firebase/Auth';
import React, { useContext } from 'react';
import { useState, useRef, useEffect } from "react";
const axios = require("axios");

function SessionList() {
  const { currentUser } = useContext(AuthContext);
    const [sessions, setSessions] = React.useState([]);
  console.log(currentUser)

    useEffect(() => {
        async function getSessions() {
            try{
                let res = await axios.get(`http://localhost:5000/sessions`);
                setSessions(res.data);
            } catch (e) {
                console.log(e);
            }
        }
        getSessions();
    }, []);


  if (!currentUser){
    return <p> Please login to view your Sessions</p>
  } else {
    return <p>Sessions Page</p>;
  }
}

export default SessionList;
