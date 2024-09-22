import React, { forwardRef, useEffect, useState } from 'react'
import styles from "./page.module.css"
import { IoCloseOutline } from "react-icons/io5";
import { getAllTimes, Time } from '../../src/app/API';
import { Oval, ThreeDots } from 'react-loader-spinner';

interface HallOfFameProps {
  handleCloseIcon: () => void;
  // userRank?: number | null;
  username: string
}

const HallOfFame = forwardRef<HTMLDivElement, HallOfFameProps>(({ handleCloseIcon, username }, ref) => {
  const [loading, setLoading] = useState(false)
  const [timesFetched, setTimesFetched] = useState(false)
  const [times, setTimes] = useState<Time[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);

  useEffect(() => {
    const fetchTimes = async () => {
      if (!timesFetched) {
        try {
          setLoading(true);
          const allTimes = await getAllTimes();

          // Convert elapsedTime to milliseconds for comparison
          const parseTime = (timeStr: any) => {
            const [minutes, seconds] = timeStr.split(':').map(Number);
            return minutes * 60 * 1000 + seconds * 1000;
          };

          // Sort scores by elapsedTime (shortest first)
          const sortedTimes = allTimes.sort((a, b) => parseTime(a.elapsedTime) - parseTime(b.elapsedTime));

          // Get top 10 times
          const top10Times = sortedTimes.slice(0, 10);

          // Set times for the leaderboard
          setTimes(top10Times);

          // Find user rank
          const userIndex = sortedTimes.findIndex(time => 
            time.username && typeof time.username === 'string' &&
            time.username.trim().toLowerCase() === username.trim().toLowerCase()
          );
          
          // If user is in top 10, show their rank; otherwise, show the user's rank in the whole leaderboard
          if (userIndex !== -1) {
            setUserRank(userIndex + 1); // +1 because ranks are 1-based
          } else {
            setUserRank(null); // Set to null if the user is not in the top 10
          }

          setTimesFetched(true);
        } catch (error) {
          console.error('Error fetching scores:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTimes();
  }, [timesFetched, username]);


  return (
    <div className={styles.container}>
      <IoCloseOutline className={styles.closeIcon} onClick={handleCloseIcon}/>
      <div className={styles.content}>
        <span>
          Current Hall of Famers
        </span>
        {loading ? (
          <div className={styles.oval}>
            <ThreeDots
              visible={true}
              height="50"
              width="50"
              color="#0067B1"
              // secondaryColor='#0067B1'
              // ariaLabel="oval-loading"
              ariaLabel='three-dots-loading'
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
        <div className={styles.timesContainer}>
          <div className={styles.times}>
            {times.map((time: Time, index: number) => (
              index < 5 && (
                <div key={time._id} className={styles.timeItem}>
                  <div className={styles.index}>
                    {index + 1}.
                  </div>
                  <div className={styles.username}>
                    {time.username}
                  </div>
                  <div className={styles.elapsedTime}>
                    {time.elapsedTime}
                  </div>
                </div>
              )
            ))}
          </div>
          {userRank ? (
            <div className={styles.userRank}>
              Your rank: #{userRank}
            </div>
          ) : (
            <div className={styles.userRankUndefined}>
              Finish the game to display your rank.
            </div>
          )}
          
        </div>
        )}
      </div>
    </div>
  )
})

HallOfFame.displayName = 'HallOfFame';

export default HallOfFame
