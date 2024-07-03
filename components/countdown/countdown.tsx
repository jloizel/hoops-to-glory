import React, { useEffect, useState } from 'react';
import styles from './page.module.css'; // Import your CSS module
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

interface CountdownProps {
  trainingInProgress: boolean
  trainingDuration: number
}

const Countdown: React.FC<CountdownProps> = ({trainingInProgress, trainingDuration}) => {
  const [isPlaying, setIsPlaying] = useState(false); // State to track if the timer is playing
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Update isPlaying state based on timerStarted prop from parent
    setIsPlaying(trainingInProgress);
}, [trainingInProgress]);

  // Function to handle starting or stopping the timer
  const toggleTimer = () => {
      setIsPlaying(prevIsPlaying => !prevIsPlaying); // Toggle the state
      setKey(prevKey => prevKey + 1);
  };

  const trainingDurationinSec = trainingDuration/1000-0.5

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
        colors={['#ED174F', '#bd113f']}
        colorsTime={[trainingDurationinSec, 0]}
        size={120} // Size of the circle
        trailStrokeWidth={3}
        strokeWidth={6} // Width of the stroke
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
                {formatTime(trainingDurationinSec+0.5)}
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
