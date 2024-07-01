"use client"

import React, { useState } from 'react';
import styles from "./page.module.css";
import { BsConeStriped } from "react-icons/bs";
import { FaRunning, FaBasketballBall, FaDumbbell } from "react-icons/fa";
import Animation from './animation';

type TrainingType = 'agility' | 'shooting' | 'fitness';

const Training = () => {
  const [trainingType, setTrainingType] = useState<TrainingType | null>(null);
  const trainingDuration = 60;
  const [trainingInProgress, setTrainingInProgress] = useState(false);
  const [skills, setSkills] = useState<{ agility: number, shooting: number, fitness: number }>({
    agility: 0,
    shooting: 0,
    fitness: 0,
  });

  const handleTrainingClick = (type: TrainingType) => {
    setTrainingType(type);
    setTrainingInProgress(true);
    setTimeout(() => {
      setSkills(prevSkills => ({
        ...prevSkills,
        [type]: prevSkills[type] + 1,
      }));
      setTrainingInProgress(false);
    }, 60000); // 60 seconds for training
  };

  const averageSkillLevel = (skills.agility + skills.shooting + skills.fitness)/3;

  const startTraining = (type: TrainingType) => {
    setTrainingType(type);
    setTimeout(() => setTrainingType(null), trainingDuration * 1000);
  };



  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <BsConeStriped className={styles.icon} />
        Training
      </div>
      <div className={styles.animationContainer}>
        {trainingType && (
          <Animation
            type={trainingType as TrainingType}
            duration={trainingDuration}
          />
        )}
      </div>
      <div className={styles.content}>
        {/* <span>Select an attribute to train:</span> */}
        <div className={styles.buttonContainer}>
          <div className={styles.skill}>
            <span>Skills & Agility</span>
            <div>Level: {skills.agility}</div>
          </div>
          <button
            className={styles.button}
            onClick={() => handleTrainingClick('agility')}
            disabled={trainingInProgress}
          >
            TRAIN
          </button>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.skill}>
            <span>Shooting</span>
            <div>Level: {skills.shooting}</div>
          </div>
          <button
            className={styles.button}
            onClick={() => handleTrainingClick('shooting')}
            disabled={trainingInProgress}
          >
            TRAIN
          </button>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.skill}>
            <span>Fitness & Athleticism</span>
            <div>Level: {skills.fitness}</div>
          </div>
          <button
            className={styles.button}
            onClick={() => handleTrainingClick('fitness')}
            disabled={trainingInProgress}
          >
            TRAIN
          </button>
        </div>
        <div className={styles.skillLevels}>
          <div>Average Skill Level: {averageSkillLevel}</div>
        </div>
      </div>
    </div>
  );
}

export default Training;
