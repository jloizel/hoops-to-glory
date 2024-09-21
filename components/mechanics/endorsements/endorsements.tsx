import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { FaHandshake } from 'react-icons/fa';

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
  handleEndorsementSelection: (endorsement: Endorsement) => void;
  level1Endorsements: Endorsement[];
  level2Endorsements: Endorsement[];
  selectedEndorsements: string[]
}

const Endorsements: React.FC<EndorsementsProps> = ({
  achievements,
  onEndorsementSelect,
  completedMilestones,
  onMilestoneChange,
  gameOver,
  handleEndorsementSelection,
  level1Endorsements,
  level2Endorsements,
  selectedEndorsements
}) => {
  const [availableEndorsements, setAvailableEndorsements] = useState<Endorsement[]>([]);
  // const [selectedEndorsements, setSelectedEndorsements] = useState<Endorsement[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [currentMilestone, setCurrentMilestone] = useState<Milestone | null>(null);

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
    initializeAvailableEndorsements();
  }, [level1Endorsements, level2Endorsements, selectedEndorsements]);

  const shuffleArray = (array: any[]) => {
    if (!Array.isArray(array)) {
      return []; // Return an empty array or handle the error as needed
    }
  
    // Defensive check to ensure array is not undefined or null
    if (!array || array.length === 0) {
      return []; // Return an empty array if input is invalid or empty
    }
  
    let arr = [...array]; // Copy the array to avoid mutation
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  console.log(level1Endorsements)
  console.log(level2Endorsements)
  console.log(selectedEndorsements)

  const initializeAvailableEndorsements = () => {
    const nextAvailable: Endorsement[] = [];
    const types = new Set<string>();
  
    // Filter out already selected endorsements
    const filteredLevel1 = level1Endorsements.filter(e => 
      !selectedEndorsements.includes(e.name) // Compare the endorsement's name to the selectedEndorsements array
    );
    const filteredLevel2 = level2Endorsements.filter(e => 
      !selectedEndorsements.includes(e.name) // Same here
    );
  
    // Shuffle the endorsement arrays to randomize the order
    const shuffledLevel1 = shuffleArray(filteredLevel1);
    const shuffledLevel2 = shuffleArray(filteredLevel2);
  
    // Ensure we pick at least 3 endorsements with a 60% priority on level 1
    while (nextAvailable.length < 3 && (shuffledLevel1.length > 0 || shuffledLevel2.length > 0)) {
      const random = Math.random(); // Get a random number between 0 and 1
  
      if (random < 0.6 && shuffledLevel1.length > 0) {
        const selected = shuffledLevel1.shift(); // 60% chance to pick from level 1
        if (selected && !types.has(selected.action)) {
          nextAvailable.push(selected);
          types.add(selected.action); // Ensure unique actions
        }
      } else if (shuffledLevel2.length > 0) {
        const selected = shuffledLevel2.shift(); // 40% chance to pick from level 2
        if (selected && !types.has(selected.action)) {
          nextAvailable.push(selected);
          types.add(selected.action); // Ensure unique actions
        }
      }
    }
  
    setAvailableEndorsements(nextAvailable.slice(0, 3));
  };

  const getNextAvailableMilestone = (milestones: Milestone[]): Milestone | null => {
    return milestones.find(m => !completedMilestones.includes(m.milestone)) || null;
  };

  const handleEndorsementSelect = (endorsement: Endorsement) => {
    // Add the selected endorsement to the list
    onEndorsementSelect(endorsement); // Notify parent about the selected endorsement
    // setSelectedEndorsements((prevEndorsements) => [...prevEndorsements, endorsement]);

    // Notify parent that the current milestone is completed
    if (currentMilestone) {
      onMilestoneChange(currentMilestone.milestone);
    }

    // Remove endorsement from the parent level array
    handleEndorsementSelection(endorsement); // Notify parent to update level1/level2 arrays

    // Refresh available endorsements
    initializeAvailableEndorsements();

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
