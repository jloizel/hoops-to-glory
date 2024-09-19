"use client"

import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";

interface AnalyticsProps {
  followers: number;
}

const Analytics: React.FC<AnalyticsProps> = ({followers}) => {

  const formatFollowers = (followers: number): string => {
    if (followers >= 1000000) {
      // Format as 1.2m, 1.7m etc.
      return (followers / 1000000).toFixed(1) + 'm';
    } else if (followers >= 1000) {
      // Format as 12.1k, 15.7k, keeping the hundreds
      return (followers / 1000).toFixed(1) + 'k';
    } else {
      // For values below 1000, return the exact number
      return followers.toString();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <SiGoogleanalytics className={styles.icon}/>
        Social Media
      </div>
      <div className={styles.content}>
        <FaInstagram className={styles.icon2}/>
        Followers: {formatFollowers(followers)}
        {/* <div>
          <FaYoutube className={styles.icon2}/> 
          Views: {views}
        </div> */}
      </div>
    </div>
  )
}

export default Analytics