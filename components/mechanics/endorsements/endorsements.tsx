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

export interface Milestone {
  milestone: string;
  description: string;
}

interface EndorsementsProps {
  achievements: string[];
  onEndorsementSelect: (endorsement: Endorsement) => void;
  completedMilestones: string[]; 
  onMilestoneChange: (milestone: string) => void;
  gameOver: boolean;
}

const Endorsements: React.FC<EndorsementsProps> = ({ achievements, onEndorsementSelect, completedMilestones, onMilestoneChange, gameOver }) => {
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
        setCurrentMilestone(getNextAvailableMilestone(data));
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
    const nextAvailable: Endorsement[] = [];
    const types = new Set<string>();

    const level1Endorsements = endorsements.filter(
      (e) => e.level === 1 && !selectedEndorsements.some((se) => se.id === e.id)
    );
    const level2Endorsements = endorsements.filter(
      (e) => e.level === 2 && !selectedEndorsements.some((se) => se.id === e.id)
    );

    shuffleArray(level1Endorsements);
    shuffleArray(level2Endorsements);

    for (let i = 0; i < 3; i++) {
      const random = Math.random(); // Get a random number between 0 and 1

      if (random < 0.6) {
        // 60% chance to pick from level 1
        if (level1Endorsements.length > 0) {
          const selected = level1Endorsements.shift(); // Get the first item
          if (selected) {
            nextAvailable.push(selected);
            types.add(selected.action); // Ensure unique actions
          }
        }
      } else {
        // 40% chance to pick from level 2
        if (level2Endorsements.length > 0) {
          const selected = level2Endorsements.shift(); // Get the first item
          if (selected) {
            nextAvailable.push(selected);
            types.add(selected.action); // Ensure unique actions
          }
        }
      }
    }

    // If we still need more endorsements to fill up the 3 slots
    while (nextAvailable.length < 3 && level1Endorsements.length > 0) {
      const selected = level1Endorsements.shift();
      if (selected && !types.has(selected.action)) {
        nextAvailable.push(selected);
        types.add(selected.action);
      }
    }

    while (nextAvailable.length < 3 && level2Endorsements.length > 0) {
      const selected = level2Endorsements.shift();
      if (selected && !types.has(selected.action)) {
        nextAvailable.push(selected);
        types.add(selected.action);
      }
    }

    setAvailableEndorsements(nextAvailable.slice(0, 3));
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

    const level1Endorsements = endorsements.filter(
      (e) => e.level === 1 && !types.has(e.action) && !selectedEndorsements.some((se) => se.id === e.id)
    );
    const level2Endorsements = endorsements.filter(
      (e) => e.level === 2 && !types.has(e.action) && !selectedEndorsements.some((se) => se.id === e.id)
    );

    shuffleArray(level1Endorsements);
    shuffleArray(level2Endorsements);

    for (let i = 0; i < 3; i++) {
      const random = Math.random(); // Get a random number between 0 and 1

      if (random < 0.6) {
        // 60% chance to pick from level 1
        if (level1Endorsements.length > 0) {
          const selected = level1Endorsements.shift(); // Get the first item
          if (selected) {
            nextAvailable.push(selected);
            types.add(selected.action); // Ensure unique actions
          }
        }
      } else {
        // 40% chance to pick from level 2
        if (level2Endorsements.length > 0) {
          const selected = level2Endorsements.shift(); // Get the first item
          if (selected) {
            nextAvailable.push(selected);
            types.add(selected.action); // Ensure unique actions
          }
        }
      }
    }

    // If we still need more endorsements to fill up the 3 slots
    while (nextAvailable.length < 3 && level1Endorsements.length > 0) {
      const selected = level1Endorsements.shift();
      if (selected && !types.has(selected.action)) {
        nextAvailable.push(selected);
        types.add(selected.action);
      }
    }

    while (nextAvailable.length < 3 && level2Endorsements.length > 0) {
      const selected = level2Endorsements.shift();
      if (selected && !types.has(selected.action)) {
        nextAvailable.push(selected);
        types.add(selected.action);
      }
    }

    setAvailableEndorsements(nextAvailable.slice(0, 3));

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
              disabled={!isButtonEnabled() || gameOver}
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