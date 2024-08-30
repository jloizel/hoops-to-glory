"use client";

import React, { useState } from 'react';
import styles from "./page.module.css";
import { BsConeStriped } from "react-icons/bs";
import { MdOutlineTimer } from "react-icons/md";
import { TfiTimer } from "react-icons/tfi";
import Countdown from '../../countdown/countdown';

interface TrainingProps {
  selectedTrainingType: TrainingType;
  trainingDurations: {
    agility: number;
    shooting: number;
    fitness: number;
  };
  trainingInProgress: boolean;
  skills: { agility: number, shooting: number, fitness: number };
  handleTrainingClick: (type: TrainingType) => void; 
  averageSkillLevel: number
  skillUpgrade: { agility: number, shooting: number, fitness: number };
  trainingAvailable: boolean;
  isStateLoaded: boolean;
  gameStarted: boolean;
  isRunning: boolean;
}

type TrainingType = 'agility' | 'shooting' | 'fitness';

const Training: React.FC<TrainingProps> = ({
  selectedTrainingType,
  trainingDurations,
  trainingInProgress,
  skills,
  handleTrainingClick,
  averageSkillLevel,
  skillUpgrade,
  trainingAvailable,
  isStateLoaded,
  gameStarted,
  isRunning
}) => {
  const trainingDuration = trainingDurations[selectedTrainingType];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <BsConeStriped />
        Training
      </div>
      <div className={styles.content}>
        <div className={styles.topContainer}>
          <Countdown trainingInProgress={trainingInProgress} trainingDuration={trainingDuration}/>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.skill}>
            <span>Skills & Agility</span>
            <div>Level: {skills.agility}</div>
          </div>
          <button
            className={styles.button}
            onClick={() => handleTrainingClick('agility')}
            disabled={trainingInProgress || !trainingAvailable || !isStateLoaded || !gameStarted || isRunning}
          >
            <span>TRAIN</span>
            <span>(+{skillUpgrade.agility})</span>
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
            disabled={trainingInProgress || !trainingAvailable || !isStateLoaded || !gameStarted || isRunning}
          >
            <span>TRAIN</span>
            <span>(+{skillUpgrade.shooting})</span>
          </button>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.skill}>
            <span>Strength & Fitness</span>
            <div>Level: {skills.fitness}</div>
          </div>
          <button
            className={styles.button}
            onClick={() => handleTrainingClick('fitness')}
            disabled={trainingInProgress || !trainingAvailable || !isStateLoaded || !gameStarted || isRunning}
          >
            <span>TRAIN</span>
            <span>(+{skillUpgrade.fitness})</span>
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
