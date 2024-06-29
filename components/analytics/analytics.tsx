"use client"

import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";


const Analytics = () => {

  return (
    <div className={styles.analyticsContainer}>
      <div className={styles.header}>
        <SiGoogleanalytics className={styles.icon}/>
        Analytics
      </div>
      <div className={styles.content}>
        <div>
          <FaInstagram className={styles.icon1}/>
          Followers:
        </div>
        <div>
          <FaYoutube className={styles.icon2}/> 
          Views:
        </div>
        
        
      </div>
    </div>
  )
}

export default Analytics