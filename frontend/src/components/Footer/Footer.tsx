import React from 'react';
import { GlobeIcon } from '../common/Icons';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        {/* Columns Grid */}
        <div className={styles.columnsGrid}>
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Support</h4>
            <ul className={styles.linkList}>
              <li><a href="#help" className={styles.link}>Help Center</a></li>
              <li><a href="#aircover" className={styles.link}>AirCover</a></li>
              <li><a href="#anti-discrimination" className={styles.link}>Anti-discrimination</a></li>
              <li><a href="#disability-support" className={styles.link}>Disability support</a></li>
              <li><a href="#cancellation" className={styles.link}>Cancellation options</a></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Hosting</h4>
            <ul className={styles.linkList}>
              <li><a href="#airbnb-home" className={styles.link}>Airbnb your home</a></li>
              <li><a href="#aircover-hosts" className={styles.link}>AirCover for Hosts</a></li>
              <li><a href="#hosting-resources" className={styles.link}>Hosting resources</a></li>
              <li><a href="#community-forum" className={styles.link}>Community forum</a></li>
              <li><a href="#hosting-responsibly" className={styles.link}>Hosting responsibly</a></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Airbnb</h4>
            <ul className={styles.linkList}>
              <li><a href="#newsroom" className={styles.link}>Newsroom</a></li>
              <li><a href="#features" className={styles.link}>New features</a></li>
              <li><a href="#careers" className={styles.link}>Careers</a></li>
              <li><a href="#investors" className={styles.link}>Investors</a></li>
              <li><a href="#emergency" className={styles.link}>Airbnb.org emergency stays</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomLeft}>
            <span>© 2026 Airbnb, Inc.</span>
            <span className={styles.dot}>·</span>
            <a href="#privacy" className={styles.subLink}>Privacy</a>
            <span className={styles.dot}>·</span>
            <a href="#terms" className={styles.subLink}>Terms</a>
            <span className={styles.dot}>·</span>
            <a href="#sitemap" className={styles.subLink}>Sitemap</a>
            <span className={styles.dot}>·</span>
            <a href="#details" className={styles.subLink}>Company details</a>
          </div>

          <div className={styles.bottomRight}>
            <button type="button" className={styles.localeBtn}>
              <GlobeIcon size={16} />
              <span className={styles.localeText}>English (US)</span>
            </button>
            <button type="button" className={styles.currencyBtn}>
              <span>$ USD</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
