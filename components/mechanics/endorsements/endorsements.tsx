"use client"

import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import { FaHandshake } from "react-icons/fa";
import { PiPiggyBankLight } from "react-icons/pi";

const Endorsements = () => {
  const [money, setMoney] = useState(100)
  
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FaHandshake/>
        Endorsements
      </div>
      <div className={styles.content}>
        <div className={styles.bankContainer}>
          <PiPiggyBankLight className={styles.icon} />
          <span>{formatMoney(money)}</span>
        </div>
        <div className={styles.bottomContainer}>
          <button className={styles.button}>
            Unleash your speed and agility with Nike Air Zoom 
          </button>
          <button className={styles.button}>
            Experience unparalleled energy return and comfort with Adidas Boost 
          </button>
          <button className={styles.button}>
            Get unmatched support and flexibility with Under Armour ClutchFit 
          </button>
        </div>
      </div>
    </div>
  )
}

export default Endorsements