import React, { useEffect, useState, useCallback } from 'react';
import styles from "./page.module.css";
import { PiCourtBasketballLight, PiCourtBasketballThin } from "react-icons/pi";

interface Stat {
  id: number;
  text: string;
}

const Games = ({
  isRunning,
  handleGameStart,
  handleGameEnd,
  handleGamesPlayedCount,
  minutesPerGame,
  pointsPerGame,
  assistsPerGame,
  reboundsPerGame,
  teamRole,
  gamePlayable,
  trainingAvailable,
  trainingInProgress,
  gameOver
}) => {
  const [gameLength, setGameLength] = useState(600000); 
  const [quarterStartTime, setQuarterStartTime] = useState(Date.now()); 
  const [quarter, setQuarter] = useState(1);
  const [stats, setStats] = useState<Stat[]>([]); 
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false); 
  const [updateGameCount, setUpdateGameCount] = useState(false); 

  const handleQuarter = () => {
    setQuarter(prevQuarter => prevQuarter + 1);
  };

  const handleStartGame = () => {
    setGameStarted(true);
    setGameLength(600000); 
    setQuarter(1); 
    setQuarterStartTime(Date.now());
    setGameEnded(false); 
    handleGameStart();
  };

  const handleEndGame = () => {
    setGameStarted(false);
    setGameEnded(true); 
    handleGameEnd();
  };

  const handleResetGame = () => {
    setQuarter(1);
    setGameLength(600000);
    setStats([]); 
    setQuarterStartTime(Date.now()); 
    setGameStarted(false);
    setGameEnded(false); 
    setUpdateGameCount(false); 
  };

  useEffect(() => {
    if (updateGameCount) {
      handleGamesPlayedCount();
      setUpdateGameCount(false)
    }
  })


  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const realQuarterDuration = 5000; 
    const displayQuarterDuration = 600000; 
    const updateInterval = 100; 

    if (gameStarted) {
      interval = setInterval(() => {
        setGameLength((prevGameLength) => {
          const elapsed = Date.now() - quarterStartTime;
          const timeLeft = realQuarterDuration - elapsed;

          if (timeLeft > 0) {
            const displayTimeLeft = Math.max(
              0,
              displayQuarterDuration - ((realQuarterDuration - timeLeft) / realQuarterDuration) * displayQuarterDuration
            );
            return displayTimeLeft;
          } else {
            if (quarter < 4) {
              handleQuarter(); // Move to the next quarter
              setQuarterStartTime(Date.now()); // Reset the quarter start time
              return displayQuarterDuration; // Reset display time to 10 minutes
            } else {
              handleEndGame();
              setUpdateGameCount(true)
              // setTimeout(() => {
              //   setGameCountUpdated(false);
              // }, 0.1);
              return 0; 
            }
          }
        });
      }, updateInterval);
    }

    return () => {
      if (interval) {
        clearInterval(interval); 
      }
    };
  }, [gameStarted, quarter, quarterStartTime, handleQuarter, handleEndGame]);

  const addRandomStat = useCallback(() => {
    const statTypes = ["+2 points", "+3 points", "+1 assist", "+1 rebound"];
    const randomStat = statTypes[Math.floor(Math.random() * statTypes.length)];
    const newStat = { id: Date.now(), text: randomStat };
  
    setStats((prevStats) => [...prevStats, newStat]);
  
    // Remove the stat after 2 seconds for testing
    setTimeout(() => {
      setStats((prevStats) => prevStats.filter((stat) => stat.id !== newStat.id));
    }, 2000); 
  }, []);

  const calculateDynamicInterval = useCallback(() => {
    const baseInterval = 5000; 
    const maxStats = 50 + 15 + 20; // Maximum possible stats
    const currentStats = pointsPerGame + assistsPerGame + reboundsPerGame;

    const dynamicInterval = baseInterval * (1 - currentStats / maxStats);
    return Math.max(dynamicInterval, 2000); 
  }, [pointsPerGame, assistsPerGame, reboundsPerGame]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (gameStarted) {
      const dynamicInterval = calculateDynamicInterval();
      interval = setInterval(addRandomStat, dynamicInterval);
    }
  
    return () => clearInterval(interval);
  }, [gameStarted, calculateDynamicInterval, addRandomStat]);

  // Format the timer into mm:ss
  const formatTimer = () => {
    const minutes = Math.floor((gameLength / 60000) % 60).toString().padStart(2, '0');
    const seconds = Math.floor((gameLength / 1000) % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const setQuarterLabel = () => {
    switch (quarter) {
      case 1:
        return "1st";
      case 2:
        return "2nd";
      case 3:
        return "3rd";
      case 4:
        return "4th";
      default:
        return "";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <PiCourtBasketballLight />
        Games
      </div>
      <div className={styles.content}>
        <div className={styles.topContainer}>
          <div className={styles.gameStatsContainer}>
            {stats.map(stat => (
              <div key={stat.id} className={styles.stat}>{stat.text}</div>
            ))}
          </div>
          <PiCourtBasketballThin className={styles.icon} />
          <div className={styles.timerContainer}>
            <span className={styles.timer}>{formatTimer()}</span>
            <span className={styles.quarter}>{setQuarterLabel()}</span>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <button
            className={styles.button}
            onClick={gameEnded ? handleResetGame : handleStartGame}
            disabled={!gamePlayable || (isRunning && !gameEnded) || !trainingAvailable || trainingInProgress || gameOver} // Only disable if the game is running and not ended
          >
            {gameEnded ? "Play again" : "Play game"}
          </button>
          
          <div className={styles.statsContainer}>
            <div className={styles.stats}>
              <span>Assists/game</span>
              <div>{assistsPerGame}</div>
            </div>
            <div className={styles.stats}>
              <span>Points/game</span>
              <div>{pointsPerGame}</div>
            </div>
            <div className={styles.stats}>
              <span>Rebounds/game</span>
              <div>{reboundsPerGame}</div>
            </div>
            <div className={styles.stats}>
              <span>Minutes/game</span>
              <div>{minutesPerGame}</div>
            </div>
            <div className={styles.role}>
              <span>Team role:</span>
              <div>{teamRole()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;
