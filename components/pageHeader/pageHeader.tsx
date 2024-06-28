"use client"

import React from 'react'
import styles from "./page.module.css"
import { Box } from '@mui/material'
import { VscDebugRestart } from "react-icons/vsc";


interface PageHeaderProps {
  username: string
}

const PageHeader: React.FC<PageHeaderProps> = ({username}) => {
  return (
    <div className={styles.mainContainer}>
      <Box className={styles.leftContainer}>
        <div className={styles.imageContainer1}>
          <img src="/logo3.png" className={styles.image1}></img>
        </div>
        <div className={styles.name}>
          <span>Hoops</span>
          <span>To</span>
          <span>Glory</span>
        </div>
        
      </Box>
      <Box className={styles.middleContainer}>
        <div className={styles.username}>{username}</div>
        <div className={styles.rank}>
          <span>MOCK DRAFT RANK:</span>
          <span>UNDRAFTED</span>
        </div>
      </Box> 
      <Box className={styles.rightContainer}>
        <div className={styles.imageContainer2}>
          <img src="/HoF.png" className={styles.image2}></img>
        </div>
        <VscDebugRestart className={styles.icon}/>
      </Box>   
    </div>
  )
}

export default PageHeader