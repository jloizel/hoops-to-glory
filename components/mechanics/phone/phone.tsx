import React, { useEffect, useRef, useState } from 'react';
import { MdMessage } from 'react-icons/md';
import styles from './page.module.css';

interface MessageNotification {
  id: number;
  achievement?: string;
  type: 'message';
  contact: string;
  content: string;
}

interface InstagramNotification {
  id: number;
  achievement?: string;
  type: 'instagram';
  username: string;
  content: string;
}

type Notification = MessageNotification | InstagramNotification;

interface PhoneProps {
  achievements: string[];
}

const Phone: React.FC<PhoneProps> = ({ achievements }) => {
  const [randomNotifications, setRandomNotifications] = useState<Notification[]>([]);
  const [specificNotifications, setSpecificNotifications] = useState<Notification[]>([]);
  const [currentDateDay, setCurrentDateDay] = useState<string>('');
  const [currentHourMinute, setCurrentHourMinute] = useState<string>('');
  const notificationsContainerRef = useRef<HTMLDivElement>(null);

  // Effect to fetch random and specific notifications
  useEffect(() => {
    fetch('/data/randomNotifications.json')
      .then(response => response.json())
      .then(data => setRandomNotifications(data));

    fetch('/data/specificNotifications.json')
      .then(response => response.json())
      .then(data => setSpecificNotifications(data));
  }, []);

  // Effect to update date and time
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentHourMinute(`${hours}:${minutes}`);

      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      };
      const formattedDateDay = now.toLocaleDateString('en-UK', options);
      setCurrentDateDay(formattedDateDay);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Scroll to top when notifications change
  useEffect(() => {
    if (notificationsContainerRef.current) {
      notificationsContainerRef.current.scrollTop = 0;
    }
  }, [randomNotifications, specificNotifications]);

  // Effect to handle specific notifications based on achievements
  useEffect(() => {
    achievements.forEach(achievement => {
      specificNotifications.forEach(notification => {
        if (notification.achievement === achievement) {
          setRandomNotifications(prevNotifications => [
            ...prevNotifications,
            { ...notification, id: Date.now() }
          ]);
        }
      });
    });
  }, [achievements, specificNotifications]);

  // Effect to add random notifications every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (randomNotifications.length > 0) {
        const randomIndex = Math.floor(Math.random() * randomNotifications.length);
        const randomNotification = randomNotifications[randomIndex];
        setRandomNotifications(prevNotifications => [
          ...prevNotifications.filter(notif => notif.type !== randomNotification.type), // Remove existing random notifications of the same type
          { ...randomNotification, id: Date.now() }
        ]);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [randomNotifications]);

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
        {[...randomNotifications, ...specificNotifications].map(notification => (
          <div key={notification.id} className={styles.notification}>
            {notification.type === 'message' ? (
              <div className={styles.messageNotification}>
                <div className={styles.messageTop}>
                  <MdMessage className={styles.messageIcon} />
                  MESSAGES
                </div>
                <div className={styles.messageContainer}>
                  <div className={styles.contact}>{notification.contact}</div>
                  <div className={styles.message}>{notification.content}</div>
                </div>
              </div>
            ) : (
              <div className={styles.instagramNotification}>
                <div className={styles.instagramTop}>
                  <img src="/path/to/instagram/icon.png" alt="Instagram" className={styles.instagramIcon} />
                  INSTAGRAM
                </div>
                <div className={styles.instagramContainer}>
                  <div className={styles.username}>{notification.username}</div>
                  <div className={styles.action}>{notification.content}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Phone;
