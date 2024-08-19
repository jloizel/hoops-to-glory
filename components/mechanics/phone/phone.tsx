import React, { useEffect, useRef, useState } from 'react';
import { MdMessage } from 'react-icons/md';
import { RiInstagramFill } from "react-icons/ri";
import styles from './page.module.css';

interface MessageNotification {
  id: number;
  milestone?: string;
  type: 'message';
  name: string;
  content: string;
  level: string;
}

interface InstagramNotification {
  id: number;
  milestone?: string;
  type: 'instagram';
  name: string;
  content: string;
  level: string;
  verified?: boolean
}

interface SpecialNotification {
  id: number;
  milestone?: string;
  type: 'special';
  name: string;
  content: string;
  level: string;
}

type Notification = MessageNotification | InstagramNotification | SpecialNotification;

interface PhoneProps {
  achievements: string[];
  randomMessageInterval: number;
  randomMessageLevel: number;
}

const Phone: React.FC<PhoneProps> = ({ achievements, randomMessageInterval, randomMessageLevel }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [displayedAchievements, setDisplayedAchievements] = useState<string[]>([]);
  const notificationsContainerRef = useRef<HTMLDivElement>(null);
  const [currentDateDay, setCurrentDateDay] = useState<string>('');
  const [currentHourMinute, setCurrentHourMinute] = useState<string>('');
  const [randomNotifications, setRandomNotifications] = useState<Notification[]>([]);
  const [specificNotifications, setSpecificNotifications] = useState<Notification[]>([]);
  const [displayedNotificationIds, setDisplayedNotificationIds] = useState<number[]>([]);

  useEffect(() => {
    // Fetch random notifications
    fetch('/data/randomNotifications.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setRandomNotifications(data));

    // Fetch specific notifications
    fetch('/data/specificNotifications.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setSpecificNotifications(data));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const availableNotifications = randomNotifications.filter(
        notification => parseInt(notification.level) <= randomMessageLevel && !displayedNotificationIds.includes(notification.id)
      );
      if (availableNotifications.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableNotifications.length);
        const randomNotification = availableNotifications[randomIndex];
        setNotifications(prevNotifications => [
          { ...randomNotification, id: Date.now() },
          ...prevNotifications
        ]);
        setDisplayedNotificationIds(prevIds => [...prevIds, randomNotification.id]);
      }
    }, randomMessageInterval);

    return () => clearInterval(interval);
  }, [randomNotifications, randomMessageLevel, randomMessageInterval, displayedNotificationIds]);

  useEffect(() => { //achievement in json file needs to match name in handleEndorsementSelect
    achievements.forEach(achievementType => {
      if (!displayedAchievements.includes(achievementType)) {
        const matchingNotifications = specificNotifications.filter(notification => notification.milestone === achievementType);
        
        if (matchingNotifications.length > 0) {
          setNotifications(prevNotifications => [
            ...matchingNotifications.map(notification => ({ ...notification, id: Date.now() })),
            ...prevNotifications
          ]);

          setDisplayedAchievements(prev => [...prev, achievementType]);
          setDisplayedNotificationIds(prevIds => [
            ...prevIds,
            ...matchingNotifications.map(notification => notification.id)
          ]);
        }
      }
    });
  }, [achievements, specificNotifications, displayedAchievements]);

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
          <div
            key={notification.id}
            className={`${styles.notification} ${index === 0 ? styles.notificationPopIn : styles.notificationSlideDown}`}
          >
            {notification.type === 'message' ? (
              <div className={styles.messageNotification}>
                <div className={styles.messageTop}>
                  <MdMessage className={styles.messageIcon} />
                  MESSAGES
                </div>
                <div className={styles.messageContainer}>
                  <div className={styles.contact}>{notification.name}</div>
                  <div className={styles.message}>{notification.content}</div>
                </div>
              </div>
            ) : notification.type === 'instagram' ? (
              <div className={styles.instagramNotification}>
                <div className={styles.instagramTop}>
                  <img src="/images/instagram.png" className={styles.instagramIcon}/>
                  INSTAGRAM
                </div>
                <div className={styles.instagramContainer}>
                  <div className={styles.instaUser}>
                    <span className={styles.username}>{notification.name}</span>
                    {notification.verified && (
                      <img src="/images/verified.png" className={styles.verifiedIcon}/>
                    )}
                  </div>
                  <div className={styles.action}>{notification.content}</div>
                </div>
              </div>
            ) : notification.type === 'special' ? (
              <div className={styles.specialNotification}>
                <div className={styles.specialTop}>
                  <span className={styles.specialIcon}>📢</span>
                  NOTICE 
                </div>
                <div className={styles.specialContainer}>
                  <div className={styles.specialContent}>
                    <div className={styles.specialName}>{notification.name}</div>
                    <div className={styles.specialMessage}>{notification.content}</div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Phone;
