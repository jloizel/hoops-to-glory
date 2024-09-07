import React, { useEffect, useState, useCallback } from 'react'
import styles from "./page.module.css"
import { PiCourtBasketballLight, PiCourtBasketballThin } from "react-icons/pi";

const Games = ({
  stats,
  statInterval,
  addRandomStat,
  handleStart,
  isRunning,
  handleGameEnd,
  gameEnded,
  handleResetGame,
  quarter,
  handleQuarter,
  minutesPerGame,
  pointsPerGame,
  assistsPerGame,
  reboundsPerGame,
  teamRole
}) => {
  const [gameLength, setGameLength] = useState(600000); // 10 minutes for display
  const [quarterStartTime, setQuarterStartTime] = useState(Date.now()); // Time when quarter starts

  // Memoizing handleQuarter to avoid recreating the function on every render
  const memoizedHandleQuarter = useCallback(() => {
    handleQuarter();
  }, [handleQuarter]);

  // Memoizing handleGameEnd
  const memoizedHandleGameEnd = useCallback(() => {
    handleGameEnd();
  }, [handleGameEnd]);

  useEffect(() => {
    let interval;
    const realQuarterDuration = 5000; // 5 seconds real-time
    const displayQuarterDuration = 600000; // 10 minutes in milliseconds
    const updateInterval = 100; // 100 milliseconds for updating the display
  
    if (isRunning) {
      interval = window.setInterval(() => {
        setGameLength(prevGameLength => {
          const elapsed = Date.now() - quarterStartTime;
          const timeLeft = realQuarterDuration - elapsed;

          if (timeLeft > 0) {
            const displayTimeLeft = Math.max(
              0,
              displayQuarterDuration - ((realQuarterDuration - timeLeft) / realQuarterDuration) * displayQuarterDuration
            );
            return displayTimeLeft;
          } else {
            clearInterval(interval); // Clear current interval
            if (quarter < 4) {
              memoizedHandleQuarter(); // Move to the next quarter
              setQuarterStartTime(Date.now()); // Reset the quarter start time
              return displayQuarterDuration; // Reset display time to 10 minutes
            } else {
              memoizedHandleGameEnd();
              return 0; // End game
            }
          }
        });
      }, updateInterval);
    }

    return () => {
      if (interval) {
        clearInterval(interval); // Clear interval on unmount or re-render
      }
    };
  }, [isRunning, quarter, quarterStartTime, memoizedHandleQuarter, memoizedHandleGameEnd]);

  const calculateDynamicInterval = () => {
    const baseInterval = 5000; // 5000 ms
    const maxStats = 50 + 15 + 20; // Maximum possible stats
    const currentStats = pointsPerGame + assistsPerGame + reboundsPerGame;

    const dynamicInterval = baseInterval * (1 - currentStats / maxStats);
    return Math.max(dynamicInterval, 500); // Minimum interval of 500 ms
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      const dynamicInterval = calculateDynamicInterval();
      interval = setInterval(addRandomStat, dynamicInterval); // Add random stat based on dynamic interval
    }

    return () => clearInterval(interval); // Clear interval when component unmounts or re-renders
  }, [isRunning, pointsPerGame, assistsPerGame, reboundsPerGame, addRandomStat]);

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

  const resetGame = () => {
    handleResetGame();
    setGameLength(600000); // Reset display time to 10 minutes
    setQuarterStartTime(Date.now()); // Reset quarter start time
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
          {!gameEnded ? (
            <button className={styles.button} onClick={handleStart} disabled={isRunning}>
              Play game
            </button>
          ) : (
            <button className={styles.button} onClick={resetGame} disabled={isRunning}>
              Play again
            </button>
          )}
          
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
}

export default Games;
