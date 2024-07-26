import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import styles from './page.module.css';

interface ConfettiProps {
  trigger: boolean;
  onConfettiComplete: () => void;
}

const Confetti: React.FC<ConfettiProps> = ({ trigger, onConfettiComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (trigger && canvasRef.current) {
      const canvas = canvasRef.current;
      const myConfetti = confetti.create(canvas, { resize: true });

      const duration = 5 * 1000; // 5 seconds
      const animationEnd = Date.now() + duration;
      const skew = 1;

      (function frame() {
        const timeLeft = animationEnd - Date.now();
        const ticks = Math.max(200, 500 * (timeLeft / duration));
        myConfetti({
          particleCount: 2,
          startVelocity: 30,
          ticks: ticks,
          origin: {
            x: Math.random(),
            // since particles fall down, skew start toward the top
            y: Math.random() * skew - 0.2,
          },
          colors: ['#0067B1', '#ED174F', '#FFFFFF'],
          shapes: ['circle'],
          zIndex: 999
        });

        if (timeLeft > 0) {
          requestAnimationFrame(frame);
        } else {
          onConfettiComplete()
        }
      })();
    }
  }, [trigger]);

  return <canvas ref={canvasRef} className={styles.confetti} />;
};

export default Confetti;
