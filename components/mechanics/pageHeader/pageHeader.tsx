"use client"

import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import { Box, Fade, Modal } from '@mui/material'
import { VscDebugRestart } from "react-icons/vsc";
import { IoClose } from "react-icons/io5";
import HallOfFame from '../../hof/hof';

interface PageHeaderProps {
  username: string
  usernameSet: boolean;
  handleReset: () => void;
  draftRank: string;
  handleRestartGame: () => void;
  disableRestart: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({username, usernameSet, handleReset, draftRank, handleRestartGame, disableRestart}) => {
  const [openModal, setOpenModal] = useState(false);
  const [resetUsernameModal, setResetUsernameModal] = useState(false)
  const [usernameReset, setUsernameReset] = useState(false)
  const [open, setOpen] = useState(false);

  const handleResetClick = () => {
    setOpenModal(true)
  }

  const handleResetUsername = () => {
    handleReset()
    setOpenModal(false)
    handleRestartGame()
  }

  const handleHofClick = () => {
    setOpen(true)
  }

  const handleCloseIcon = () => {
    setOpen(false)
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "unset";
  }, [open]);

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
        <div className={styles.imageContainer2} onClick={handleHofClick}>
          <img src="/images/HoF.png" className={styles.image2}></img>
        </div>
        <VscDebugRestart 
          className={`${styles.icon} ${disableRestart ? styles.disabledIcon : ''}`}
          onClick={!disableRestart ? handleResetClick : undefined} />
      </Box>
      {openModal && (
        // <div className={styles.modalOverlay}>
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
        // </div>
      )}
      <Modal open={open} onClose={() => setOpen(false)} className={styles.modalContainer}>
        {/* <div className={styles.modal}> */}
          <HallOfFame handleCloseIcon={handleCloseIcon}/>
        {/* </div> */}
      </Modal>
    </div>
  )
}

export default PageHeader