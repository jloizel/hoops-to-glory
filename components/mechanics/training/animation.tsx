import React, { useEffect, useRef } from 'react';
import styles from "./animation.module.css"

type TrainingType = 'agility' | 'shooting' | 'fitness';

interface TrainingAnimationProps {
  type: TrainingType;
  duration: number; // in seconds
}

const Animation: React.FC<TrainingAnimationProps> = ({ type, duration }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // useEffect(() => {
  //   const video = videoRef.current;
  //   if (video) {
  //     video.play();

  //     const loopVideo = () => {
  //       video.currentTime = 0;
  //       video.play();
  //     };

  //     video.addEventListener('ended', loopVideo);

  //     const stopLooping = setTimeout(() => {
  //       video.removeEventListener('ended', loopVideo);
  //     }, duration * 1000);

  //     return () => {
  //       clearTimeout(stopLooping);
  //       video.removeEventListener('ended', loopVideo);
  //     };
  //   }
  // }, [type, duration]);

  const getVideoSrc = () => {
    switch (type) {
      case 'agility':
        return "/videos/agility.mp4";
      case 'shooting':
        return "/videos/shooting.mp4";
      case 'fitness':
        return "/videos/fitness.mp4";
      default:
        return '';
    }
  };

  return (
    <div className={styles.animationContainer}>
      <video ref={videoRef} className={styles.video} width="100" height="100" loop autoPlay muted >
        <source src={getVideoSrc()} type="video/mp4"/>
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Animation;
