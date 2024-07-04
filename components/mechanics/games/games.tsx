"use client"

import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import { PiCourtBasketballLight, PiCourtBasketballThin } from "react-icons/pi";

interface Stat {
  id: number;
  text: string;
}

const Games = () => {
  const [timer, setTimer] = useState(600000); // Timer starts at 10 minutes (600000 milliseconds)
  const [quarter, setQuarter] = useState(1);
  const [stats, setStats] = useState<Stat[]>([]); // Use the Stat type for the state
  const [isRunning, setIsRunning] = useState(false); // Control whether the match has started

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

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const quarterDuration = 20000; // 20 seconds
    const timeDecreaseInterval = 100; // 100 milliseconds
    const decreaseAmount = (600000 / quarterDuration) * timeDecreaseInterval; // Decrease timer amount per interval

    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
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
    let statInterval: NodeJS.Timeout;
    if (isRunning) {
      statInterval = setInterval(addRandomStat, 3000); // Add random stat every 3 seconds
    }
    return () => clearInterval(statInterval);
  }, [isRunning]);

  // Format the timer into mm:ss:msms
  const formatTimer = () => {
    const minutes = Math.floor((timer / 60000) % 60).toString().padStart(2, '0');
    const seconds = Math.floor((timer / 1000) % 60).toString().padStart(2, '0');
    const milliseconds = Math.floor((timer % 10000) / 100).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };


  const handleStart = () => {
    setIsRunning(true);
    setTimer(600000); // Reset timer to 10 minutes
    setQuarter(1); // Reset quarter to 1
    setStats([]); // Clear stats
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
