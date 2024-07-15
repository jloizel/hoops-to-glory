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
import PageHeader from '../mechanics/pageHeader/pageHeader'
import milestones from './milestones'

type TrainingType = 'agility' | 'shooting' | 'fitness';

interface Stat {
  id: number;
  text: string;
}

interface Endorsement {
  id: number;
  name: string;
  description: string;
  action: string;
  value: number;
  // milestone: string;
}

interface GameProps {
  username: string
  usernameSet: boolean;
  handleReset: () => void;
}

const Game: React.FC<GameProps> = ({username, usernameSet, handleReset}) => {


  //TRAINING
  const initialTrainingDuration = 30000;
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
  const [selectedTrainingType, setSelectedTrainingType] = useState<TrainingType>('agility');
  const [trainingDurations, setTrainingDurations] = useState({
    agility: initialTrainingDuration,
    shooting: initialTrainingDuration,
    fitness: initialTrainingDuration
  });

  // const trainingDurations = {
  //   agility: initialTrainingDuration * Math.pow(0.95, skills.agility),
  //   shooting: initialTrainingDuration * Math.pow(0.95, skills.shooting),
  //   fitness: initialTrainingDuration * Math.pow(0.95, skills.fitness)
  // };

  const handleTrainingClick = (type: TrainingType) => {
    setSelectedTrainingType(type);
    setTrainingInProgress(true);
    setTrainingAvailable(false);

    setTimeout(() => {
      setSkills(prevSkills => ({
        ...prevSkills,
        [type]: Math.min(prevSkills[type] + 1, 100),
      }));
      setTrainingInProgress(false);
    }, trainingDurations[type]);

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

  const reduceTrainingTime = (type: TrainingType, percentage: number) => {
    setTrainingDurations(prevDurations => ({
      ...prevDurations,
      // [type]: prevDurations[type] * (1 - percentage / 100)
      [type]: Math.max(prevDurations[type] - percentage)
    }));
  };



  // RECOVERY
  const [showRecovery, setShowRecovery] = useState(true)
  const initialClickCount = 200
  const [clickCount, setClickCount] = useState(initialClickCount); // Initial click count set to 200
  const [energyLevel, setEnergyLevel] = useState(0); // Initial energy level set to 0
  const [energyStorage, setEnergyStorage] = useState(1)
  const [autoClick, setAutoClick] = useState(false);

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

  const toggleAutoClick = () => {
    setAutoClick(prev => !prev);
  };

  useEffect(() => {
    if (energyLevel > 0 && !trainingAvailable) {
      setTrainingAvailable(true);
    }
  }, [energyLevel]);
  
  const reduceInitialClickCount = (value: number) => {
    setClickCount(prevCount => Math.max(0, prevCount - value));
    // setClickCount(initialClickCount * (1 - value / 100));
  };

  const increaseEnergyStorage = () => {
    setEnergyStorage(prevEnergyStorage => prevEnergyStorage + 1);
  };


  // GAMES
  const [showGames, setShowGames] = useState(true)
  const [gamesPlayed, setGamesPlayed] = useState(10)
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
    }, 300);
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

  const minutesPerGame = (averageSkillLevel / 100) * 40; //last number is max average
  const pointsPerGame = (skills.shooting / 100) * 50;
  // const pointsPerGame = 11;
  const assistsPerGame = (skills.agility / 100) * 15;
  const reboundsPerGame = (skills.fitness / 100) * 20;

  const teamRole = () => {
    if (totalSkillLevel < 100) return "Benchwarmer";
    if (totalSkillLevel < 200) return "Role Player";
    if (totalSkillLevel < 300) return "Starter";
    return "Star Player";
  };

        
  // ENDORSEMENTS
  const [showEndorsements, setShowEndorsements] = useState(true)
  const [money, setMoney] = useState(100)

  useEffect(() => {
    if (gamesPlayed >= 5) {
      setShowEndorsements(true)
    }
  }, [gamesPlayed])

  const handleEndorsementSelect = (endorsement: Endorsement) => { //this needs to match the "action" in the endorsement json file
    switch (endorsement.action) {
      case 'increase_agility_training_increment':
        handleAgilityUpgrade(endorsement.value);
        break;
      case 'increase_shooting_training_increment':
        handleShootingUpgrade(endorsement.value);
        break;
      case 'increase_fitness_training_increment':
        handleFitnessUpgrade(endorsement.value);
        break;
      case 'reduce_agility_training_time':
        reduceTrainingTime('agility', endorsement.value);
        break;
      case 'reduce_shooting_training_time':
        reduceTrainingTime('shooting', endorsement.value);
        break;
      case 'reduce_fitness_training_time':
        reduceTrainingTime('fitness', endorsement.value);
        break;
      case 'reduce_recovery_time':
        reduceInitialClickCount(endorsement.value)
        break;
      case 'increase_energy_storage':
        increaseEnergyStorage()         
        break;
      default:  
        break;
    }
  }

  // const milestones = [
  //   { condition: gamesPlayed === 10, achievement: '10_games_played' },
  //   // Add other milestones here
  //   // { condition: totalSkillLevel >= 100, achievement: 'total_skill_100' },
  //   // { condition: skills.shooting >= 50, achievement: 'shooting_50' },
  // ];

   // Check for milestones
   



  // ANALYTICS
  const [followers, setFollowers] = useState(0);
  const [growthRate, setGrowthRate] = useState(1);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setFollowers(prevFollowers => prevFollowers + growthRate); // Increment followers by growth rate
    }, 1000); // Adjust the interval as needed

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [growthRate]);

  useEffect(() => {
    if (gamesPlayed > 0) {
      const baseGrowth = 1;
      const skillMultiplier = (skills.agility + skills.shooting + skills.fitness) / 100; // Adjust the multiplier as needed
      const newGrowthRate = baseGrowth + skillMultiplier;
      setGrowthRate(newGrowthRate);
    }
  }, [skills, gamesPlayed]);




  // PHONE
  const [achievements, setAchievements] = useState<string[]>([]);

  // Check for 10 games played milestone
  // useEffect(() => {
  //   if (gamesPlayed === 10) {
  //     const achievement = '10_games_played'; //this needs to match the achievement and the milestone in the corresponding json files
  //     setAchievements(prev => [...prev, achievement]);
  //   }
  // }, [gamesPlayed]);


  // Simulate milestones for demonstration purposes
  useEffect(() => {
    const interval = setInterval(() => {
      setGamesPlayed(prev => prev + 1);
    }, 1000); // Increment values every second

    return () => clearInterval(interval);
  }, []);
  


  //PAGE HEADER
  const [draftRank, setDraftRank] = useState("Undrafted");

  useEffect(() => {
    const weights = {
      agility: 0.3,
      shooting: 0.4,
      fitness: 0.3,
    };

    const draftScore = weights.agility * skills.agility + weights.shooting * skills.shooting + weights.fitness * skills.fitness;

    const thresholds = {
      undrafted: 50,
      lateSecondRound: 100,
      earlySecondRound: 150,
      lateFirstRound: 200,
    };

    let newDraftRank;
    if (draftScore < thresholds.undrafted) {
      newDraftRank = "Undrafted";
    } else if (draftScore < thresholds.lateSecondRound) {
      newDraftRank = "Late Second Round Pick";
    } else if (draftScore < thresholds.earlySecondRound) {
      newDraftRank = "Early Second Round Pick";
    } else if (draftScore < thresholds.lateFirstRound) {
      newDraftRank = "Late First Round Pick";
    } else {
      const maxPickNumber = 30; // Assuming 30 picks in the first round
      const rankScalingFactor = 0.1;
      const pickNumber = Math.max(1, maxPickNumber - Math.floor((draftScore - thresholds.lateFirstRound) * rankScalingFactor));
      newDraftRank = `Pick #${pickNumber}`;
    }

    setDraftRank(newDraftRank);
  }, [skills]);

  

  //CHECK COMPLETED MILESTONES
  useEffect(() => {
    const evaluatedTeamRole = teamRole(); // Evaluate the function to get the string value

    milestones.forEach(({ condition, achievement }) => {
      const params = {
        pointsPerGame, followers, gamesPlayed, assistsPerGame, reboundsPerGame, averageSkillLevel, teamRole: evaluatedTeamRole, draftRank,minutesPerGame
      };
      if (condition(params) && !achievements.includes(achievement)) {
        setAchievements(prev => [...prev, achievement]);
      }
    });
  }, [
    pointsPerGame, followers, gamesPlayed, assistsPerGame, reboundsPerGame, averageSkillLevel, teamRole, draftRank, minutesPerGame, achievements
  ]);


  return (
    <div className={styles.gameContainer}>
      <div className={styles.topContainer}>
        <PageHeader username={username} usernameSet={usernameSet} handleReset={handleReset} draftRank={draftRank}/>    
      </div>
      <div className={styles.bottomContainer}>
        <Box className={styles.leftContainer}>
          <Phone achievements={achievements}/>
          <div className={styles.topContentContainer}>
            <Analytics followers={followers}/>
          </div>
        </Box>
        <Box className={styles.rightContainer}>
          <div className={styles.middleContentContainer}>
            <Training
              selectedTrainingType={selectedTrainingType}
              trainingDurations={trainingDurations}
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
                autoClick={autoClick}
              />
              </div>
            }       
            {showGames &&
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
                minutesPerGame={minutesPerGame}
                pointsPerGame={pointsPerGame}
                assistsPerGame={assistsPerGame}
                reboundsPerGame={reboundsPerGame}
                teamRole={teamRole}
              />
            </div>
            }
            {showEndorsements &&
              <Endorsements
                money={money}
                achievements={achievements}
                onEndorsementSelect={handleEndorsementSelect}
              />
            }
          </div>
        </Box>
      </div>
    </div>
  )
}

export default Game