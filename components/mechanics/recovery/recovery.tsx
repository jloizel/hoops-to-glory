import React, { useRef, useState } from 'react';
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
}

const Recovery: React.FC<RecoveryProps> = ({clickCount, energyLevel, handleClick, energyStorage}) => {

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FaHeartCircleBolt />
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
              {Array.from({ length: energyStorage }).map((_, index) => (
                <BatteryChargingFullIcon
                  key={index}
                  className={energyLevel > 0 ? styles.bottleBoltActive : styles.bottleBolt}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
