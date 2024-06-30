"use client"

import React, { useState } from 'react'
import styles from "./page.module.css"
import { Box, Modal } from '@mui/material'
import { VscDebugRestart } from "react-icons/vsc";


interface PageHeaderProps {
  username: string
  usernameSet: boolean;
  handleReset: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({username, usernameSet, handleReset}) => {
  const [openModal, setOpenModal] = useState(false);
  const [resetUsernameModal, setResetUsernameModal] = useState(false)

  const handleResetClick = () => {
    setOpenModal(true)
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
          <span>UNDRAFTED</span>
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
                Enter player name
              </div>
              <button type="submit" className={styles.submitButton}>
                Start your journey
              </button>
            </div>
          </Modal>
        </div>
      )}
    </div>
  )
}

export default PageHeader