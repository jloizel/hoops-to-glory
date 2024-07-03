import React, { useEffect, useRef, useState } from 'react';
import { MdMessage } from 'react-icons/md';
import styles from './page.module.css';

const Phone = () => {
  const [notifications, setNotifications] = useState<any[]>([]); // Array to store notifications
  const notificationsContainerRef = useRef<HTMLDivElement>(null);
  const [currentDateDay, setCurrentDateDay] = useState<string>('');
  const [currentHourMinute, setCurrentHourMinute] = useState<string>('');
  const [data, setData] = useState<any[]>([]); // Array to store data from API

  useEffect(() => {
    // Fetch data from API
    fetch('/data/randomMessages.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(myJson => {
        setData(myJson); // Set fetched data to state
      });
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < data.length) {
        const randomMessage = data[index];
        setNotifications(prevNotifications => [randomMessage, ...prevNotifications]); // Add new notification
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1000); // Add notifications every 1 second

    return () => clearInterval(interval);
  }, [data]);

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
    // Scroll to top when notifications change
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
      <div className={styles.notificationsContainer} ref={notificationsContainerRef} id="notifications-container">
        {notifications.map((notification, index) => (
          <div key={notification.id} className={styles.notification}>
            <div className={styles.messageTop}>
              <MdMessage className={styles.messageIcon}/>
              MESSAGES
            </div>
            <div className={styles.messageContainer}>
              <div className={styles.contact}>{notification.contact}</div>
              <div className={styles.message}>{notification.message}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Phone;
