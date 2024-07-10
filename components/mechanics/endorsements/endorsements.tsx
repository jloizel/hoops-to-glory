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
  milestone: string;
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
    // Initialize available endorsements
    if (endorsements.length > 0) {
      const initialAvailableEndorsements = endorsements.slice(0, 3);
      setAvailableEndorsements(initialAvailableEndorsements);
    }
  }, [endorsements]);

  const handleEndorsementSelect = (endorsement: Endorsement) => {
    onEndorsementSelect(endorsement);
    setSelectedEndorsements([...selectedEndorsements, endorsement]);

    const nextEndorsementIndex = selectedEndorsements.length + 3;
    if (nextEndorsementIndex < endorsements.length) {
      const newAvailableEndorsements = availableEndorsements.map(e =>
        e.id === endorsement.id ? endorsements[nextEndorsementIndex] : e
      );
      setAvailableEndorsements(newAvailableEndorsements);
    } else {
      const newAvailableEndorsements = availableEndorsements.filter(e => e.id !== endorsement.id);
      setAvailableEndorsements(newAvailableEndorsements);
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
