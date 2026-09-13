import React from 'react';
import styles from './ListingDetails.module.css';

interface LocationSectionProps {
  location: string;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ location }) => {
  return (
    <section className={styles.locationSection} id="location" aria-label="Location and neighborhood">
      <h3 className={styles.locationHeading}>Where you'll be</h3>
      <p className={styles.locationSubheading}>{location}, Goa, India</p>

      {/* Styled Interactive Location Map View */}
      <div className={styles.mapContainer}>
        <iframe
          title="Google Map of Candolim Goa"
          className={styles.mapIframe}
          src="https://maps.google.com/maps?q=Candolim,Goa,India&t=&z=14&ie=UTF8&iwloc=&output=embed"
          loading="lazy"
          allowFullScreen
        />
      </div>

      <div style={{ marginTop: '24px' }}>
        <h4 style={{ fontSize: '18px', fontWeight: 600, color: '#222222', marginBottom: '8px' }}>
          Neighbourhood highlights
        </h4>
        <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#222222', marginBottom: '12px' }}>
          Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.
        </p>
        <button
          type="button"
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            fontWeight: 600,
            textDecoration: 'underline',
            fontSize: '15px',
            color: '#222222',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          Show more <span>›</span>
        </button>
      </div>
    </section>
  );
};
