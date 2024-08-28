"use client"

import React, { useCallback, useEffect, useState } from 'react'
import styles from "./page.module.css"
import PageHeader from '../../components/mechanics/pageHeader/pageHeader'
import Game from '../../components/game/game'
import { Box, Modal } from '@mui/material'

const Home = () => {
  const [openModal, setOpenModal] = useState(true);
  const [username, setUsername] = useState("")
  const [usernameSet, setUsernameSet] = useState(false);
  const [journeyStarted, setJourneyStarted] = useState(false)
  const [isTabActive, setIsTabActive] = useState(true);
  const [showInactiveModal, setShowInactiveModal] = useState(false); 
  const [dontRemindAgain, setDontRemindAgain] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedDontRemindAgain = localStorage.getItem('dontRemindAgain');

    if (storedUsername) {
      setUsername(storedUsername);
      setOpenModal(false);
      setUsernameSet(true);
    }

    if (storedDontRemindAgain === "true") {
      setDontRemindAgain(true);
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

    setTimeout(() => {
      setJourneyStarted(true);
    }, 3000);
  };

  const handleReset = () => {
    setUsername("");
    setUsernameSet(false);
    setOpenModal(true);
    localStorage.removeItem('username');
    setJourneyStarted(false)
    setDontRemindAgain(false);
    localStorage.removeItem('dontRemindAgain');
  };

  const generateRandomUsername = (): string => {
    const randomNumber = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 99
    return `user${randomNumber}`;
  };


  const handleVisibilityChange = useCallback(() => {
    const isCurrentlyActive = document.visibilityState === 'visible';
    setIsTabActive(isCurrentlyActive);

    if (!isCurrentlyActive && !dontRemindAgain) {
      setShowInactiveModal(true);
    }
  }, [dontRemindAgain]);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  const handleRemindLater = () => {
    setShowInactiveModal(false);
  };

  // Handle "Don't remind me again" button click
  const handleDontRemindAgain = () => {
    setShowInactiveModal(false);
    setDontRemindAgain(true);
    localStorage.setItem('dontRemindAgain', "true");
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
        {showInactiveModal && !dontRemindAgain && (
        <Modal open={showInactiveModal} className={styles.modalContainer}>
          <div className={styles.modal2}>
            {/* <div className={styles.header}>
              You left the game tab
            </div> */}
            <div className={styles.modalText}>
              Some elements of the game won&apos;t run as an inactive tab. If you want to let the game run fully in the background, leave it as an active separate window.
              </div>
            <div className={styles.buttonContainer}>
              <button onClick={handleRemindLater} className={styles.modalButton}>
                Remind me later
              </button>
              <button onClick={handleDontRemindAgain} className={styles.modalButton}>
                Don&apos;t remind me again
              </button>
            </div>
          </div>
        </Modal>
      )}
      <Game 
        username={username} 
        usernameSet={usernameSet} 
        handleReset={handleReset} 
        journeyStarted={journeyStarted}
        showInactiveModal={showInactiveModal}      
      />
    </div>
  )
}

export default Home