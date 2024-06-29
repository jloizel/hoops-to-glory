"use client"

import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import PageHeader from '../../components/pageHeader/pageHeader'
import Game from '../../components/game/game'
import { Box, Modal } from '@mui/material'

const Home = () => {
  const [openModal, setOpenModal] = useState(true);
  const [username, setUsername] = useState("")

  const handleChange = (event:any) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();
    setOpenModal(false);
  };


  return (
    <div className={styles.home}>
      {openModal && (
          <div className={styles.modalOverlay}>
            <Modal open={openModal} disableAutoFocus={true} className={styles.modalContainer}>
              <div className={styles.modal}>
                <div className={styles.header}>
                  Enter player name
                </div>
                <div className={styles.content}>
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <input 
                      type="text" 
                      value={username} 
                      onChange={handleChange}
                      className={styles.input}
                    />
                    <button type="submit" className={styles.submitButton}>
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </Modal>
          </div>
        )}
      <PageHeader username={username}/>    
      <Game/>
    </div>
  )
}

export default Home