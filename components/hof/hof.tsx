import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import { IoCloseOutline } from "react-icons/io5";
import { getAllTimes, Time } from '@/app/API';
import { Oval } from 'react-loader-spinner';

interface HallOfFameProps {
  handleCloseIcon: () => void;
}

const HallOfFame: React.FC<HallOfFameProps> = ({handleCloseIcon}) => {
  const [loading, setLoading] = useState(false)
  const [timesFetched, setTimesFetched] = useState(false)
  const [times, setTimes] = useState<Time[]>([]);

  useEffect(() => {
    const fetchTimes = async () => {
      if (!timesFetched) {
        try {
          setLoading(true);
          const allTimes = await getAllTimes();

          // Convert elapsedTime to milliseconds for comparison
          const parseTime = (timeStr) => {
            const [minutes, seconds] = timeStr.split(':').map(Number);
            return minutes * 60 * 1000 + seconds * 1000;
          };

          // Sort scores by elapsedTime (shortest first)
          const sortedTimes = allTimes.sort((a, b) => parseTime(a.elapsedTime) - parseTime(b.elapsedTime));

          // Get top 10 times
          const top10Times = sortedTimes.slice(0, 10);

          setTimes(top10Times);
          setTimesFetched(true);
        } catch (error) {
          console.error('Error fetching scores:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTimes();
  }, [timesFetched]);

  

  return (
    <div className={styles.container}>
      <IoCloseOutline className={styles.closeIcon} onClick={handleCloseIcon}/>
      <span>
        Current Hall of Famers
      </span>
      {loading ? (
        <Oval
          visible={true}
          height="50"
          width="50"
          color="#0067B1"
          secondaryColor='#0067B1'
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
      <div>
        {times.map((time: Time, index: number) => (index < 10 && (
          <div key={time._id} className={styles.timeItem} >
            <span className={styles.username}>
              {time.username}
            </span>
            <span className={styles.elapsedTime}>
              {time.elapsedTime} POINTS
            </span>
          </div>
          )
        ))}
      </div>
      )}
    </div>
  )
}

export default HallOfFame
