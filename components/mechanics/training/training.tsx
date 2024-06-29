"use client"

import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import { BsConeStriped } from "react-icons/bs";


const Training = () => {

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <BsConeStriped className={styles.icon}/>
        Training
      </div>
      <div className={styles.content}>
        <span>Attend training to improve your skills</span>
        <button className={styles.button}>PRESS</button>
      </div>
    </div>
  )
}

export default Training