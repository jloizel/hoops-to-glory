"use client"

import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import { PiCourtBasketballLight, PiCourtBasketballThin } from "react-icons/pi";

const Games = () => {
  const [timer, setTimer] = useState(600000); // Timer starts at 10 minutes (600000 milliseconds)
  const [quarter, setQuarter] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer - 500); // Decrease timer by 500 milliseconds (adjust as needed for speed)
    }, 50); // Runs every 50 milliseconds (adjust as needed for speed)

    // Change quarter logic after 20 seconds (20000 milliseconds) except for the 4th quarter
    if (quarter < 4) {
      setTimeout(() => {
        setQuarter(prevQuarter => prevQuarter + 1);
        setTimer(600000); // Reset timer to 10 minutes for the next quarter
      }, 20000); // 20 seconds for each quarter (adjust as needed for speed)
    }

    // Stop timer at 0 when it's the 4th quarter
    if (quarter === 4 && timer <= 0) {
      clearInterval(interval);
      setTimer(0);
    }

    return () => clearInterval(interval);
  }, [quarter, timer]);

  // Format the timer into mm:ss:msms
  const formatTimer = () => {
    const minutes = Math.floor((timer / 60000) % 60).toString().padStart(2, '0');
    const seconds = Math.floor((timer / 1000) % 60).toString().padStart(2, '0');
    const milliseconds = Math.floor((timer % 1000) / 10).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <PiCourtBasketballLight />
        Games
      </div>
      <div className={styles.content}>
        <div className={styles.topContainer}>
          <PiCourtBasketballThin className={styles.icon} />
          <span className={styles.timer}>{formatTimer()}</span>
          <span className={styles.quarter}>Quarter: {quarter}</span>
        </div>
      </div>
    </div>
  );
}

export default Games;
