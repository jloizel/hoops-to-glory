"use client"

import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import { PiCourtBasketballLight, PiCourtBasketballThin } from "react-icons/pi";

interface Stat {
  id: number;
  text: string;
}

interface GamesProps {
  stats: Stat[];
  statInterval: number;
  addRandomStat: () => void
  handleStart: () => void;
  isRunning: boolean;
  handleGameEnd: () => void
  gameEnded: boolean;
  handleResetGame: () => void;
  quarter: number;
  handleQuarter: () => void
  minutesPerGame: number;
  pointsPerGame: number;
  assistsPerGame: number;
  reboundsPerGame: number;
  teamRole: () => string;
}

const Games: React.FC<GamesProps> = ({stats, statInterval, addRandomStat, handleStart, isRunning, handleGameEnd, gameEnded, handleResetGame, quarter, handleQuarter, minutesPerGame, pointsPerGame, assistsPerGame, reboundsPerGame, teamRole}) => {
  const [gameLength, setGameLength] = useState(600000);
  
  // const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const quarterDuration = 10000; // 20 seconds
    const timeDecreaseInterval = 100; // 100 milliseconds
    const decreaseAmount = (600000 / quarterDuration) * timeDecreaseInterval; // Decrease timer amount per interval

    if (isRunning) {
      interval = setInterval(() => {
        setGameLength(prevTimer => {
          if (prevTimer > 0) {
            return prevTimer - decreaseAmount; // Decrease timer by interval
          } else {
            clearInterval(interval);
            if (quarter < 4) {
              handleQuarter(); // Increment quarter
              return 600000; // Reset timer to 10 minutes for the next quarter
            } else {
              handleGameEnd()
              // setIsRunning(false);
              return 0; // Stop timer at 0 in the 4th quarter
            }
          }
        });
      }, timeDecreaseInterval);
    }

    return () => clearInterval(interval);
  }, [isRunning, quarter]);

  const calculateDynamicInterval = () => {
    const baseInterval = 5000; // 5000 ms
    const maxStats = 50 + 15 + 20; // Maximum possible stats
    const currentStats = pointsPerGame + assistsPerGame + reboundsPerGame;

    const dynamicInterval = baseInterval * (1 - currentStats / maxStats);
    return Math.max(dynamicInterval, 500); // Minimum interval of 500 ms
  };

  // Add stats periodically only if the timer is running
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      const dynamicInterval = calculateDynamicInterval();
      interval = setInterval(addRandomStat, dynamicInterval); // Add random stat based on dynamic interval
    }
    return () => clearInterval(interval);
  }, [isRunning, pointsPerGame, assistsPerGame, reboundsPerGame]);

  // Format the timer into mm:ss:msms
  const formatTimer = () => {
    const minutes = Math.floor((gameLength / 60000) % 60).toString().padStart(2, '0');
    const seconds = Math.floor((gameLength / 1000) % 60).toString().padStart(2, '0');
    const milliseconds = Math.floor((gameLength % 10000) / 100).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const setQuarter = () => {
    if (quarter === 1) {
      return "1st"
    } else if (quarter === 2) {
      return "2nd"
    } else if (quarter === 3) {
      return "3rd"
    } else {
      return "4th"
    }
  }

  const resetGame = () => {
    handleResetGame()
    setGameLength(600000)
  }

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
            <span className={styles.quarter}>{setQuarter()}</span>
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
