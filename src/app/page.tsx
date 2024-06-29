"use client"

import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import PageHeader from '../../components/pageHeader/pageHeader'
import Game from '../../components/game/game'

const Home = () => {
  const [username, setUsername] = useState("")

  useEffect(() => {
    setUsername("JACK LOIZEL")
  }, [])

  return (
    <div className={styles.home}>
      <PageHeader username={username}/>    
      <Game/>
    </div>
  )
}

export default Home