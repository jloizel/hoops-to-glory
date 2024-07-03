"use client"

import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import Phone from '../../components/phone/phone'
import Analytics from '../mechanics/analytics/analytics'
import { Box } from '@mui/material'
import Training from '../mechanics/training/training'
import Games from '../mechanics/games/games'
import Recovery from '../mechanics/recovery/recovery'
import Endorsements from '../mechanics/endorsements/endorsements'


const Game = () => {

  return (
    <div className={styles.gameContainer}>
      <Box className={styles.leftContainer}>
        <Phone/>
        {/* <Analytics/> */}
      </Box>
      <Box className={styles.rightContainer}>
        <div className={styles.topContentContainer}>
          <Analytics/>
        </div>
        <div className={styles.middleContentContainer}>
          <Training/>
          <Recovery/>
        </div>
        <div className={styles.bottomContentContainer}>
          <Games/>
          <Endorsements/>
        </div>
      </Box>
    </div>
  )
}

export default Game