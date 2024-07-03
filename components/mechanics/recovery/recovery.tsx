import React, { useRef, useState } from 'react';
import styles from './page.module.css';
import { FaBed } from 'react-icons/fa';
import { FaHeartCircleBolt } from "react-icons/fa6";
import { GiBottledBolt } from "react-icons/gi";
import { PiCursorClickLight } from "react-icons/pi";
import { PiMouseLeftClickLight } from "react-icons/pi";
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';

const Recovery = () => {
  const [clickCount, setClickCount] = useState(10); // Initial click count set to 200
  const [energyLevel, setEnergyLevel] = useState(0); // Initial energy level set to 0

  const handleClick = () => {
    if (clickCount > 0) {
      setClickCount(prevCount => prevCount - 1); // Decrease click count by 1 on each click
    } else if (clickCount === 0) {
      setEnergyLevel(prevLevel => prevLevel + 5); // Increase energy level by 5
      setClickCount(10); // Reset click count to 200
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FaBed />
        Recovery
      </div>
      <div className={styles.content}>
        <div className={styles.heartbeatContainer}>
          <FaHeartCircleBolt onClick={handleClick} className={styles.icon} />
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
              <BatteryChargingFullIcon className={energyLevel > 0 ? styles.bottleBoltActive : styles.bottleBolt} />
              <BatteryChargingFullIcon className={energyLevel > 0 ? styles.bottleBoltActive : styles.bottleBolt} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
