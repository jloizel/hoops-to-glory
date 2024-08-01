import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import { IoCloseOutline } from "react-icons/io5";
import { getAllTimes } from '@/app/API';

const HallOfFame = () => {
  const [loading, setLoading] = useState(false)
  const [timesFetched, setTimesFetched] = useState(false)
  const [times, setTimes] = useState("")

  useEffect(() => {
    const fetchTimes = async () => {
      if (!timesFetched) {
      try {
        setLoading(true)
        const allTimes = await getAllTimes();
    
        // Sort scores by points first, then by time added (more recent first)
        const sortedTimes = allTimes.sort((a, b) => {
          if (a.elapsedTime !== b.elapsedTime) {
            return b.elapsedTime - a.elapsedTime; // Sort by points (higher to lower)
          } else {
            // If points are tied, sort by time added (more recent first)
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          }
        });
    
        setTimes(sortedTimes);
        setTimesFetched(true);
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    }
    };
  
    fetchTimes();
  }, [times]);

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
