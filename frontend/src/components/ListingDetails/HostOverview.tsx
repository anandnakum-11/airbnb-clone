import React, { useState } from 'react';
import { HostInfo } from '../../types/listing';
import styles from './ListingDetails.module.css';

interface HostOverviewProps {
  host: HostInfo;
}

export const HostOverview: React.FC<HostOverviewProps> = ({ host }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={styles.hostRow} aria-label={`Host details for ${host.name}`}>
      <div className={styles.hostAvatarWrapper}>
        {!imgError ? (
          <img
            src={host.avatar}
            alt={host.name}
            className={styles.hostAvatar}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#13382c',
              color: '#d4af37',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: 700,
              textAlign: 'center',
              letterSpacing: '0.5px',
              padding: '2px',
            }}
          >
            MIRASHYA
          </div>
        )}
      </div>

      <div className={styles.hostMeta}>
        <span className={styles.hostedByName}>Hosted by {host.name}</span>
        <span className={styles.hostingDuration}>{host.joinedDate}</span>
      </div>
    </div>
  );
};
