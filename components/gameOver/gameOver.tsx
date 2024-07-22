import React, { useState, useEffect } from 'react';

interface GameOverProps {
  username: string;
}

const GameOver: React.FC<GameOverProps> = ({ username }) => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const response = await fetch(`/generateVideo?username=${encodeURIComponent(username)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch video URL');
        }
        const videoPath = await response.text();
        setVideoUrl(videoPath);
        setLoading(false);
      } catch (error) {
        setError('Error fetching video');
        setLoading(false);
      }
    };

    fetchVideoUrl();
  }, [username]);

  return (
    <div>
      {loading ? (
        <p>Loading video...</p>
      ) : error ? (
        <p>{error}</p>
      ) : videoUrl ? (
        <video
          src={videoUrl}
          controls
          autoPlay
          style={{ width: '100%', height: 'auto' }}
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Video not available</p>
      )}
    </div>
  );
};

export default GameOver;
