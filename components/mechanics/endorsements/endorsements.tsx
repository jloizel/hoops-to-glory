import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { FaHandshake } from 'react-icons/fa';
import { PiPiggyBankLight } from 'react-icons/pi';

interface Endorsement {
  id: number;
  name: string;
  description: string;
  action: string;
  value: number;
  level: number;
}

interface Milestone {
  milestone: string;
  description: string;
}

interface EndorsementsProps {
  money: number;
  achievements: string[];
  onEndorsementSelect: (endorsement: Endorsement) => void;
}

const Endorsements: React.FC<EndorsementsProps> = ({ money, achievements, onEndorsementSelect }) => {
  const [endorsements, setEndorsements] = useState<Endorsement[]>([]);
  const [availableEndorsements, setAvailableEndorsements] = useState<Endorsement[]>([]);
  const [selectedEndorsements, setSelectedEndorsements] = useState<Endorsement[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [currentMilestone, setCurrentMilestone] = useState<Milestone | null>(null);
  const [currentLevel, setCurrentLevel] = useState<number>(1);

  useEffect(() => {
    // Fetch endorsements
    fetch('/data/endorsements.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setEndorsements(data));
  }, []);

  useEffect(() => {
    // Fetch milestones
    fetch('/data/milestones.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setMilestones(data);
        setCurrentMilestone(data[0]); // Set the first milestone as the current milestone
      });
  }, []);

  useEffect(() => {
    if (endorsements.length > 0) {
      initializeAvailableEndorsements();
    }
  }, [endorsements, currentLevel]);

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const initializeAvailableEndorsements = () => {
    let initialAvailable: Endorsement[] = [];
    const types = new Set<string>();

    const currentLevelEndorsements = endorsements.filter(e => e.level === currentLevel && !types.has(e.action));
    shuffleArray(currentLevelEndorsements);

    initialAvailable.push(...currentLevelEndorsements.slice(0, 3));
    currentLevelEndorsements.slice(0, 3).forEach(e => types.add(e.action));

    if (initialAvailable.length < 3) {
      const nextLevelEndorsements = endorsements.filter(e => e.level === currentLevel + 1 && !types.has(e.action));
      shuffleArray(nextLevelEndorsements);
      initialAvailable.push(...nextLevelEndorsements.slice(0, 3 - initialAvailable.length));
    }

    setAvailableEndorsements(initialAvailable);
  };

  const handleEndorsementSelect = (endorsement: Endorsement) => {
    onEndorsementSelect(endorsement);
    setSelectedEndorsements([...selectedEndorsements, endorsement]);

    const types = new Set<string>(selectedEndorsements.map(e => e.action));
    const nextAvailable: Endorsement[] = [];

    const currentLevelEndorsements = endorsements.filter(
      e => e.level === currentLevel && !types.has(e.action)
    );
    shuffleArray(currentLevelEndorsements);

    nextAvailable.push(...currentLevelEndorsements.slice(0, 3));
    currentLevelEndorsements.slice(0, 3).forEach(e => types.add(e.action));

    if (nextAvailable.length < 3) {
      const nextLevelEndorsements = endorsements.filter(e => e.level === currentLevel + 1 && !types.has(e.action));
      shuffleArray(nextLevelEndorsements);
      nextAvailable.push(...nextLevelEndorsements.slice(0, 3 - nextAvailable.length));
    }

    setAvailableEndorsements(nextAvailable.slice(0, 3));

    if (nextAvailable.length === 0) {
      setCurrentLevel(currentLevel + 1);
    }

    // Update the current milestone to the next one
    const nextMilestoneIndex = milestones.findIndex(m => m.milestone === currentMilestone?.milestone) + 1;
    setCurrentMilestone(milestones[nextMilestoneIndex] || null);
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const isButtonEnabled = () => {
    return currentMilestone ? achievements.includes(currentMilestone.milestone) : false;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FaHandshake />
        Endorsements
      </div>
      <div className={styles.content}>
        <div className={styles.requirement}>
          <div>Next endorsement unlocked at:</div>
          <span>{currentMilestone?.description}</span>
        </div>
        <div className={styles.bottomContainer}>
          {availableEndorsements.map(endorsement => (
            <button
              key={endorsement.id}
              className={styles.button}
              onClick={() => handleEndorsementSelect(endorsement)}
              disabled={!isButtonEnabled()}
            >
              {endorsement.description}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Endorsements;
