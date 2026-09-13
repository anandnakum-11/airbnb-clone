import React, { useRef } from 'react';
import { Photo } from '../../types/listing';
import { GridNineDotsIcon } from '../common/Icons';
import { PhotoCard } from './PhotoCard';
import styles from './Gallery.module.css';

interface GalleryGridProps {
  photos: Photo[];
  onOpenTour: (targetRoomId?: string, triggerElement?: HTMLElement | null) => void;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  photos,
  onOpenTour,
}) => {
  const showAllBtnRef = useRef<HTMLButtonElement>(null);
  const displayPhotos = photos.slice(0, 5);

  if (!photos || photos.length === 0) {
    return <div className={styles.emptyGallery}>No photos available</div>;
  }

  const handleOpenTour = (roomId?: string) => {
    onOpenTour(roomId, showAllBtnRef.current);
  };

  return (
    <section className={styles.gallerySection} id="photos" aria-label="Listing photo gallery">
      <div className={styles.gridContainer}>
        {/* Main Hero Photo (Left) */}
        {displayPhotos[0] && (
          <PhotoCard
            photo={displayPhotos[0]}
            index={0}
            isHero={true}
            onClick={() => handleOpenTour(displayPhotos[0].roomId)}
            className={styles.heroItem}
          />
        )}

        {/* 4 Auxiliary Photos (Right 2x2 Grid) */}
        <div className={styles.quadGrid}>
          {displayPhotos.slice(1, 5).map((photo, i) => {
            const actualIndex = i + 1;
            const cornerClass =
              actualIndex === 2
                ? styles.topRightCorner
                : actualIndex === 4
                ? styles.bottomRightCorner
                : '';

            return (
              <PhotoCard
                key={photo.id}
                photo={photo}
                index={actualIndex}
                onClick={() => handleOpenTour(photo.roomId)}
                className={`${styles.quadItem} ${cornerClass}`}
              />
            );
          })}
        </div>

        {/* Floating "Show all photos" Button */}
        <button
          ref={showAllBtnRef}
          type="button"
          onClick={() => handleOpenTour()}
          className={styles.showAllButton}
          aria-label="Show all photos"
        >
          <GridNineDotsIcon size={16} />
          <span className={styles.showAllText}>Show all photos</span>
        </button>
      </div>
    </section>
  );
};
