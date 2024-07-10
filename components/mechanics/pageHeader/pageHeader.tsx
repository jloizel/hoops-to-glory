"use client"

import React, { useState } from 'react'
import styles from "./page.module.css"
import { Box, Modal } from '@mui/material'
import { VscDebugRestart } from "react-icons/vsc";
import { IoClose } from "react-icons/io5";

interface PageHeaderProps {
  username: string
  usernameSet: boolean;
  handleReset: () => void;
  draftRank: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({username, usernameSet, handleReset, draftRank}) => {
  const [openModal, setOpenModal] = useState(false);
  const [resetUsernameModal, setResetUsernameModal] = useState(false)
  const [usernameReset, setUsernameReset] = useState(false)

  const handleResetClick = () => {
    setOpenModal(true)
  }

  const handleResetUsername = () => {
    handleReset()
    setOpenModal(false)
  }

  return (
    <div className={styles.mainContainer}>
      <Box className={styles.leftContainer}>
        <div className={styles.imageContainer1}>
          <img src="/images/logo3.png" className={styles.image1}></img>
        </div>
        <div className={styles.name}>
          <span>Hoops</span>
          <span>To</span>
          <span>Glory</span>
        </div>
      </Box>
      <Box className={styles.middleContainer}>
        {usernameSet && (<div className={styles.username}>{username}</div> )}
        <div className={styles.rank}>
          <span>MOCK DRAFT RANK:</span>
          <span>{draftRank}</span>
        </div>
      </Box> 
      <Box className={styles.rightContainer}>
        <div className={styles.imageContainer2}>
          <img src="/images/HoF.png" className={styles.image2}></img>
        </div>
        <VscDebugRestart className={styles.icon} onClick={handleResetClick}/>
      </Box>
      {openModal && (
        <div className={styles.modalOverlay}>
          <Modal open={openModal} disableAutoFocus={true} className={styles.modalContainer}>
            <div className={styles.modal}>
              <div className={styles.header}>
                Restart game?
                <IoClose className={styles.closeIcon} onClick={() => {setOpenModal(false)}}/>
              </div>
              <div className={styles.text}>
                <span>Are you sure you want to restart your game?</span>
                <span>Also progress will be lost.</span>          
              </div>
              <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={() => {setOpenModal(false)}}>
                  No, I want to keep playing
                </button>
                <button className={styles.button} onClick={() => {handleResetUsername()}}>
                  Yes, I want to start again
                </button>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </div>
  )
}

export default PageHeader