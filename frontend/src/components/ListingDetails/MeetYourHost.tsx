import React from 'react';
import styles from './ListingDetails.module.css';

export const MeetYourHost: React.FC = () => {
  const coHosts = [
    { name: 'Sharath', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80' },
    { name: 'Aman Dev Pahwa', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80' },
    { name: 'Maria Karen Priyanka', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80' },
    { name: 'Simran', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80' },
    { name: 'Pallavi', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80' },
    { name: 'Sanyukta', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80' },
    { name: 'Shruti', initial: 'S', bg: '#fce4ec', color: '#c2185b' },
    { name: 'Amisha', initial: 'A', bg: '#e3f2fd', color: '#1976d2' },
  ];

  return (
    <section className={styles.meetHostSection} aria-label="Meet your host">
      <h3 className={styles.meetHostHeading}>Meet your host</h3>

      <div className={styles.meetHostGrid}>
        {/* Left Card: Host Profile & Stats */}
        <div className={styles.hostProfileColumn}>
          <div className={styles.hostBadgeCard}>
            <div className={styles.hostCardLeft}>
              <div className={styles.hostAvatarCircle}>
                <div className={styles.hostLogoInner}>
                  <span>MIRASHYA</span>
                  <span style={{ fontSize: '7px', letterSpacing: '1px' }}>HOMES</span>
                </div>
                <span className={styles.verifiedBadgeIcon}>✓</span>
              </div>
              <h4 className={styles.hostCardName}>Mirashya Homes</h4>
              <p className={styles.hostCardRole}>Host</p>
            </div>

            <div className={styles.hostStatsRight}>
              <div className={styles.hostStatItem}>
                <span className={styles.hostStatNumber}>1,463</span>
                <span className={styles.hostStatLabel}>Reviews</span>
              </div>
              <div className={styles.hostStatDivider} />
              <div className={styles.hostStatItem}>
                <span className={styles.hostStatNumber}>4.68★</span>
                <span className={styles.hostStatLabel}>Rating</span>
              </div>
              <div className={styles.hostStatDivider} />
              <div className={styles.hostStatItem}>
                <span className={styles.hostStatNumber}>2</span>
                <span className={styles.hostStatLabel}>Years hosting</span>
              </div>
            </div>
          </div>

          {/* Host Personal Facts */}
          <div className={styles.hostFactsList}>
            <div className={styles.hostFactItem}>
              <span className={styles.hostFactIcon}>🎈</span>
              <span>Born in the 80s</span>
            </div>
            <div className={styles.hostFactItem}>
              <span className={styles.hostFactIcon}>🎓</span>
              <span>Where I went to school: NICMAR GOA</span>
            </div>
          </div>
        </div>

        {/* Right Column: Co-Hosts & Host Details */}
        <div className={styles.hostDetailsColumn}>
          <h4 className={styles.coHostsHeading}>Co-Hosts</h4>
          <div className={styles.coHostsGrid}>
            {coHosts.map((co, idx) => (
              <div key={idx} className={styles.coHostItem}>
                {co.avatar ? (
                  <img
                    src={co.avatar}
                    alt={co.name}
                    className={styles.coHostAvatar}
                    loading="lazy"
                  />
                ) : (
                  <div
                    className={styles.coHostInitialAvatar}
                    style={{ backgroundColor: co.bg, color: co.color }}
                  >
                    {co.initial}
                  </div>
                )}
                <span className={styles.coHostName}>{co.name}</span>
              </div>
            ))}
          </div>

          <div className={styles.hostDetailMeta}>
            <h4 className={styles.hostMetaHeading}>Host details</h4>
            <p className={styles.hostMetaText}>Response rate: 100%</p>
            <p className={styles.hostMetaText}>Responds within an hour</p>
          </div>

          <button type="button" className={styles.messageHostBtn}>
            Message host
          </button>

          <div className={styles.securityNotice}>
            <span className={styles.securityShieldIcon}>🛡️</span>
            <p className={styles.securityText}>
              To help protect your payment, always use Airbnb to send money and communicate with hosts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
