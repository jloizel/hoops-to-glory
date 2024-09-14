"use client"

import React, { useCallback, useEffect, useRef, useState } from 'react'
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
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import GameOver from '../gameOver/gameOver'


type TrainingType = 'agility' | 'shooting' | 'fitness';

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
  journeyStarted: boolean;
  showInactiveModal: boolean;
  isTabActive: boolean;
}

const Game: React.FC<GameProps> = ({username, usernameSet, handleReset, journeyStarted, showInactiveModal, isTabActive}) => {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameRestarted, setGameRestarted] = useState(false)
  const [isStateLoaded, setIsStateLoaded] = useState(false);


  useEffect(() => {

    let timer: NodeJS.Timeout | undefined;

    if (isStateLoaded && gameStarted && !showInactiveModal && isTabActive && !gameOver) {
      timer = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000); // Increment the elapsed time every second
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isStateLoaded, gameStarted, showInactiveModal, isTabActive, gameOver]);

  useEffect(() => {
      if (isStateLoaded && gameStarted && !showInactiveModal && isTabActive && !gameOver) {
        setElapsedTime(prevTime => prevTime + 1);
      }
  }, [isStateLoaded, gameStarted, showInactiveModal, isTabActive, gameOver]);


  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };



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
    setIsRunning(true)

    setTimeout(() => {
      setSkills(prevSkills => ({
        ...prevSkills,
        [type]: Math.min(prevSkills[type] + 1, 100),
      }));
      setTrainingInProgress(false);
      setIsRunning(false)
    }, trainingDurations[type]);

    if (showRecovery) {
      setEnergyLevel(prevLevel => Math.max(prevLevel - 1, 0));
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
  const [showRecovery, setShowRecovery] = useState(false)
  const initialClickCount = 100
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
  
    // Allow the user to decrement clickCount down to 1 if either isRunning or trainingInProgress is true
    if ((isRunning || trainingInProgress) && clickCount > 1) {
      setClickCount(prevCount => prevCount - 1);
      return;
    }
  
    // Allow reaching 0 and increasing energy level only when both are false
    if (!isRunning && !trainingInProgress) {
      if (clickCount > 1) {
        setClickCount(prevCount => prevCount - 1); // Decrease click count by 1
      } else if (clickCount === 1) {
        setEnergyLevel(prevLevel => prevLevel + 1); // Increase energy level by 1
        setClickCount(initialClickCount); // Reset click count to the initial value
      }
    }
  };

  const toggleAutoClick = () => {
    setAutoClick(prev => !prev);
  };

  useEffect(() => {
    if (energyLevel > 0) {
      setTrainingAvailable(true);
    } else {
      setTrainingAvailable(false);
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
  const [showGames, setShowGames] = useState(false)
  const [gamesPlayed, setGamesPlayed] = useState(0)
  const [isRunning, setIsRunning] = useState(false); // Control whether the match has started
  const [statInterval, setStatInterval] = useState(3000) //initial interval of the stats displayed
  const [gamePlayable, setGamePlayable] = useState(false)

  useEffect(() => {
    if (totalSkillLevel >= 5) {
      setShowGames(true)
    }
  }, [averageSkillLevel])

  useEffect(() => {
    if (energyLevel > 0) {
      setGamePlayable(true);
    } else {
      setGamePlayable(false);
    }
  }, [energyLevel]);


  const handleGameStart = () => {
    setIsRunning(true);
    setGamePlayable(false)

    if (showRecovery) {
      setEnergyLevel(prevLevel => Math.max(prevLevel - 1, 0));
    }
  };

  const handleGameEnd = () => {
    setIsRunning(false);
  };

  const handleGamesPlayedCount = () => {
    setGamesPlayed(prevNumber => prevNumber + 1);
  }

  useEffect(() => {
    if (energyLevel > 0 && !gamePlayable) {
      setGamePlayable(true);
    }
  }, [energyLevel]);
  

  const minutesPerGame = parseFloat(((averageSkillLevel / 100) * 40).toFixed(1));//last number is max average
  const pointsPerGame = parseFloat(((skills.shooting / 100) * 30).toFixed(1));
  const assistsPerGame = parseFloat(((skills.agility / 100) * 15).toFixed(1));
  const reboundsPerGame = parseFloat(((skills.fitness / 100) * 20).toFixed(1));

  const teamRole = () => {
    if (totalSkillLevel < 100) return "Benchwarmer";
    if (totalSkillLevel < 200) return "Role Player";
    if (totalSkillLevel < 300) return "Starter";
    return "Star Player";
  };


  // ENDORSEMENTS
  const [showEndorsements, setShowEndorsements] = useState(false)
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
      case 'reduce_recovery_time_auto':
        reduceInitialClickCount(endorsement.value)
        toggleAutoClick()
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
  const [intervalDuration, setIntervalDuration] = useState(10000);

  useEffect(() => {
    if (gamesPlayed > 0) {
      const baseGrowth = 1;
      const skillMultiplier = (skills.agility + skills.shooting + skills.fitness) / 100; // Adjust the multiplier as needed
      const newGrowthRate = baseGrowth + skillMultiplier;
      setGrowthRate(newGrowthRate);

      const newIntervalDuration = Math.max(1000, 10000 / newGrowthRate);
      setIntervalDuration(newIntervalDuration);
    }
  }, [skills, gamesPlayed]);

  
  useEffect(() => {
    if (!showInactiveModal && gameStarted && isStateLoaded) {
      const interval = setInterval(() => {
        setFollowers(prevFollowers => Math.round(prevFollowers + growthRate));
      }, intervalDuration);   
  
      return () => clearInterval(interval);
    }
  }, [growthRate, intervalDuration, showInactiveModal, gameStarted]);

  
  // PHONE
  const [achievements, setAchievements] = useState<string[]>([]);
  const [randomMessageInterval, setRandomMessageInterval] = useState(300000);
  const [randomMessageLevel, setRandomMessageLevel] = useState(1);

  const baseInterval = 300000;
  const minInterval = 30000;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastCalculatedIntervalRef = useRef<number>(randomMessageInterval);
  const remainingTimeRef = useRef<number>(randomMessageInterval); // Track remaining time separately

  useEffect(() => {
    const calculateNewInterval = () => {
      const skillFactor = totalSkillLevel / 300; // Assuming max total skill level is 300
      const followerFactor = followers / 100000; // Assuming max followers to consider is 10000
      const influenceFactor = skillFactor + followerFactor;
      const newInterval = Math.max(baseInterval * (1 - influenceFactor), minInterval);
      return newInterval;
    };
  
    const newInterval = calculateNewInterval();
    setRandomMessageInterval(newInterval);
    lastCalculatedIntervalRef.current = newInterval; // Store the calculated interval for reference
  }, [totalSkillLevel, followers]);

  
  useEffect(() => {
    // Example: Increase user level based on followers count
    if (gamesPlayed > 0 && followers < 1000) {
      setRandomMessageLevel(2);
    } else if (followers >= 1000 && followers < 10000) {
      setRandomMessageLevel(3);
    } else if (followers >= 10000 && followers < 100000) { 
      setRandomMessageLevel(4);
    }
    // Add more conditions based on other criteria
  }, [followers]);

  // Check for 10 games played milestone
  // useEffect(() => {
  //   if (gamesPlayed === 10) {
  //     const achievement = '10_games_played'; //this needs to match the achievement and the milestone in the corresponding json files
  //     setAchievements(prev => [...prev, achievement]);
  //   }
  // }, [gamesPlayed]);


  //PAGE HEADER
  const [draftRank, setDraftRank] = useState("Undrafted");
  const [pickNumber, setPickNumber] = useState<number | null>(null);

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
      const setPickNumber = Math.max(1, maxPickNumber - Math.floor((draftScore - thresholds.lateFirstRound) * rankScalingFactor));
      newDraftRank = `Pick #${pickNumber}`;
    }

    setDraftRank(newDraftRank);
  }, [skills]);

  useEffect(() => {
    if (pickNumber === 1) {
      setGameOver(true)
    }
  })

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (gameOver) {
      setOpen(true)
    }
  },[])  

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "unset";
  }, [open]);


  //CHECK COMPLETED MILESTONES
  const [triggerIntroMsg1, setTriggerIntroMsg1] = useState(false)
  const [triggerIntroMsg2, setTriggerIntroMsg2] = useState(false)
  const [triggerIntroMsg3, setTriggerIntroMsg3] = useState(false)
  const [triggerIntroMsg4, setTriggerIntroMsg4] = useState(false)
  const [triggerIntroMsg5, setTriggerIntroMsg5] = useState(false)

  const [disableRestart, setDisableRestart] = useState(false)

  useEffect(() => {
    if (journeyStarted) {
      const triggers = [
        setTriggerIntroMsg1,
        setTriggerIntroMsg2,
        setTriggerIntroMsg3,
        setTriggerIntroMsg4,
        setTriggerIntroMsg5,
      ];
  
      triggers.forEach((trigger, index) => {
        setTimeout(() => {
          trigger(true);

          setTimeout(() => {
            trigger(false);

            if (index === triggers.length - 1) {
              setDisableRestart(false);
              setIsStateLoaded(true)
              setGameStarted(true)
            }
          }, 1000); // Reset after 1 second
        }, index * 3000); // 2-second intervals between each trigger
      });
    }
  }, [ journeyStarted ]);


  useEffect(() => {
    const evaluatedTeamRole = teamRole(); // Evaluate the function to get the string value

    milestones.forEach(({ condition, achievement }) => {
      const params = {
        triggerIntroMsg1, triggerIntroMsg2, triggerIntroMsg3, triggerIntroMsg4, triggerIntroMsg5, showRecovery, showGames, showEndorsements, pointsPerGame, followers, gamesPlayed, assistsPerGame, reboundsPerGame, averageSkillLevel, teamRole: evaluatedTeamRole, draftRank,minutesPerGame
      };
      if (condition(params) && !achievements.includes(achievement)) {
        setAchievements(prev => [...prev, achievement]);
      }
    });
  }, [
    gameStarted, showRecovery, showGames, showEndorsements, pointsPerGame, followers, gamesPlayed, assistsPerGame, reboundsPerGame, averageSkillLevel, teamRole, draftRank, minutesPerGame, achievements
  ]);


  useEffect(() => {
    const saveGameState = () => {
      const gameState = {
        gameStarted,
        elapsedTime,
        followers,
        journeyStarted,
        showRecovery,
        showGames,
        showEndorsements,

        skills,
        trainingDurations,
        skillUpgrade,
        
        energyLevel,
        energyStorage,
        clickCount,
        autoClick,

        gamesPlayed,
        statInterval,
        achievements,
      };
      localStorage.setItem('gameState', JSON.stringify(gameState));
    };

    window.addEventListener('beforeunload', saveGameState);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('beforeunload', saveGameState);
    };
  }, [gameStarted, elapsedTime, followers, journeyStarted, showRecovery, showGames, showEndorsements, skills, trainingDurations, skillUpgrade, energyLevel, energyStorage, clickCount, autoClick, gamesPlayed, statInterval, teamRole, achievements ]);

  useEffect(() => {
    const loadGameState = () => {
      const savedGameState = localStorage.getItem('gameState');
      if (savedGameState) {
        const parsedState = JSON.parse(savedGameState);

        setGameStarted(parsedState.gameStarted);
        setElapsedTime(parsedState.elapsedTime || 0);
        setFollowers(parsedState.followers || 0);
        setShowRecovery(parsedState.showRecovery);
        // setShowGames(parsedState.showGames);
        setShowEndorsements(parsedState.showEndorsements);

        setSkills(parsedState.skills || { agility: 0, shooting: 0, fitness: 0 });
        setTrainingDurations(parsedState.trainingDurations || {
          agility: 30000,
          shooting: 30000,
          fitness: 30000
        });
        setSkillUpgrade(parsedState.skillUpgrade || { agility: 1, shooting: 1, fitness: 1 });

        setEnergyLevel(parsedState.energyLevel || 0); 
        setEnergyStorage(parsedState.energyStorage || 0);
        setAutoClick(parsedState.autoClick)

        setGamesPlayed(parsedState.gamesPlayed || 0);
        setStatInterval(parsedState.statInterval)
        setAchievements(parsedState.achievements || []);
        }
        setIsStateLoaded(true);
      };

    loadGameState();
  }, []); // Empty dependency array to run only once on mount
  

  const handleRestartGame = () => {
    setGameRestarted(true)
    setTimeout(() => {
      setGameRestarted(false);
    }, 5000);
    setDisableRestart(true)
    setSkills({ agility: 0, shooting: 0, fitness: 0 });
    setSkillUpgrade({agility: 1, shooting: 1, fitness: 1});
    setTrainingDurations({agility: initialTrainingDuration, shooting: initialTrainingDuration, fitness: initialTrainingDuration})
    setElapsedTime(0);
    setEnergyLevel(0);
    setEnergyStorage(1);
    setClickCount(initialClickCount);
    setAutoClick(false)
    setStatInterval(3000)
    setFollowers(0);
    setGamesPlayed(0);
    setAchievements([]);
    setIsStateLoaded(false)
    localStorage.removeItem('gameState');
    setTrainingInProgress(false)
    setShowRecovery(false);
    // setShowGames(false);
    setShowEndorsements(false);
  };


  return (
    <div className={styles.gameContainer}>
      <div className={styles.topContainer}>
        <PageHeader 
          username={username} 
          usernameSet={usernameSet} 
          handleReset={handleReset} 
          draftRank={draftRank} 
          handleRestartGame={handleRestartGame} 
          disableRestart={disableRestart}
          elapsedTime={formatTime(elapsedTime)}
        />    
      </div>
      <div className={styles.bottomContainer}>
        <Box className={styles.leftContainer}>
          <Phone 
            achievements={achievements}
            randomMessageInterval={randomMessageInterval}
            randomMessageLevel={randomMessageLevel}
            gameRestarted={gameRestarted}
            showInactiveModal={showInactiveModal}
          />
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
              isStateLoaded={isStateLoaded}
              gameStarted={gameStarted}
              isRunning={isRunning}
            />
            {showRecovery &&
            <div className={showRecovery ? styles.flash : ''}>
              <Recovery 
                clickCount={clickCount}
                energyLevel={energyLevel}
                handleClick={handleClick}
                energyStorage={energyStorage}
                autoClick={autoClick}
                isRunning={isRunning}
                trainingInProgress={trainingInProgress}
              />
              </div>
            }       
            {showGames &&
            <div className={showGames ? styles.flash : ''}>
              <Games
                handleGameStart={handleGameStart}
                isRunning={isRunning}
                handleGameEnd={handleGameEnd}
                minutesPerGame={minutesPerGame}
                pointsPerGame={pointsPerGame}
                assistsPerGame={assistsPerGame}
                reboundsPerGame={reboundsPerGame}
                teamRole={teamRole}
                handleGamesPlayedCount={handleGamesPlayedCount}
                gamePlayable={gamePlayable}
                trainingAvailable={trainingAvailable}
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
      <Modal open={open} onClose={() => setOpen(false)}>
        <Fade in={open}>
          <div className={styles.modal}>
            <GameOver 
              username={username} 
              open={open} 
              elapsedTime={formatTime(elapsedTime)} 
              handleClose={handleClose} 
              gameOver={gameOver}/>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default Game