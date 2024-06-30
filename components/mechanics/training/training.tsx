"use client"

import React, { useState } from 'react';
import styles from "./page.module.css";
import { BsConeStriped } from "react-icons/bs";
import { FaRunning, FaBasketballBall, FaDumbbell } from "react-icons/fa";

type TrainingType = 'agility' | 'shooting' | 'fitness';

const Training = () => {
  const [trainingType, setTrainingType] = useState<TrainingType | null>(null);
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

  const totalSkillLevel = skills.agility + skills.shooting + skills.fitness;

  const getTrainingIcon = () => {
    if (trainingType === 'agility') {
      return <FaRunning className={`${styles.progressIcon} ${styles.agilityAnimation}`} />;
    } else if (trainingType === 'shooting') {
      return <FaBasketballBall className={`${styles.progressIcon} ${styles.shootingAnimation}`} />;
    } else if (trainingType === 'fitness') {
      return <FaDumbbell className={`${styles.progressIcon} ${styles.fitnessAnimation}`} />;
    }
    return null;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <BsConeStriped className={styles.icon} />
        Training
      </div>
      <div className={styles.content}>
        <span>Attend training to improve your skills</span>
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={() => handleTrainingClick('agility')}
            disabled={trainingInProgress}
          >
            Train Skills & Agility
          </button>
          <button
            className={styles.button}
            onClick={() => handleTrainingClick('shooting')}
            disabled={trainingInProgress}
          >
            Train Shooting
          </button>
          <button
            className={styles.button}
            onClick={() => handleTrainingClick('fitness')}
            disabled={trainingInProgress}
          >
            Train Fitness
          </button>
        </div>
        {trainingInProgress && (
          <div className={styles.progressContainer}>
            {getTrainingIcon()}
          </div>
        )}
        <div className={styles.skillLevels}>
          <div>Skills & Agility Level: {skills.agility}</div>
          <div>Shooting Level: {skills.shooting}</div>
          <div>Fitness Level: {skills.fitness}</div>
          <div>Total Skill Level: {totalSkillLevel}</div>
        </div>
      </div>
    </div>
  );
}

export default Training;
