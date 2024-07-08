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
import PageHeader from '../pageHeader/pageHeader'

type TrainingType = 'agility' | 'shooting' | 'fitness';

interface Stat {
  id: number;
  text: string;
}

interface GameProps {
  username: string
  usernameSet: boolean;
  handleReset: () => void;
}

const Game: React.FC<GameProps> = ({username, usernameSet, handleReset}) => {

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
  const [skillUpgrade, setSkillUpgrade] = useState<{ agility: number, shooting: number, fitness: number }>({
    agility: 1,
    shooting: 1,
    fitness: 1,
  });
  const [trainingAvailable, setTrainingAvailable] = useState(true)

  const handleTrainingClick = (type: TrainingType) => {
    setTrainingInProgress(true);
    setTrainingAvailable(false)

    setTimeout(() => {
      setSkills(prevSkills => ({
        ...prevSkills,
        [type]: prevSkills[type] + 1,
      }));
      setTrainingInProgress(false);
    }, trainingDuration); // 60 seconds for training
    
    if (showRecovery) {
      setEnergyLevel(prevLevel => prevLevel - 1);
    }
  };

  const averageSkillLevel = Math.round((skills.agility + skills.shooting + skills.fitness) / 3);
  const totalSkillLevel = skills.agility + skills.shooting + skills.fitness;


  const handleAgilityUpgrade = (value: number) => {
    setSkillUpgrade(prevUpgrade => ({
      ...prevUpgrade,
      agility: value,
    }));
  };

  const handleShootingUpgrade = (value: number) => {
    setSkillUpgrade(prevUpgrade => ({
      ...prevUpgrade,
      shooting: value,
    }));
  };

  const handleFitnessUpgrade = (value: number) => {
    setSkillUpgrade(prevUpgrade => ({
      ...prevUpgrade,
      fitness: value,
    }));
  };



  // RECOVERY
  const [showRecovery, setShowRecovery] = useState(false)
  const initialClickCount = 10
  const [clickCount, setClickCount] = useState(initialClickCount); // Initial click count set to 200
  const [energyLevel, setEnergyLevel] = useState(0); // Initial energy level set to 0
  const [energyStorage, setEnergyStorage] = useState(1)

  useEffect(() => {
    if (skills.agility > 0 || skills.shooting > 0 || skills.fitness > 0) {
      setShowRecovery(true);
    }
  }, [skills]);

  const handleClick = () => {
    if (energyLevel >= energyStorage) {
      return; // Prevent click if energy level matches or exceeds energy storage
    }
    if (clickCount > 0) {
      setClickCount(prevCount => prevCount - 1); // Decrease click count by 1 on each click
    } else if (clickCount === 0 && clickCount < 5) {
      setEnergyLevel(prevLevel => prevLevel + 1); // Increase energy level by 5
      setClickCount(initialClickCount); // Reset click count to 200
    }
  };

  useEffect(() => {
    if (energyLevel > 0 && !trainingAvailable) {
      setTrainingAvailable(true);
    }
  }, [energyLevel]);
  


  // GAMES
  const [showGames, setShowGames] = useState(false)
  const [gamesPlayed, setGamesPlayed] = useState(0)
  const [gameLength, setGameLength] = useState(60000); // Timer starts at 10 minutes (600000 milliseconds)
  const [quarter, setQuarter] = useState(1);
  const [stats, setStats] = useState<Stat[]>([]); // Use the Stat type for the state
  const [isRunning, setIsRunning] = useState(false); // Control whether the match has started
  const [statInterval, setStatInterval] = useState(3000) //initial interval of the stats displayed
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    if (totalSkillLevel >= 5) {
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

  const handleQuarter = () => {
    setQuarter(prevQuarter => prevQuarter + 1/2);
  }


  const handleStart = () => {
    setIsRunning(true);
    setGameLength(600000); // Reset timer to 10 minutes
    setQuarter(1); // Reset quarter to 1
    
  };

  const handleGameEnd = () => {
    setIsRunning(false);
    setGameEnded(true)
  };

  const handleResetGame = () => {
    setQuarter(1)
    setGameLength(600000);
    setGameEnded(false);
    setStats([]); // Clear stats
    setIsRunning(false);
  }

        
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
      <div className={styles.topContainer}>
        <PageHeader username={username} usernameSet={usernameSet} handleReset={handleReset}/>    
      </div>
      <div className={styles.bottomContainer}>
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
              skillUpgrade={skillUpgrade}
              trainingAvailable={trainingAvailable}
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
            {/* {showGames && */}
            <div className={showGames ? styles.flash : ''}>
              <Games
                stats={stats}
                statInterval={statInterval}
                addRandomStat={addRandomStat}
                handleStart={handleStart}
                isRunning={isRunning}
                handleGameEnd={handleGameEnd}
                gameEnded={gameEnded}
                handleResetGame={handleResetGame}
                quarter={quarter}
                handleQuarter={handleQuarter}
              />
            </div>
            {/* }      */}
            {showEndorsements &&
              <Endorsements
                money={money}
              />
            }
          </div>
        </Box>
      </div>
    </div>
  )
}

export default Game