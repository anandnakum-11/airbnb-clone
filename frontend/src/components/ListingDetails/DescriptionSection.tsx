import React, { useState } from 'react';
import styles from './ListingDetails.module.css';

interface DescriptionSectionProps {
  paragraphs: string[];
}

export const DescriptionSection: React.FC<DescriptionSectionProps> = ({ paragraphs }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedParagraphs = isExpanded ? paragraphs : paragraphs.slice(0, 2);

  return (
    <>
      {/* Auto-Translation Notice Banner */}
      <div className={styles.translateBanner}>
        <span className={styles.translateText}>Some info has been automatically translated. </span>
        <button type="button" className={styles.showOriginalLink}>
          Show original
        </button>
      </div>

      {/* Main Listing Description */}
      <section className={styles.descriptionSection} aria-label="About this space">
        <h3 className={styles.sectionHeading}>About this space</h3>
        {displayedParagraphs.map((para, idx) => (
          <p key={idx} className={styles.descParagraph}>
            {para}
          </p>
        ))}

        {paragraphs.length > 2 && (
          <button
            type="button"
            className={styles.showMoreBtn}
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
          >
            {isExpanded ? 'Show less' : 'Show more'}
            <span aria-hidden="true">{isExpanded ? ' ⌃' : ' ›'}</span>
          </button>
        )}
      </section>
    </>
  );
};
