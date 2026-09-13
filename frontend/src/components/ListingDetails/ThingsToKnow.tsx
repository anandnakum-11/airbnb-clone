import React from 'react';
import styles from './ListingDetails.module.css';

export const ThingsToKnow: React.FC = () => {
  return (
    <section className={styles.thingsToKnowSection} aria-label="Things to know">
      <h3 className={styles.thingsToKnowHeading}>Things to know</h3>

      <div className={styles.thingsToKnowGrid}>
        {/* Column 1: Cancellation policy */}
        <div className={styles.thingsColumn}>
          <div className={styles.thingsColumnHeader}>
            <span className={styles.thingsIcon}>📅</span>
            <h4 className={styles.thingsTitle}>Cancellation policy</h4>
          </div>
          <p className={styles.thingsText}>
            Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.
          </p>
          <p className={styles.thingsSubtext}>Review this host's full policy for details.</p>
          <button type="button" className={styles.thingsLink}>
            Learn more ›
          </button>
        </div>

        {/* Column 2: House rules */}
        <div className={styles.thingsColumn}>
          <div className={styles.thingsColumnHeader}>
            <span className={styles.thingsIcon}>🔑</span>
            <h4 className={styles.thingsTitle}>House rules</h4>
          </div>
          <p className={styles.thingsText}>Check-in after 2:00 pm</p>
          <p className={styles.thingsText}>Checkout before 11:00 am</p>
          <p className={styles.thingsText}>3 guests maximum</p>
          <button type="button" className={styles.thingsLink}>
            Learn more ›
          </button>
        </div>

        {/* Column 3: Safety & property */}
        <div className={styles.thingsColumn}>
          <div className={styles.thingsColumnHeader}>
            <span className={styles.thingsIcon}>🛡️</span>
            <h4 className={styles.thingsTitle}>Safety & property</h4>
          </div>
          <p className={styles.thingsText}>Carbon monoxide alarm not reported</p>
          <p className={styles.thingsText}>Smoke alarm not reported</p>
          <p className={styles.thingsText}>Exterior security cameras on property</p>
          <button type="button" className={styles.thingsLink}>
            Learn more ›
          </button>
        </div>
      </div>
    </section>
  );
};
