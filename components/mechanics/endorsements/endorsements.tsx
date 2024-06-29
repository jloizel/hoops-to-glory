"use client"

import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import { FaHandshake } from "react-icons/fa";

const Endorsements = () => {

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FaHandshake className={styles.icon}/>
        Endorsements
      </div>
      <div className={styles.content}>
        Get endorsements and sponsorships to gain money and improve things (facilities, coach, etc)
      </div>
    </div>
  )
}

export default Endorsements