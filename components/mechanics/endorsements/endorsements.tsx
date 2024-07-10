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

interface EndorsementsProps {
  money: number;
  achievements: string[];
  onEndorsementSelect: (endorsement: Endorsement) => void;
}

const Endorsements: React.FC<EndorsementsProps> = ({ money, achievements, onEndorsementSelect }) => {
  const [endorsements, setEndorsements] = useState<Endorsement[]>([]);
  const [availableEndorsements, setAvailableEndorsements] = useState<Endorsement[]>([]);
  const [selectedEndorsements, setSelectedEndorsements] = useState<Endorsement[]>([]);

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
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const isButtonEnabled = (endorsement: Endorsement) => {
    return achievements.includes(endorsement.milestone);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FaHandshake />
        Endorsements
      </div>
      <div className={styles.content}>
        {/* <div className={styles.bankContainer}>
          <PiPiggyBankLight className={styles.icon} />
          <span>{formatMoney(money)}</span>
        </div> */}
        <div className={styles.requirement}>
          <div>Next endorsement unlocked at:</div>
          <span>10 points/game</span>
        </div>
        <div className={styles.bottomContainer}>
          {availableEndorsements.map(endorsement => (
            <button
              key={endorsement.id}
              className={styles.button}
              onClick={() => handleEndorsementSelect(endorsement)}
              disabled={!isButtonEnabled(endorsement)}
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
