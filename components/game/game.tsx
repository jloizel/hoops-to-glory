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

interface Stat {
  id: number;
  text: string;
}

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
  const [gameLength, setGameLength] = useState(600000); // Timer starts at 10 minutes (600000 milliseconds)
  const [quarter, setQuarter] = useState(1);
  const [stats, setStats] = useState<Stat[]>([]); // Use the Stat type for the state
  const [isRunning, setIsRunning] = useState(false); // Control whether the match has started
  const [statInterval, setStatInterval] = useState(3000) //initial interval of the stats displayed

  useEffect(() => {
    if (averageSkillLevel >= 10) {
      setShowGames(true)
    }
  }, [averageSkillLevel])

  const addRandomStat = () => {
    const statTypes = ["+2 points", "+3 points", "+1 assist", "+1 rebound"];
    const randomStat = statTypes[Math.floor(Math.random() * statTypes.length)];
    const newStat = { id: Date.now(), text: randomStat };

    setStats(prevStats => [...prevStats, newStat]);

    // Remove the stat after 3 seconds
    setTimeout(() => {
      setStats(prevStats => prevStats.filter(stat => stat.id !== newStat.id));
    }, 3000);
  };

  const handleStart = () => {
    setIsRunning(true);
    setGameLength(600000); // Reset timer to 10 minutes
    setQuarter(1); // Reset quarter to 1
    setStats([]); // Clear stats
  };


        
  // ENDORSEMENTS
  const [showEndorsements, setShowEndorsements] = useState(false)
  const [money, setMoney] = useState(100)

  useEffect(() => {
    if (gamesPlayed >= 5) {
      setShowEndorsements(true)
    }
  }, [gamesPlayed])



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
            <Games
              stats={stats}
              statInterval={statInterval}
              addRandomStat={addRandomStat}
              handleStart={handleStart}
            />
          }     
          {showEndorsements &&
            <Endorsements
              money={money}
            />
          }
        </div>
      </Box>
    </div>
  )
}

export default Game