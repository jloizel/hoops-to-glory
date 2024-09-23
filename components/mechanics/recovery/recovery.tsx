import React, { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import { FaBed } from 'react-icons/fa';
import { FaHeartCircleBolt } from "react-icons/fa6";
import { GiBottledBolt } from "react-icons/gi";
import { PiCursorClickLight } from "react-icons/pi";
import { PiMouseLeftClickLight } from "react-icons/pi";
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';

interface RecoveryProps {
  clickCount: number;
  energyLevel: number;
  handleClick: () => void
  energyStorage: number;
  autoClick: boolean;
  isRunning: boolean;
  trainingInProgress: boolean;
  clickDisabled: boolean;
  autoClickInterval: number;
}

const Recovery: React.FC<RecoveryProps> = ({clickCount, energyLevel, handleClick, energyStorage, autoClick, isRunning, trainingInProgress, clickDisabled, autoClickInterval}) => {
  const [displayStorage2, setDisplayStorage2] = useState(false)
  const [displayStorage3, setDisplayStorage3] = useState(false)
  const [displayStorage4, setDisplayStorage4] = useState(false)
  const [isClickHeld, setIsClickHeld] = useState(false);
  const [clickIntervalId, setClickIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (energyLevel > energyStorage) {
      handleEnergyChange(energyStorage); // Cap energy level to storage limit
    }
  }, [energyLevel, energyStorage]);

  console.log(autoClickInterval)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (autoClick) {
      interval = setInterval(() => {
        handleClick();
      }, autoClickInterval);
    }

    return () => {
      if (interval) clearInterval(interval); // Cleanup to prevent multiple intervals
    };
  }, [autoClickInterval]);
  

  useEffect(() => {
    if (energyStorage > 1) {
      setDisplayStorage2(true);
    } else {
      setDisplayStorage2(false);
    }
    
    if (energyStorage > 2) {
      setDisplayStorage3(true);
    } else {
      setDisplayStorage3(false);
    }

    if (energyStorage > 3) {
      setDisplayStorage4(true);
    } else {
      setDisplayStorage4(false);
    }
  }, [energyStorage]);

  const handleEnergyChange = (newEnergyLevel: number) => {
    // Prevent energy level from going below 1
    if (newEnergyLevel >= 1 && newEnergyLevel <= energyStorage) {
      handleClick(); // Increment click count
    }
  };

  const handleMouseDown = () => {
    setIsClickHeld(true);
    const intervalId = setInterval(() => {
      handleClick(); // Call handleClick at 200ms intervals
    }, 100);
    setClickIntervalId(intervalId);
  };

  const handleMouseUp = () => {
    setIsClickHeld(false);
    if (clickIntervalId) {
      clearInterval(clickIntervalId); // Clear interval on mouse up
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FaHeartCircleBolt />
        Recovery
      </div>
      <div className={styles.content}>
        <div className={styles.heartbeatContainer}>
          <FaHeartCircleBolt 
            onClick={handleClick} 
            className={`${styles.icon} ${clickCount === 1 && (trainingInProgress || isRunning) || clickDisabled ? styles.iconRunning : ''}`} 
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          />
          <div className={styles.clickerContainer}>
            <span className={styles.clickCount}>{clickCount}</span>
            <PiMouseLeftClickLight className={styles.clickIcon}/>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.energyLevel}>
            <span>Energy level</span>
            <div>{energyLevel}</div>
          </div>
          <div className={styles.energyStorageContainer}>
            <span>Energy storage</span>
            <div className={styles.energyStorage}>
              {/* {Array.from({ length: energyStorage }).map((_, index) => (
                <BatteryChargingFullIcon
                  key={index}
                  className={energyLevel > 0 ? styles.bottleBoltActive : styles.bottleBolt}
                />
              ))} */}
              <BatteryChargingFullIcon
                className={energyLevel > 0 ? styles.bottleBoltActive : styles.bottleBolt}
              />
              {displayStorage2 && (
                <BatteryChargingFullIcon
                  className={energyLevel > 1 ? styles.bottleBoltActive : styles.bottleBolt}
                />
              )}
              {displayStorage3 && (
                <BatteryChargingFullIcon
                  className={energyLevel > 2 ? styles.bottleBoltActive : styles.bottleBolt}
                />
              )}
              {displayStorage4 && (
                <BatteryChargingFullIcon
                  className={energyLevel > 3 ? styles.bottleBoltActive : styles.bottleBolt}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
