"use client"

import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";

interface AnalyticsProps {
  followers: number;
  views: number;
}

const Analytics: React.FC<AnalyticsProps> = ({followers, views}) => {

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <SiGoogleanalytics className={styles.icon}/>
        Analytics
      </div>
      <div className={styles.content}>
        <div>
          <FaInstagram className={styles.icon2}/>
          Followers: {followers}
        </div>
        <div>
          <FaYoutube className={styles.icon2}/> 
          Views: {views}
        </div>
        
        
      </div>
    </div>
  )
}

export default Analytics