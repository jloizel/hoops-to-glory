"use"

import React, { useEffect, useRef, useState } from 'react'
import styles from "./page.module.css"
import phoneBackground from '../../public/background2.jpg';

const Phone = () => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const notificationsContainerRef = useRef<HTMLDivElement>(null);
  const [currentDateDay, setCurrentDateDay] = useState<string>('');
  const [currentHourMinute, setCurrentHourMinute] = useState<string>('');
  const [data, setData] = useState([
    {
      id: "",
      title: "",
      text: ""
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications((prev) => [`New notification ${prev.length + 1}`, ...prev]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Function to update date and time
    const updateDateTime = () => {
      const now = new Date();

      // Format hours and minutes
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentHourMinute(`${hours}:${minutes}`);

      // Format date and day
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      };
      const formattedDateDay = now.toLocaleDateString('en-UK', options);
      setCurrentDateDay(formattedDateDay);
    };

    // Update date and time initially
    updateDateTime();

    // Update date and time every second
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (notificationsContainerRef.current) {
      notificationsContainerRef.current.scrollTop = 0;
    }
  }, [notifications]);


  return (
    <div className={styles.iphoneOutline}>
      <div className={styles.notch}></div>
      <div className={styles.speaker}></div>
      <div className={styles.camera}></div>
      <div className={styles.dateTime}>
        <p>{currentDateDay}</p>
        <p>{currentHourMinute}</p>
      </div>
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