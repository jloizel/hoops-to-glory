"use client"

import React, { useState } from 'react';
import styles from "./page.module.css";


interface ShareProps {
    elapsedTime: string
}

const Share: React.FC<ShareProps> = ({elapsedTime}) => {
    const [copied, setCopied] = useState(false);

    const scoreText = `I reached the 1st pick in the NBA draft in ${elapsedTime} on HoopsToGlory 🏆`;
    // const cityText = `🗺️ ${selectedCity}`;
    const urlText = 'Try to beat my time at https://www.hoopstoglory.com/';
    const text = `${scoreText}\n\n${urlText}`;

    const handleShare = async () => {
        try {
            if (navigator.share && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Ópera Mini/i.test(navigator.userAgent)) {
                
                await navigator.share({
                    title: scoreText,
                    text: text,
                });
            } else {
                // For non-mobile devices, copy text to clipboard
                navigator.clipboard.writeText(text);
                setCopied(true)
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <button 
            onClick={handleShare} 
            className={styles.button}
        >
            {copied ? "COPIED!" : "SHARE"}
        </button>
    );
};

export default Share;
