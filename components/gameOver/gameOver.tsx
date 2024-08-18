import React, { useState, useRef, useEffect } from 'react';
import styles from "./page.module.css";
import Confetti from '../confetti/confetti';
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { HiArrowLongRight } from "react-icons/hi2";
import { createTime, getAllTimes, getTimeByUsername, updateTime } from '@/app/API';
import { Modal } from '@mui/material';
import HallOfFame from '../hof/hof';
import { debounce } from 'lodash';


interface GameOverProps {
  username: string;
  open: boolean;
  elapsedTime: string;
  handleClose: () => void;
  gameStarted: boolean;
}

const GameOver: React.FC<GameOverProps> = ({ username, open, elapsedTime, handleClose, gameStarted }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isVideoVisible, setIsVideoVisible] = useState<boolean>(false);
  const [isUsernameVisible, setIsUsernameVisible] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isConfettiComplete, setIsConfettiComplete] = useState(false);
  const [arrowClicked, setArrowClicked] = useState(false)
  const [rank, setRank] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const saveCompleted = useRef(false);

  useEffect(() => {
    if (open) {
      setLoading(true);
      setError(null);
      try {
        const videoPath = '/videos/draftVideo.mp4'; // Example path
        const audioPath = '/audio/draftAudio.m4a'; // Example path
        setVideoUrl(videoPath);
        setAudioUrl(audioPath);
        setTimeout(() => setIsVideoVisible(true), 300); // Delay to match modal fade-in
      } catch (error) {
        setError('Error fetching media. Please try again.');
        console.error('Error fetching media:', error);
      } finally {
        setLoading(false);
      }
      document.body.classList.add(styles.noScroll);
    } else {
      setVideoUrl(null);
      setAudioUrl(null);
      setIsVideoVisible(false);

      document.body.classList.remove(styles.noScroll);
    }
  }, [open]);

  useEffect(() => {
    if (videoRef.current && audioRef.current) {
      const videoElement = videoRef.current;
      const audioElement = audioRef.current;

      const handleVideoEnd = () => {
        setIsVideoVisible(false);
        setTimeout(() => {
          setIsUsernameVisible(true);
        }, 1000); // Delay to allow the fade-out effect to complete
      };

      const handleCanPlay = () => {
        // Play both video and audio
        videoElement.play();
        audioElement.play();

        // Fade out video 2 seconds before the end
        const fadeOutTime = videoElement.duration - 2;
        setTimeout(() => {
          setIsVideoVisible(false);
          setTimeout(() => {
            setIsUsernameVisible(true);
          }, 1000); // Delay to allow the fade-out effect to complete
        }, fadeOutTime * 1000);
      };

      videoElement.addEventListener('ended', handleVideoEnd);
      videoElement.addEventListener('canplay', handleCanPlay);

      return () => {
        videoElement.removeEventListener('ended', handleVideoEnd);
        videoElement.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, [videoUrl]);

  const handleConfettiComplete = () => {
    setIsConfettiComplete(true);
  };

  const handleArrowClick = () => {
    setArrowClicked(true)
  };

  /// Save time and calculate rank
  const saveTimeAndCalculateRank = async () => {
    try {
      const existingTime = await getTimeByUsername(username);
      if (existingTime) {
        await updateTime(existingTime._id, { username, elapsedTime });
      } else {
        await createTime({ username, elapsedTime });
      }
      const times = await getAllTimes();
      times.sort((a, b) => parseFloat(a.elapsedTime) - parseFloat(b.elapsedTime));
      const userRank = times.findIndex(time => time.username === username) + 1;
      setRank(userRank);
    } catch (error) {
      console.error('Error saving time or calculating rank:', error);
      setError('Error saving time or calculating rank. Please try again.');
    }
  };

  // Trigger saving time and calculating rank when game ends
  useEffect(() => {
    if (!gameStarted && open && !saveCompleted.current) {
      // Ensure the function is executed only once
      saveTimeAndCalculateRank();
      saveCompleted.current = true;  // Mark as completed
    }
  }, [gameStarted, open]);

  const handleHofClick = () => {
    setModalOpen(true)
  }

  const handleCloseIcon = () => {
    setModalOpen(false)
  }

  return (
    <div className={styles.container}>
      <Confetti trigger={isUsernameVisible} onConfettiComplete={handleConfettiComplete}/>
      {videoUrl && (
        <div className={`${styles.videoContainer} ${isVideoVisible ? styles.fadeIn : styles.fadeOut}`}>
          <video ref={videoRef} src={videoUrl} className={styles.video} />
        </div>
      )}
      {audioUrl && (
        <audio ref={audioRef} src={audioUrl} />
      )}
      {isUsernameVisible && !arrowClicked && (
        <div className={styles.pickContainer}>
          <div className={styles.left}>
            <div className={styles.top}> 
              <div className={styles.logoContainer}>
                <img src="/images/logo3.png" className={styles.logo}/>
              </div>
              <div className={styles.draftText}>
                <span>DRAFT</span>
                <span>2024</span>
              </div>
            </div>
            <div className={styles.username}>
              <span>PICK IN THE</span>
              <span>2024 DRAFT</span>
              {username}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.imageContainer}>
              <img src="/images/1.png" className={styles.image}/>
            </div>
            {isConfettiComplete && (
              <HiArrowLongRight className={styles.arrow1} onClick={handleArrowClick}/>
            )}
          </div>
        
        </div>
      )}
      {arrowClicked && (
        <div className={styles.pickContainer}>
          <div className={styles.content}>
            <div className={styles.time}>
              <span>Your time</span>
              {elapsedTime}
            </div>
            <IoCloseOutline className={styles.closeIcon} onClick={handleClose}/>
            <div className={styles.hof}>
              {/* <span>Check out the highscores <HiArrowLongRight className={styles.arrow2}/> </span> */}
              <div className={styles.hofImageContainer} onClick={handleHofClick}>
                <img src="/images/HoF.png" className={styles.hofImage}></img>
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} className={styles.modalContainer}>
        <HallOfFame handleCloseIcon={handleCloseIcon} userRank={rank}/>
      </Modal>
    </div>
  );
};

export default GameOver;
