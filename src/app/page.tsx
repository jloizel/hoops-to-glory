"use client"

import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import PageHeader from '../../components/mechanics/pageHeader/pageHeader'
import Game from '../../components/game/game'
import { Box, Modal } from '@mui/material'

const Home = () => {
  const [openModal, setOpenModal] = useState(true);
  const [username, setUsername] = useState("")
  const [usernameSet, setUsernameSet] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      setOpenModal(false);
      setUsernameSet(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = openModal ? "hidden" : "unset";
  }, [openModal]);

  const handleChange = (event:any) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();
    setOpenModal(false);
    setUsernameSet(true);
    localStorage.setItem('username', username);

    const trimmedUsername = username.trim();
    if (trimmedUsername === "") {
      const randomUsername = generateRandomUsername();
      setUsername(randomUsername);
      localStorage.setItem('username', randomUsername);
    }
  };

  const handleReset = () => {
    setUsername("");
    setUsernameSet(false);
    setOpenModal(true);
    localStorage.removeItem('username');
  };

  const generateRandomUsername = (): string => {
    const randomNumber = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 99
    return `user${randomNumber}`;
  };

  return (
    <div className={styles.home}>
      {openModal && (
          // <div className={styles.modalOverlay}>
            <Modal open={openModal} disableAutoFocus={true} className={styles.modalContainer}>
              <div className={styles.modal}>
                <div className={styles.header}>
                  Enter player name
                </div>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <input 
                    type="text" 
                    value={username} 
                    onChange={handleChange}
                    className={styles.input}
                  />
                  <button type="submit" className={styles.submitButton}>
                    Start your journey
                  </button>
                </form>
              </div>
            </Modal>
          // </div>
        )}
      <Game username={username} usernameSet={usernameSet} handleReset={handleReset}/>
    </div>
  )
}

export default Home