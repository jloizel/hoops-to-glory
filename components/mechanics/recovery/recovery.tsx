import React, { useRef, useState } from 'react';
import styles from './page.module.css';
import { FaBed } from 'react-icons/fa';
import { PiHeartbeatLight } from "react-icons/pi";
import { PiHeartbeatThin } from "react-icons/pi";

const Recovery = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [clickCount, setClickCount] = useState(200); // Initial click count set to 200

  const handleClick = () => {
    if (clickCount > 0) {
      setClickCount(prevCount => prevCount - 1); // Decrease click count by 1 on each click
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FaBed/>
        Recovery
      </div>
      <div className={styles.content}>
        <div className={styles.hearbeatContainer}>
          <PiHeartbeatLight onClick={handleClick} className={styles.icon}/>
          <span className={styles.clickCount}>{clickCount}</span> 
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.energy}>
            <span>Energy level:</span>
            <div>10 </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
