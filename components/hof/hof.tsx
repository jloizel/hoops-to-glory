import React from 'react'
import styles from "./page.module.css"
import { IoCloseOutline } from "react-icons/io5";

const HallOfFame = () => {
  return (
    <div className={styles.container}>
      <span>
        Current Hall of Famers
      </span>
      <IoCloseOutline className={styles.closeIcon}/>
    </div>
  )
}

export default HallOfFame
