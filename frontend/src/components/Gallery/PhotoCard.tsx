import React from 'react';
import { Photo } from '../../types/listing';
import styles from './Gallery.module.css';

interface PhotoCardProps {
  photo: Photo;
  index: number;
  onClick: () => void;
  className?: string;
  isHero?: boolean;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  photo,
  index,
  onClick,
  className = '',
  isHero = false,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`${styles.photoCard} ${isHero ? styles.heroCard : ''} ${className}`}
      aria-label={`View photo ${index + 1}: ${photo.alt}`}
    >
      <div className={styles.imageWrapper}>
        <img
          src={photo.url}
          alt={photo.alt}
          className={styles.image}
          loading={isHero ? 'eager' : 'lazy'}
        />
        <div className={styles.imageOverlay} />
      </div>
    </div>
  );
};
