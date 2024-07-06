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

type TrainingType = 'agility' | 'shooting' | 'fitness';

const Game = () => {

  // PHONE


  // ANALYTICS


  //TRAINING
  const trainingDuration = 60000;
  const InitialTrainingDuration = 6000
  const [trainingInProgress, setTrainingInProgress] = useState(false);
  const [skills, setSkills] = useState<{ agility: number, shooting: number, fitness: number }>({
    agility: 0,
    shooting: 0,
    fitness: 0,
  });

  const handleTrainingClick = (type: TrainingType) => {
    setTrainingInProgress(true);

    setTimeout(() => {
      setSkills(prevSkills => ({
        ...prevSkills,
        [type]: prevSkills[type] + 1,
      }));
      setTrainingInProgress(false);
    }, trainingDuration); // 60 seconds for training
  };

  const averageSkillLevel = Math.round((skills.agility + skills.shooting + skills.fitness) / 3);

  // RECOVEVERY


  // GAMES

        
  // ENDORSEMENTS



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
            skills={skills}
            handleTrainingClick={handleTrainingClick}
            averageSkillLevel={averageSkillLevel}
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