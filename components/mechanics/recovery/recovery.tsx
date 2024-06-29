"use client"

import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import { FaBed } from "react-icons/fa";

const Recovery = () => {

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FaBed className={styles.icon}/>
        Recovery
      </div>
      <div className={styles.content}>
        Rest and recover before being able to train and play again
      </div>
    </div>
  )
}

export default Recovery