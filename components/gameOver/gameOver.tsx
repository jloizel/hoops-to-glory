import React, { useState, useRef, useEffect } from 'react';

const GameOver: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoUrl && videoRef.current) {
      const videoElement = videoRef.current;
      videoElement.play();

      // Set a timer to start speech after 13.2 seconds
      const timer = setTimeout(() => {
        const speechText = `${username}`;
        const speech = new SpeechSynthesisUtterance(speechText);
        speech.voice = window.speechSynthesis.getVoices().find(voice => voice.name === 'Microsoft George - English (United Kingdom)') || null;
        speech.pitch = 1;
        speech.rate = 1;
        window.speechSynthesis.speak(speech);
      }, 13200); // 13.2 seconds

      return () => clearTimeout(timer); // Cleanup timer on unmount or URL change
    }
  }, [videoUrl, username]);

  const voicesList = window.speechSynthesis.getVoices()

  const handleGenerateVideo = () => {
    setLoading(true);
    setError(null);
    try {
      // Example video URL, replace with your video URL
      const videoPath = '/videos/draft.mp4'; // Example path
      setVideoUrl(videoPath);
    } catch (error) {
      setError('Error fetching video. Please try again.');
      console.error('Error fetching video:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />
      <button onClick={handleGenerateVideo} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Video'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {videoUrl && (
        <div>
          <video ref={videoRef} src={videoUrl} controls />
        </div>
      )}
    </div>
  );
};

export default GameOver;
