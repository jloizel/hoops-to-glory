"use client"

import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import Phone from '../../components/phone/phone'
import Analytics from '../analytics/analytics'
import { Box } from '@mui/material'
import { BsConeStriped } from "react-icons/bs";
import { PiCourtBasketballLight } from "react-icons/pi";
import { FaBed } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";


const Game = () => {

  return (
    <div className={styles.gameContainer}>
      <Box className={styles.leftContainer}>
        <Phone/>
        <Analytics/>
      </Box>
      <Box className={styles.rightContainer}>
        <div className={styles.topContentContainer}>
          <div className={styles.card}>
            <div className={styles.header}>
              <BsConeStriped className={styles.icon2}/>
              Training
            </div>
            <div className={styles.content}>
              Attend training to improve your skills
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.header}>
              <PiCourtBasketballLight className={styles.icon2}/>
              Matches
            </div>
            <div className={styles.content}>
              Attend training to improve your skills
            </div>
          </div>
        </div>
        <div className={styles.bottomContentContainer}>
          <div className={styles.card}>
            <div className={styles.header}>
              <FaBed className={styles.icon2}/>
              Rest & Recovery
            </div>
            <div className={styles.content}>
              Attend training to improve your skills
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.header}>
              <FaHandshake className={styles.icon2}/>
              Endorsements
            </div>
            <div className={styles.content}>
              Attend training to improve your skills
            </div>
          </div>
        </div>
      </Box>
    </div>
  )
}

export default Game