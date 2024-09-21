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

interface EndorsementNotification {
  id: number;
  milestone?: string;
  type: 'endorsement';
  name: string;
  content: string;
  level: string;
}

type Notification = MessageNotification | InstagramNotification | SpecialNotification | EndorsementNotification;

interface PhoneProps {
  achievements: string[];
  randomMessageInterval: number;
  randomMessageLevel: number;
  gameRestarted: boolean;
  showInactiveModal: boolean;
  selectedEndorsements: string[];
}

const Phone: React.FC<PhoneProps> = ({ achievements, randomMessageInterval, randomMessageLevel, gameRestarted, showInactiveModal, selectedEndorsements }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [displayedAchievements, setDisplayedAchievements] = useState<string[]>([]);
  const notificationsContainerRef = useRef<HTMLDivElement>(null);
  const [currentDateDay, setCurrentDateDay] = useState<string>('');
  const [currentHourMinute, setCurrentHourMinute] = useState<string>('');
  const [randomNotifications, setRandomNotifications] = useState<Notification[]>([]);
  const [specificNotifications, setSpecificNotifications] = useState<Notification[]>([]);
  const [displayedNotificationIds, setDisplayedNotificationIds] = useState<number[]>([]);
  const [countdown, setCountdown] = useState<number>(randomMessageInterval / 1000); // Timer countdown in seconds
  const [previousInterval, setPreviousInterval] = useState<number>(randomMessageInterval);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [endorsementNotifications, setEndorsementNotifications] = useState<Notification[]>([]);

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

    // Fetch selected endorsements notifications
    fetch('/data/endorsementNotifications.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setEndorsementNotifications(data)); // Save them to state
  }, []);

  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;

    const updateCountdown = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(previousInterval - elapsedTime, 0);
      setCountdown(Math.floor(remainingTime / 1000));

      if (remainingTime <= 0) {
        // Reset countdown when it reaches zero
        setStartTime(Date.now());
        setPreviousInterval(randomMessageInterval); // Use new interval only after the current countdown finishes
        triggerRandomNotification(); // Trigger the notification
      }
    };

    // Start the countdown and update it every 100ms to account for milliseconds
    countdownInterval = setInterval(updateCountdown, 100);

    return () => clearInterval(countdownInterval); // Clear interval on component unmount
  }, [startTime, previousInterval, randomMessageInterval]);


  const triggerRandomNotification = () => {
    const availableNotifications = randomNotifications.filter(
      (notification) =>
        parseInt(notification.level) <= randomMessageLevel &&
        !displayedNotificationIds.includes(notification.id)
    );

    if (availableNotifications?.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableNotifications.length);
      const randomNotification = availableNotifications[randomIndex];

      setNotifications((prevNotifications) => [
        { ...randomNotification, id: randomNotification.id }, // Assign unique id to the new notification
        ...prevNotifications,
      ]);

      setDisplayedNotificationIds((prevIds) => [...prevIds, randomNotification.id]);
    }
  };
  

  useEffect(() => { //achievement in json file needs to match name in handleEndorsementSelect
    achievements.forEach(achievementType => {
      if (!displayedAchievements.includes(achievementType)) {
        const matchingNotifications = specificNotifications.filter(notification => notification.milestone === achievementType);
        
        if (matchingNotifications?.length > 0) {
          setNotifications(prevNotifications => [
            ...matchingNotifications.map(notification => ({ ...notification, id: Date.now() })),
            ...prevNotifications
          ]);

          // Save the updated list of displayed achievements to state and localStorage
          const updatedAchievements = [...displayedAchievements, achievementType];
          setDisplayedAchievements(updatedAchievements);
          localStorage.setItem('displayedAchievements', JSON.stringify(updatedAchievements));

          // Update displayed notification IDs to avoid duplicates
          setDisplayedNotificationIds(prevIds => [
            ...prevIds,
            ...matchingNotifications.map(notification => notification.id)
          ]);
        }
      }
    });
  }, [achievements, specificNotifications, displayedAchievements]);

  useEffect(() => {
    if (endorsementNotifications?.length > 0 && selectedEndorsements?.length > 0) {
      const matchingEndorsements = endorsementNotifications.filter(notification =>
        selectedEndorsements.includes(notification.name) && !displayedNotificationIds.includes(notification.id)
      );

      if (matchingEndorsements?.length > 0) {
        setNotifications((prevNotifications) => [
          ...matchingEndorsements.map(notification => ({
            ...notification,
            id: notification.id + Date.now(), // Keep `id` as a number by adding Date.now()
          })),
          ...prevNotifications,
        ]);

        // Avoid showing the same notification again
        setDisplayedNotificationIds((prevIds) => [
          ...prevIds,
          ...matchingEndorsements.map(notification => notification.id),
        ]);
      }
    }
  }, [selectedEndorsements, endorsementNotifications, displayedNotificationIds]);

  useEffect(() => {
    const savedDisplayedAchievements = localStorage.getItem('displayedAchievements');
    if (savedDisplayedAchievements) {
      setDisplayedAchievements(JSON.parse(savedDisplayedAchievements));
    }
  }, []);


  useEffect(() => {
    if (gameRestarted) {
      setNotifications([]); // Clear all notifications
      setDisplayedAchievements([]); // Reset displayed achievements if needed
      localStorage.removeItem('displayedAchievements');
      setDisplayedNotificationIds([]); // Reset notification IDs to avoid duplicate logic
      setRandomNotifications([]);
      setSpecificNotifications([]);

      // Refetch the notifications data after clearing
      fetch('/data/randomNotifications.json', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => setRandomNotifications(data));

      fetch('/data/specificNotifications.json', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => setSpecificNotifications(data));
    }
  }, [gameRestarted]);

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
        {/* <div className={styles.countdown}>
          Next notification in: {countdown}s
        </div> */}
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
            ) : notification.type === 'endorsement' ? (
              <div className={styles.specialNotification}>
                <div className={styles.specialTop}>
                  <span className={styles.specialIcon}>📢</span>
                  NOTICE 
                </div>
                <div className={styles.specialContainer}>
                  <div className={styles.specialContent}>
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
