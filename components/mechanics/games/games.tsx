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
  teamRole
}) => {
  const [gameLength, setGameLength] = useState(600000); // 10 minutes for display
  const [quarterStartTime, setQuarterStartTime] = useState(Date.now()); 
  const [quarter, setQuarter] = useState(1);
  const [stats, setStats] = useState<Stat[]>([]); // Use the Stat type for the state
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false); // Track when the game ends
  const [updateGameCount, setUpdateGameCount] = useState(false); // Track if gamesPlayed was updated for this game


  const handleQuarter = () => {
    setQuarter(prevQuarter => prevQuarter + 1);
  };

  const handleStartGame = () => {
    setGameStarted(true);
    setGameLength(600000); // Reset timer to 10 minutes
    setQuarter(1); // Reset quarter to 1
    setQuarterStartTime(Date.now());
    setGameEnded(false); // Reset the gameEnded state
  };

  const handleEndGame = () => {
    setGameStarted(false);
    setGameEnded(true); // Mark the game as ended
  };

  const handleResetGame = () => {
    setQuarter(1);
    setGameLength(600000);
    setStats([]); // Clear stats
    setQuarterStartTime(Date.now()); // Reset quarter start time
    setGameStarted(false); // Ensure game is not started yet
    setGameEnded(false); // Reset the gameEnded state
    setUpdateGameCount(false); // Reset the update flag
  };

  useEffect(() => {
    if (gameStarted) {
      handleGameStart();
    } else if (gameEnded) {
      handleGameEnd();
    }
  }, [gameStarted, gameEnded, handleGameStart, handleGameEnd]);

  useEffect(() => {
    if (updateGameCount) {
      handleGamesPlayedCount();
      setUpdateGameCount(false)
    }
  })


  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const realQuarterDuration = 5000; // 5 seconds real-time
    const displayQuarterDuration = 600000; // 10 minutes in milliseconds
    const updateInterval = 100; // 100 milliseconds for updating the display

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
        clearInterval(interval); // Clear interval on unmount or re-render
      }
    };
  }, [gameStarted, quarter, quarterStartTime, handleQuarter, handleEndGame]);

  useEffect(() => {
    console.log("Updated stats:", stats);
  }, [stats]);

  const addRandomStat = () => {
    const statTypes = ["+2 points", "+3 points", "+1 assist", "+1 rebound"];
    const randomStat = statTypes[Math.floor(Math.random() * statTypes.length)];
    const newStat = { id: Date.now(), text: randomStat };

    setStats(prevStats => [...prevStats, newStat]);

    // Remove the stat after 3 seconds
    setTimeout(() => {
      setStats(prevStats => prevStats.filter(stat => stat.id !== newStat.id));
    }, 1000);
  };

  const calculateDynamicInterval = useCallback(() => {
    const baseInterval = 5000; // 5000 ms
    const maxStats = 50 + 15 + 20; // Maximum possible stats
    const currentStats = pointsPerGame + assistsPerGame + reboundsPerGame;

    const dynamicInterval = baseInterval * (1 - currentStats / maxStats);
    return Math.max(dynamicInterval, 500); // Minimum interval of 500 ms
  }, [pointsPerGame, assistsPerGame, reboundsPerGame]);


  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
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
            disabled={isRunning && !gameEnded} // Only disable if the game is running and not ended
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
