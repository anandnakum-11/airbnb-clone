import React, { useState } from 'react';
import { ShareIcon, HeartIcon } from '../common/Icons';
import styles from './TitleSection.module.css';

interface TitleSectionProps {
  title: string;
  rating?: number;
  reviewCount?: number;
  isSuperhost?: boolean;
  location?: string;
}

export const TitleSection: React.FC<TitleSectionProps> = ({
  title,
}) => {
  const [isSaved, setIsSaved] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <section className={styles.section} aria-label="Listing title and actions">
      <div className={styles.titleRow}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.actionsRight}>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={handleShare}
            aria-label="Share this listing"
          >
            <ShareIcon size={16} />
            <span className={styles.actionText}>{copied ? 'Link copied!' : 'Share'}</span>
          </button>

          <button
            type="button"
            className={styles.actionBtn}
            onClick={handleSave}
            aria-label={isSaved ? 'Remove from saved wishlist' : 'Save to wishlist'}
            aria-pressed={isSaved}
          >
            <HeartIcon size={16} filled={isSaved} />
            <span className={styles.actionText}>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
