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
  achievements: string[];
  onEndorsementSelect: (endorsement: Endorsement) => void;
  completedMilestones: string[]; 
  onMilestoneChange: (milestone: string) => void;
}

const Endorsements: React.FC<EndorsementsProps> = ({ achievements, onEndorsementSelect, completedMilestones, onMilestoneChange }) => {
  const [endorsements, setEndorsements] = useState<Endorsement[]>([]);
  const [availableEndorsements, setAvailableEndorsements] = useState<Endorsement[]>([]);
  const [selectedEndorsements, setSelectedEndorsements] = useState<Endorsement[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [currentMilestone, setCurrentMilestone] = useState<Milestone | null>(null);
  const [currentLevel, setCurrentLevel] = useState<number>(1);

  const FIRST_MILESTONE = { milestone: '5 games played', description: 'Play 5 games to unlock endorsements' };

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
        // Prepend "5 games played" milestone, then shuffle remaining milestones
        const otherMilestones = data.filter((m: Milestone) => m.milestone !== '5 games played');
        const shuffledMilestones = shuffleArray(otherMilestones);

        // Combine "5 games played" as the first milestone followed by others
        const combinedMilestones = [FIRST_MILESTONE, ...shuffledMilestones];

        setMilestones(combinedMilestones);
        setCurrentMilestone(getNextAvailableMilestone(combinedMilestones));
      });
  }, [completedMilestones]); 

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

  const getNextAvailableMilestone = (milestones: Milestone[]): Milestone | null => {
    return milestones.find(m => !completedMilestones.includes(m.milestone)) || null;
  };

  const handleEndorsementSelect = (endorsement: Endorsement) => {
    onEndorsementSelect(endorsement);
    setSelectedEndorsements([...selectedEndorsements, endorsement]);

    // Notify parent that the current milestone is completed
    if (currentMilestone) {
      onMilestoneChange(currentMilestone.milestone);
    }

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
    const nextMilestone = getNextAvailableMilestone(milestones);
    setCurrentMilestone(nextMilestone);
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