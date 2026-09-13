import React from 'react';
import { HighlightItem } from '../../types/listing';
import { SparklesIcon, DoorIcon, StarIcon, LocationPinIcon, OutdoorGrillIcon, CoolingFanIcon } from '../common/Icons';
import styles from './ListingDetails.module.css';

interface HighlightsProps {
  highlights: HighlightItem[];
}

export const Highlights: React.FC<HighlightsProps> = ({ highlights }) => {
  const renderIcon = (icon: HighlightItem['icon']) => {
    switch (icon) {
      case 'outdoor':
        return <OutdoorGrillIcon size={24} />;
      case 'cooling':
        return <CoolingFanIcon size={24} />;
      case 'door':
        return <DoorIcon size={24} />;
      case 'sparkles':
        return <SparklesIcon size={24} />;
      case 'star':
        return <StarIcon size={24} color="#222222" />;
      case 'location':
        return <LocationPinIcon size={24} />;
      default:
        return <SparklesIcon size={24} />;
    }
  };

  return (
    <div className={styles.highlightsList}>
      {highlights.map((item) => (
        <div key={item.id} className={styles.highlightItem}>
          <div className={styles.highlightIcon} aria-hidden="true">
            {renderIcon(item.icon)}
          </div>
          <div className={styles.highlightText}>
            <h3 className={styles.highlightTitle}>{item.title}</h3>
            <p className={styles.highlightDesc}>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
