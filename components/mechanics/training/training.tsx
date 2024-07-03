"use client";

import React, { useState } from 'react';
import styles from "./page.module.css";
import { BsConeStriped } from "react-icons/bs";
import { MdOutlineTimer } from "react-icons/md";
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
  const [buttonPressed, setButtonPressed] = useState(false);
  const [showDuration, setShowDuration] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleTrainingClick = (type: TrainingType) => {
    setButtonPressed(true);
    setTrainingType(type);
    setTrainingInProgress(true);

    setTimeout(() => {
      setShowDuration(true);
    }, 500);

    setTimeout(() => {
      setShowDuration(false);
      setShowAnimation(true);
    }, 1500);

    setTimeout(() => {
      setSkills(prevSkills => ({
        ...prevSkills,
        [type]: prevSkills[type] + 1,
      }));
      setTrainingType(null); // Hide the animation after 60 seconds
      setTrainingInProgress(false);
      setButtonPressed(false);
      setShowAnimation(false);
    }, 6000); // 60 seconds for training
  };

  const averageSkillLevel = Math.round((skills.agility + skills.shooting + skills.fitness) / 3);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <BsConeStriped />
        Training
      </div>
      <div className={styles.topContainer}>
        {!showAnimation && (
          <div className={styles.timerContainer}>
            <MdOutlineTimer className={`${styles.timerIcon} ${buttonPressed ? styles.popOut : ''}`} />
          </div>
        )}
        <div className={`${styles.durationContainer} ${showDuration ? styles.popIn : ""}`}>
          {showDuration && (
            <span>60 seconds</span>
          )}
        </div>
        {showAnimation && (
          <div className={styles.animationVisible}>
            <Animation
              type={trainingType as TrainingType}
              duration={trainingDuration}
            />
          </div>
        )}
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
            <span>Strength & Fitness</span>
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
