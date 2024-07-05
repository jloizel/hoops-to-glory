"use client"

import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import Phone from '../mechanics/phone/phone'
import Analytics from '../mechanics/analytics/analytics'
import { Box } from '@mui/material'
import Training from '../mechanics/training/training'
import Games from '../mechanics/games/games'
import Recovery from '../mechanics/recovery/recovery'
import Endorsements from '../mechanics/endorsements/endorsements'


const Game = () => {
  const trainingDuration = 60000;
  const [trainingInProgress, setTrainingInProgress] = useState(false);
  const [skills, setSkills] = useState<{ agility: number, shooting: number, fitness: number }>({
    agility: 0,
    shooting: 0,
    fitness: 0,
  });

  return (
    <div className={styles.gameContainer}>
      <Box className={styles.leftContainer}>
        <Phone/>
      </Box>
      <Box className={styles.rightContainer}>
        <div className={styles.topContentContainer}>
          <Analytics/>
        </div>
        <div className={styles.middleContentContainer}>
        <Training
            trainingDuration={trainingDuration}
            trainingInProgress={trainingInProgress}
            setTrainingInProgress={setTrainingInProgress}
            skills={skills}
            setSkills={setSkills}
          />
          <Recovery/>
          <Games/>
          <Endorsements/>
        </div>
      </Box>
    </div>
  )
}

export default Game