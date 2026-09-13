import React from 'react';
import { StarIcon, LaurelLeftIcon, LaurelRightIcon } from '../common/Icons';
import styles from './ListingDetails.module.css';

interface GuestFavouriteBannerProps {
  rating: number;
  reviewCount: number;
}

export const GuestFavouriteBanner: React.FC<GuestFavouriteBannerProps> = ({
  rating,
  reviewCount,
}) => {
  return (
    <div className={styles.guestFavContainer} aria-label="Guest favourite award">
      {/* Left Laurel + Text + Right Laurel */}
      <div className={styles.guestFavLeft}>
        <LaurelLeftIcon size={34} />
        <div className={styles.guestFavBadgeText}>
          <span className={styles.guestFavTop}>Guest</span>
          <span className={styles.guestFavBottom}>favourite</span>
        </div>
        <LaurelRightIcon size={34} />
      </div>

      {/* Center text */}
      <div className={styles.guestFavMiddle}>
        <p className={styles.guestFavDesc}>
          One of the most loved homes on Airbnb, according to guests
        </p>
      </div>

      {/* Right ratings */}
      <div className={styles.guestFavRight}>
        <div className={styles.guestFavRatingBox}>
          <span className={styles.guestFavScore}>{rating.toFixed(2)}</span>
          <div className={styles.starsRow} aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} size={10} color="#222222" />
            ))}
          </div>
        </div>

        <div className={styles.guestFavDivider} />

        <div className={styles.guestFavReviewsBox}>
          <span className={styles.guestFavReviewNum}>{reviewCount}</span>
          <span className={styles.guestFavReviewLabel}>Reviews</span>
        </div>
      </div>
    </div>
  );
};
