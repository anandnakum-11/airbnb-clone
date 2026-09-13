import React, { useState } from 'react';
import { FocusTrap } from '../common/FocusTrap';
import { CloseIcon } from '../common/Icons';
import { AmenityCategory } from '../../types/listing';
import styles from './ListingDetails.module.css';

interface AmenitiesSectionProps {
  amenities: string[];
  categories?: AmenityCategory[];
}

export const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({
  amenities,
  categories = [],
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // SVG render helper for common amenities
  const renderAmenitySvg = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('ocean') || lower.includes('view')) {
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 12c2.5-3 5.5-3 8 0s5.5 3 8 0 5.5-3 8 0M2 18c2.5-3 5.5-3 8 0s5.5 3 8 0 5.5-3 8 0" />
        </svg>
      );
    }
    if (lower.includes('pool') || lower.includes('hot tub')) {
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 20a4 4 0 0 0 8 0 4 4 0 0 0 8 0 4 4 0 0 0 4 0M7 4a3 3 0 1 1 6 0v7a2 2 0 1 1-4 0" />
        </svg>
      );
    }
    if (lower.includes('wifi')) {
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
        </svg>
      );
    }
    if (lower.includes('kitchen')) {
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 2v20M6 2v6a3 3 0 0 0 6 0V2M9 8v14" />
        </svg>
      );
    }
    if (lower.includes('parking') || lower.includes('ev')) {
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
        </svg>
      );
    }
    if (lower.includes('fireplace')) {
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      );
    }
    if (lower.includes('air conditioning') || lower.includes('cooling')) {
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 5H7M17 19H7M2 12h20M5 7l14 10M19 7 5 17" />
        </svg>
      );
    }
    if (lower.includes('workspace') || lower.includes('desk')) {
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      );
    }
    // Default check icon
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m5 13 4 4L19 7" />
      </svg>
    );
  };

  const previewAmenities = amenities.slice(0, 10);

  return (
    <section className={styles.amenitiesSection} id="amenities" aria-label="What this place offers">
      <h3 className={styles.sectionHeading}>What this place offers</h3>
      <div className={styles.amenitiesGrid}>
        {previewAmenities.map((amenity, idx) => (
          <div key={idx} className={styles.amenityItem}>
            <span className={styles.amenityIcon} aria-hidden="true">
              {renderAmenitySvg(amenity)}
            </span>
            <span>{amenity}</span>
          </div>
        ))}
      </div>

      <button
        type="button"
        className={styles.showAmenitiesBtn}
        onClick={() => setIsModalOpen(true)}
      >
        Show all {amenities.length} amenities
      </button>

      {/* Amenities Modal */}
      {isModalOpen && (
        <FocusTrap onEscape={() => setIsModalOpen(false)}>
          <div
            className={styles.amenitiesModalBackdrop}
            role="dialog"
            aria-modal="true"
            aria-label="All amenities"
          >
            <div className={styles.amenitiesModalCard}>
              <div className={styles.amenitiesModalHeader}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={styles.amenitiesCloseBtn}
                  aria-label="Close amenities modal"
                >
                  <CloseIcon size={16} />
                </button>
                <h2 className={styles.amenitiesModalTitle}>What this place offers</h2>
              </div>
              <div className={styles.amenitiesModalBody}>
                {categories.length > 0 ? (
                  categories.map((cat, i) => (
                    <div key={i} className={styles.categoryBlock}>
                      <h4 className={styles.categoryTitle}>{cat.category}</h4>
                      <div className={styles.categoryItems}>
                        {cat.items.map((item, j) => (
                          <div key={j} className={styles.categoryItem}>
                            <span className={styles.amenityIcon} aria-hidden="true">
                              {renderAmenitySvg(item.name)}
                            </span>
                            <div>
                              <p className={styles.categoryItemName}>{item.name}</p>
                              {item.description && (
                                <p className={styles.categoryItemDesc}>{item.description}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.categoryItems}>
                    {amenities.map((a, k) => (
                      <div key={k} className={styles.categoryItem}>
                        <span className={styles.amenityIcon} aria-hidden="true">
                          {renderAmenitySvg(a)}
                        </span>
                        <p className={styles.categoryItemName}>{a}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </FocusTrap>
      )}
    </section>
  );
};
