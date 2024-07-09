import React, { useEffect, useRef, useState } from 'react';
import { MdMessage } from 'react-icons/md';
import styles from './page.module.css';

interface MessageNotification {
  id: number;
  achievement: string; // Ensure achievement is always present for specific notifications
  type: 'message';
  contact: string;
  content: string;
}

interface InstagramNotification {
  id: number;
  achievement: string; // Ensure achievement is always present for specific notifications
  type: 'instagram';
  username: string;
  content: string;
}

type Notification = MessageNotification | InstagramNotification;

interface PhoneProps {
  achievements: string[]; // Array of achieved milestones or events
  onAchievementReached: (achievement: string) => void; // Function to call when an achievement is reached
}

const Phone: React.FC<PhoneProps> = ({ achievements, onAchievementReached }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const notificationsContainerRef = useRef<HTMLDivElement>(null);
  const [currentDateDay, setCurrentDateDay] = useState<string>('');
  const [currentHourMinute, setCurrentHourMinute] = useState<string>('');
  const [randomNotifications, setRandomNotifications] = useState<Notification[]>([]);
  const [specificNotifications, setSpecificNotifications] = useState<Notification[]>([
    // Example initial state of specific notifications
    { id: 1, achievement: 'gamesPlayed10', type: 'message', contact: 'Coach', content: 'Well done on reaching 10 games played!' },
    { id: 2, achievement: 'youtubeViews1000', type: 'instagram', username: 'Lebron', content: 'Mentioned you in his story!' },
  ]);

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

    // This useEffect is for demonstration purposes only; replace with actual fetch calls for your data
  }, []);

  useEffect(() => {
    // Function to update date and time
    const updateDateTime = () => {
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

  useEffect(() => {
    // Add random notifications every 30 seconds
    const interval = setInterval(() => {
      if (randomNotifications.length > 0) {
        const randomIndex = Math.floor(Math.random() * randomNotifications.length);
        const randomNotification = randomNotifications[randomIndex];
        setNotifications(prevNotifications => [
          { ...randomNotification, id: Date.now() },
          ...prevNotifications
        ]);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [randomNotifications]);

  useEffect(() => {
    // Trigger specific notifications when achievements are reached
    achievements.forEach(achievementType => {
      const matchingNotifications = specificNotifications.filter(notification => notification.achievement === achievementType);
      if (matchingNotifications.length > 0) {
        setNotifications(prevNotifications => [
          ...matchingNotifications.map(notification => ({ ...notification, id: Date.now() })),
          ...prevNotifications
        ]);
        // Assuming `onAchievementReached` updates the achievements state when called
        onAchievementReached(achievementType);
      }
    });
  }, [achievements, specificNotifications, onAchievementReached]);

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
        {notifications.map(notification => (
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
