import React from 'react';
import { AirbnbLogo, HouseWithTreeIcon, GlobeIcon, MenuIcon } from '../common/Icons';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.container}>
        {/* Brand Logo matching Airbnb reference */}
        <a href="/" className={styles.logoLink} aria-label="Airbnb Home">
          <AirbnbLogo size={34} color="#FF385C" />
          <span className={styles.logoText}>airbnb</span>
        </a>

        {/* Center Pill Search Bar (Desktop) */}
        <div className={styles.searchBar} role="search">
          <button type="button" className={styles.searchButton}>
            <HouseWithTreeIcon size={20} className={styles.houseIcon} />
            <span className={styles.searchItemBold}>Anywhere</span>
            <span className={styles.searchDivider} />
            <span className={styles.searchItemBold}>Anytime</span>
            <span className={styles.searchDivider} />
            <span className={styles.searchItemMuted}>Add guests</span>
            <span className={styles.searchIconCircle} aria-hidden="true">
              <svg viewBox="0 0 32 32" width="13" height="13" fill="none" stroke="#FFFFFF" strokeWidth="4">
                <circle cx="12" cy="12" r="9" />
                <line x1="18.5" y1="18.5" x2="28" y2="28" />
              </svg>
            </span>
          </button>
        </div>

        {/* Right Menu Controls */}
        <div className={styles.rightSection}>
          <button type="button" className={styles.hostButton}>
            Become a host
          </button>
          <button
            type="button"
            className={styles.globeButton}
            aria-label="Choose a language and currency"
          >
            <GlobeIcon size={18} />
          </button>
          <button
            type="button"
            className={styles.menuCircleButton}
            aria-label="Main navigation menu"
            aria-haspopup="true"
          >
            <MenuIcon size={16} color="#222222" />
          </button>
        </div>
      </div>
    </header>
  );
};
