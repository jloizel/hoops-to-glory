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
  handleStart: () => void
}

const Games: React.FC<GamesProps> = ({stats, statInterval, addRandomStat, handleStart}) => {
  const [gameLength, setGameLength] = useState(600000);
  const [quarter, setQuarter] = useState(1);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const quarterDuration = 20000; // 20 seconds
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
              setQuarter(prevQuarter => prevQuarter + 1/2); // Increment quarter
              return 600000; // Reset timer to 10 minutes for the next quarter
            } else {
              setIsRunning(false); // Stop the match after the 4th quarter
              return 0; // Stop timer at 0 in the 4th quarter
            }
          }
        });
      }, timeDecreaseInterval);
    }

    return () => clearInterval(interval);
  }, [isRunning, quarter]);

  // Add stats periodically only if the timer is running
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(addRandomStat, statInterval); // Add random stat every 3 seconds
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Format the timer into mm:ss:msms
  const formatTimer = () => {
    const minutes = Math.floor((gameLength / 60000) % 60).toString().padStart(2, '0');
    const seconds = Math.floor((gameLength / 1000) % 60).toString().padStart(2, '0');
    const milliseconds = Math.floor((gameLength % 10000) / 100).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleQuarter = () => {
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <PiCourtBasketballLight />
        Games
      </div>
      <div className={styles.content}>
        <div className={styles.topContainer}>
          <div className={styles.statsContainer}>
            {stats.map(stat => (
              <div key={stat.id} className={styles.stat}>{stat.text}</div>
            ))}
          </div>
          <PiCourtBasketballThin className={styles.icon} />
          <div className={styles.timerContainer}>
            <span className={styles.timer}>{formatTimer()}</span>
            <span className={styles.quarter}>{handleQuarter()}</span>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <button className={styles.button} onClick={handleStart} disabled={isRunning}>
            Play game
          </button>
          <div className={styles.statsContainer}>
            <div className={styles.stats}>
              <span>Minutes/game</span>
              <div>0</div>
            </div>
            <div className={styles.stats}>
              <span>Points/game</span>
              <div>0</div>
            </div>
            <div className={styles.stats}>
              <span>Assists/game</span>
              <div>0</div>
            </div>
            <div className={styles.stats}>
              <span>Rebounds/game</span>
              <div>0</div>
            </div>
            <div className={styles.role}>
              <span>Team role:</span>
              <div>Benchwarmer</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Games;
