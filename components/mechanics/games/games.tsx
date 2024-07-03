"use client"

import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import { PiCourtBasketballLight } from "react-icons/pi";
import { PiCourtBasketballThin } from "react-icons/pi";

const Games = () => {

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <PiCourtBasketballLight/>
        Games
      </div>
      <div className={styles.content}>
        Play a game after training is completed
        <PiCourtBasketballThin/>
      </div>
    </div>
  )
}

export default Games