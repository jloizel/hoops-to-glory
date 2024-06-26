import React from 'react'
import styles from "./page.module.css"

const Home = () => {
  return (
    <div className={styles.home}>page
      <div className={styles.imageContainer}>
        <img src="/logo.png" className={styles.image}></img>
      </div>
      <div className={styles.imageContainer}>
        <img src="/logo2.png" className={styles.image}></img>
      </div>      
    </div>
  )
}

export default Home