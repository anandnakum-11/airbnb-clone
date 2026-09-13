import React, { useState, useEffect } from 'react';
import { PricingDetails } from '../../types/listing';
import { StarIcon } from '../common/Icons';
import styles from './StickyTopBar.module.css';

interface StickyTopBarProps {
  pricing: PricingDetails;
  rating: number;
  reviewCount: number;
  onReserveClick: () => void;
  nights?: number;
}

type TabKey = 'photos' | 'amenities' | 'reviews' | 'location';

export const StickyTopBar: React.FC<StickyTopBarProps> = ({
  pricing,
  rating,
  reviewCount,
  onReserveClick,
  nights = 5,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('photos');

  // Total calculation for nights
  const effectiveNights = nights > 0 ? nights : 5;
  const totalPrice = pricing.pricePerNight * effectiveNights + pricing.cleaningFee + pricing.serviceFee;

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar once scrolled past ~550px (gallery section)
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 520);

      // Determine active section based on scroll offset
      const locationEl = document.getElementById('location');
      const reviewsEl = document.getElementById('reviews');
      const amenitiesEl = document.getElementById('amenities');

      if (locationEl && scrollY >= locationEl.offsetTop - 120) {
        setActiveTab('location');
      } else if (reviewsEl && scrollY >= reviewsEl.offsetTop - 120) {
        setActiveTab('reviews');
      } else if (amenitiesEl && scrollY >= amenitiesEl.offsetTop - 120) {
        setActiveTab('amenities');
      } else {
        setActiveTab('photos');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (tab: TabKey) => {
    setActiveTab(tab);
    if (tab === 'photos') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(tab);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 85;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className={`${styles.stickyBar} ${isVisible ? styles.visible : ''}`}
      aria-label="Listing quick navigation"
      role="navigation"
    >
      <div className={styles.container}>
        {/* Left: Navigation Tabs */}
        <div className={styles.navTabs}>
          <button
            type="button"
            onClick={() => scrollToSection('photos')}
            className={`${styles.tabButton} ${activeTab === 'photos' ? styles.tabActive : ''}`}
            aria-current={activeTab === 'photos' ? 'true' : undefined}
          >
            Photos
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('amenities')}
            className={`${styles.tabButton} ${activeTab === 'amenities' ? styles.tabActive : ''}`}
            aria-current={activeTab === 'amenities' ? 'true' : undefined}
          >
            Amenities
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('reviews')}
            className={`${styles.tabButton} ${activeTab === 'reviews' ? styles.tabActive : ''}`}
            aria-current={activeTab === 'reviews' ? 'true' : undefined}
          >
            Reviews
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('location')}
            className={`${styles.tabButton} ${activeTab === 'location' ? styles.tabActive : ''}`}
            aria-current={activeTab === 'location' ? 'true' : undefined}
          >
            Location
          </button>
        </div>

        {/* Right: Pricing Summary & Reserve CTA */}
        <div className={styles.rightSection}>
          <div className={styles.priceRatingInfo}>
            <div className={styles.priceRow}>
              <span className={styles.priceAmount}>
                {pricing.currencySymbol}{totalPrice.toLocaleString()}
              </span>
              <span className={styles.pricePeriod}>for {effectiveNights} nights</span>
            </div>
            <div className={styles.ratingRow}>
              <span className={styles.starIcon}>
                <StarIcon size={11} color="#222222" />
              </span>
              <span className={styles.ratingVal}>{rating.toFixed(2)}</span>
              <span className={styles.dot}>·</span>
              <button
                type="button"
                onClick={() => scrollToSection('reviews')}
                className={styles.reviewsText}
              >
                {reviewCount} reviews
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={onReserveClick}
            className={styles.reserveButton}
          >
            Reserve
          </button>
        </div>
      </div>
    </nav>
  );
};
