import React, { useState, useRef, useEffect } from 'react';
import styles from "./page.module.css";

interface GameOverProps {
  username: string;
  open: boolean;
}

const GameOver: React.FC<GameOverProps> = ({ username, open }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isVideoVisible, setIsVideoVisible] = useState<boolean>(false);
  const [isUsernameVisible, setIsUsernameVisible] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const playVideoAndSpeak = async () => {
    if (videoUrl && videoRef.current) {
      const videoElement = videoRef.current;
      try {
        await videoElement.play();
      } catch (error) {
        console.error("Error attempting to play video:", error);
      }

      const timer = setTimeout(() => {
        const speechText = `${username}`;
        const speech = new SpeechSynthesisUtterance(speechText);

        const voices = window.speechSynthesis.getVoices();
        if (voices.length === 0) {
          // If no voices are loaded yet, wait for them to be loaded
          window.speechSynthesis.onvoiceschanged = () => {
            const updatedVoices = window.speechSynthesis.getVoices();
            speech.voice = updatedVoices.find(voice => voice.name === 'Microsoft George - English (United Kingdom)') || null;
            window.speechSynthesis.speak(speech);
          };
        } else {
          speech.voice = voices.find(voice => voice.name === 'Microsoft George - English (United Kingdom)') || null;
          window.speechSynthesis.speak(speech);
        }
      }, 13200); // 13.2 seconds

      return () => clearTimeout(timer); // Cleanup timer on unmount or URL change
    }
  };

  useEffect(() => {
    if (open) {
      setLoading(true);
      setError(null);
      try {
        // Example video URL, replace with your video URL
        const videoPath = '/videos/draft.mp4'; // Example path
        setVideoUrl(videoPath);
        setTimeout(() => setIsVideoVisible(true), 300); // Delay to match modal fade-in
      } catch (error) {
        setError('Error fetching video. Please try again.');
        console.error('Error fetching video:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setVideoUrl(null);
      setIsVideoVisible(false);
    }
  }, [open]);

  useEffect(() => {
    if (videoRef.current) {
      const videoElement = videoRef.current;
      const handleVideoEnd = () => {
        setIsVideoVisible(false);
        setTimeout(() => {
          setIsUsernameVisible(true);
        }, 1000); // Delay to allow the fade-out effect to complete
      };

      videoElement.addEventListener('ended', handleVideoEnd);

      return () => {
        videoElement.removeEventListener('ended', handleVideoEnd);
      };
    }
  }, [videoUrl]);

  useEffect(() => {
    playVideoAndSpeak();
  }, [videoUrl, username]);

  return (
    <div className={`${styles.container} ${isUsernameVisible ? styles.containerBackground : ""}`}>
      {videoUrl && (
        <div className={`${styles.videoContainer} ${isVideoVisible ? styles.fadeIn : styles.fadeOut}`}>
          <video ref={videoRef} src={videoUrl} autoPlay className={styles.video} />
        </div>
      )}
      {isUsernameVisible && (
          <div className={styles.username}>
            <span>1st Pick in the Nba</span>
            {username}
          </div>
      )}
    </div>
  );
};

export default GameOver;
