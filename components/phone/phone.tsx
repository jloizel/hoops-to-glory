"use"

import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"

const Phone = () => {
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications((prev) => [...prev, `New notification ${prev.length + 1}`]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.iphoneOutline}>
      <div className={styles.notch}></div>
      <div className={styles.speaker}></div>
      <div className={styles.camera}></div>
      <div className={styles.notificationsContainer} id="notifications-container">
        {notifications.map((notification, index) => (
          <div key={index} className={styles.notification}>
            {notification}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Phone