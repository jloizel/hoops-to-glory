"use client";

import React, { useState } from 'react';
import styles from "./page.module.css";
import { BsConeStriped } from "react-icons/bs";
import { MdOutlineTimer } from "react-icons/md";
import { TfiTimer } from "react-icons/tfi";
import Countdown from '../../countdown/countdown';

interface TrainingProps {
  trainingDuration: number;
  trainingInProgress: boolean;
  setTrainingInProgress: React.Dispatch<React.SetStateAction<boolean>>;
  skills: { agility: number, shooting: number, fitness: number };
  setSkills: React.Dispatch<React.SetStateAction<{ agility: number, shooting: number, fitness: number }>>;
}

type TrainingType = 'agility' | 'shooting' | 'fitness';

const Training: React.FC<TrainingProps> = ({
  trainingDuration,
  trainingInProgress,
  setTrainingInProgress,
  skills,
  setSkills,
}) => {
  const handleTrainingClick = (type: TrainingType) => {
    setTrainingInProgress(true);

    setTimeout(() => {
      setSkills(prevSkills => ({
        ...prevSkills,
        [type]: prevSkills[type] + 1,
      }));
      setTrainingInProgress(false);
    }, trainingDuration); // 60 seconds for training
  };

  const averageSkillLevel = Math.round((skills.agility + skills.shooting + skills.fitness) / 3);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <BsConeStriped />
        Training
      </div>
      <div className={styles.topContainer}>
        <Countdown trainingInProgress={trainingInProgress} trainingDuration={trainingDuration}/>
      </div>
      <div className={styles.content}>
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
            <span>TRAIN</span>
            <span>(+1)</span>
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
            <span>TRAIN</span>
            <span>(+1)</span>
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
            disabled={trainingInProgress}
          >
            <span>TRAIN</span>
            <span>(+1)</span>
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
