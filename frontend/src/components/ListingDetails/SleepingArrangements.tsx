import React from 'react';
import { SleepingSpace } from '../../types/listing';
import { BedIcon } from '../common/Icons';
import styles from './ListingDetails.module.css';

interface SleepingArrangementsProps {
  spaces: SleepingSpace[];
}

export const SleepingArrangements: React.FC<SleepingArrangementsProps> = ({ spaces }) => {
  return (
    <section className={styles.sleepingSection} aria-label="Where you will sleep">
      <h3 className={styles.sectionHeading}>Where you'll sleep</h3>
      <div className={styles.sleepingGrid}>
        {spaces.map((space) => (
          <div key={space.id} className={styles.sleepingCard}>
            {space.image ? (
              <div className={styles.sleepingImgWrap}>
                <img
                  src={space.image}
                  alt={`${space.roomName} sleeping space`}
                  className={styles.sleepingImg}
                  loading="lazy"
                />
              </div>
            ) : (
              <div className={styles.bedIconWrap}>
                <BedIcon size={26} />
              </div>
            )}
            <div className={styles.sleepingInfo}>
              <h4 className={styles.roomName}>{space.roomName}</h4>
              <p className={styles.bedType}>{space.bedType}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
