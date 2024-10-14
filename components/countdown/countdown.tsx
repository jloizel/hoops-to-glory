import React, { useEffect, useState } from 'react';
import styles from './page.module.css'; // Import your CSS module
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { MdTimer } from "react-icons/md";
import { RiTimerLine } from "react-icons/ri";
import { IoTimer } from "react-icons/io5";


interface CountdownProps {
  trainingInProgress: boolean
  trainingDuration: number
}

const Countdown: React.FC<CountdownProps> = ({trainingInProgress, trainingDuration}) => {
  const [isPlaying, setIsPlaying] = useState(false); // State to track if the timer is playing
  const [key, setKey] = useState(0);

  const trainingDurationinSec = trainingDuration/1000-0.5


  useEffect(() => {
    if (!trainingInProgress) {
      // If trainingInProgress becomes false, stop the timer and reset it
      setIsPlaying(false);
      setKey((prevKey) => prevKey + 1); // Reset the timer by changing the key
    } else {
      // When trainingInProgress is true, start the timer
      setIsPlaying(true);
    }
  }, [trainingInProgress]);


  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

  return (
    <div className={styles.timerContainer}>
      <CountdownCircleTimer
        key={key}
        isPlaying={isPlaying}
        duration={trainingDurationinSec} // Duration in seconds
        // colors={['#0067b1', '#297f9a', '#19548e', '#0a2b82']}
        // colorsTime={[trainingDurationinSec, 5, 3, 0]}
        colors={['#ED174F', '#ED174F']}
        colorsTime={[trainingDurationinSec, 0]}
        size={120} 
        trailStrokeWidth={3}
        strokeWidth={6} 
        isSmoothColorTransition={true}
        onComplete={() => {
          setIsPlaying(false); // Set isPlaying to false when countdown completes
          setKey(prevKey => prevKey + 1); // Reset key to force reset on next start
        }}
      >
        {({ remainingTime }) => (
          <>
            {isPlaying ? (
              <div className={styles.timerText}>
                {formatTime(remainingTime)}
              </div>
            ) : (
              <div className={styles.timerText}>
                {/* {formatTime(trainingDurationinSec+0.5)} */}
                <MdTimer className={styles.icon}/>
              </div>
            )}
          </>
        )}
      </CountdownCircleTimer>
      {/* <button onClick={toggleTimer} className={styles.button}>
        {isPlaying ? 'Pause Timer' : 'Start Timer'}
      </button> */}
    </div>
  );
};

export default Countdown;
