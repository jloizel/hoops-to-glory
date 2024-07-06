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
  const trainingDuration = 6000;
  const InitialTrainingDuration = 90000;
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


  // RECOVERY
  const [showRecovery, setShowRecovery] = useState(false)
  const [clickCount, setClickCount] = useState(10); // Initial click count set to 200
  const [energyLevel, setEnergyLevel] = useState(0); // Initial energy level set to 0
  const [energyStorage, setEnergyStorage] = useState(4)

  useEffect(() => {
    if (skills.agility > 0 || skills.shooting > 0 || skills.fitness > 0) {
      setShowRecovery(true);
    }
  }, [skills]);

  const handleClick = () => {
    if (clickCount > 0) {
      setClickCount(prevCount => prevCount - 1); // Decrease click count by 1 on each click
    } else if (clickCount === 0) {
      setEnergyLevel(prevLevel => prevLevel + 5); // Increase energy level by 5
      setClickCount(10); // Reset click count to 200
    }
  };
  

  // GAMES
  const [showGames, setShowGames] = useState(false)
  const [gamesPlayed, setGamesPlayed] = useState(0)

  useEffect(() => {
    if (averageSkillLevel >= 10) {
      setShowGames(true)
    }
  }, [averageSkillLevel])


        
  // ENDORSEMENTS
  const [showEndorsements, setShowEndorsements] = useState(false)



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
          {showRecovery &&
          <div className={showRecovery ? styles.flash : ''}>
            <Recovery 
              clickCount={clickCount}
              energyLevel={energyLevel}
              handleClick={handleClick}
              energyStorage={energyStorage}
            />
            </div>
          }       
          {showGames &&
            <Games/>
          }     
          {showEndorsements &&
            <Endorsements/>
          }
        </div>
      </Box>
    </div>
  )
}

export default Game