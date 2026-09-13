import React, { useEffect, useRef } from 'react';
import { Photo, RoomCategory } from '../../types/listing';
import { ChevronLeftIcon, ShareIcon, HeartIcon } from '../common/Icons';
import styles from './Gallery.module.css';

interface PhotoTourModalProps {
  photos: Photo[];
  roomCategories?: RoomCategory[];
  isOpen: boolean;
  onClose: () => void;
  onSelectPhoto: (photoIndex: number, photo: Photo) => void;
  triggerRef?: HTMLElement | null;
}

export const PhotoTourModal: React.FC<PhotoTourModalProps> = ({
  photos,
  roomCategories = [],
  isOpen,
  onClose,
  onSelectPhoto,
  triggerRef,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backBtnRef = useRef<HTMLButtonElement>(null);

  // Group photos into room categories if not passed directly
  const categories: RoomCategory[] =
    roomCategories.length > 0
      ? roomCategories
      : Array.from(new Set(photos.map((p) => p.room))).map((roomName) => {
          const roomPhotos = photos.filter((p) => p.room === roomName);
          const slug = roomName.toLowerCase().replace(/\s+/g, '-');
          return {
            id: slug,
            title: roomName,
            coverPhoto: roomPhotos[0]?.url || '',
            amenitiesDescription: 'Air conditioning · Fast Wi-Fi · Clean linens',
            photos: roomPhotos,
          };
        });

  // Handle URL sync
  useEffect(() => {
    if (!isOpen) return;

    // Update URL to ?modal=PHOTO_TOUR_SCROLLABLE
    const url = new URL(window.location.href);
    url.searchParams.set('modal', 'PHOTO_TOUR_SCROLLABLE');
    window.history.pushState({}, '', url.toString());

    document.body.classList.add('modal-open');
    const timer = setTimeout(() => {
      backBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.querySelector(`.${styles.lightboxBackdropLight}`)) {
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');

      // Clear search param on close
      const closeUrl = new URL(window.location.href);
      closeUrl.searchParams.delete('modal');
      closeUrl.searchParams.delete('modalItem');
      window.history.pushState({}, '', closeUrl.toString());

      if (triggerRef && typeof triggerRef.focus === 'function') {
        triggerRef.focus();
      }
    };
  }, [isOpen, onClose, triggerRef]);

  const scrollToRoom = (roomId: string) => {
    const el = document.getElementById(`room-${roomId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.tourBackdrop}
      role="dialog"
      aria-modal="true"
      aria-label="Photo tour modal"
      ref={modalRef}
    >
      {/* Top Header Bar */}
      <header className={styles.tourHeader}>
        <div className={styles.tourHeaderLeft}>
          <button
            ref={backBtnRef}
            type="button"
            onClick={onClose}
            className={styles.tourBackBtn}
            aria-label="Close photo tour and return to listing"
          >
            <ChevronLeftIcon size={18} />
          </button>
        </div>

        <div className={styles.tourHeaderCenter}>
          <h1 className={styles.tourHeaderTitle}>Photo tour</h1>
        </div>

        <div className={styles.tourHeaderRight}>
          <button
            type="button"
            className={styles.tourActionBtn}
            aria-label="Share listing photos"
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
          >
            <ShareIcon size={16} />
          </button>
          <button
            type="button"
            className={styles.tourActionBtn}
            aria-label="Save to wishlist"
          >
            <HeartIcon size={16} />
          </button>
        </div>
      </header>

      {/* Main Scrollable Body */}
      <div className={styles.tourScrollableBody}>
        {/* Top Room Thumbnails Selector Grid */}
        <section className={styles.topRoomsSection} aria-label="Room categories">
          <div className={styles.topRoomsGrid}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={styles.roomThumbCard}
                onClick={() => scrollToRoom(cat.id)}
                aria-label={`Jump to ${cat.title}`}
              >
                <div className={styles.roomThumbImageWrap}>
                  <img
                    src={cat.coverPhoto}
                    alt={cat.title}
                    className={styles.roomThumbImg}
                    loading="lazy"
                  />
                </div>
                <span className={styles.roomThumbLabel}>{cat.title}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Room By Room Scrollable Sections */}
        <main className={styles.roomSectionsContainer}>
          {categories.map((cat) => (
            <section
              key={cat.id}
              id={`room-${cat.id}`}
              className={styles.roomSectionBlock}
              aria-label={cat.title}
            >
              {/* Left Column: Title & Amenities */}
              <div className={styles.roomMetaColumn}>
                <h2 className={styles.roomSectionTitle}>{cat.title}</h2>
                <p className={styles.roomAmenitiesText}>{cat.amenitiesDescription}</p>
              </div>

              {/* Right Column: Room Photos Grid */}
              <div className={styles.roomPhotosColumn}>
                {cat.photos.map((photo, pIdx) => {
                  const globalPhotoIndex = photos.findIndex((p) => p.id === photo.id || p.url === photo.url);
                  const isFirst = pIdx === 0;
                  const isPair = cat.photos.length >= 3 && pIdx >= 1;

                  return (
                    <button
                      key={photo.id}
                      type="button"
                      className={`${styles.roomPhotoItem} ${isFirst && cat.photos.length > 1 ? styles.fullWidthPhoto : ''} ${isPair ? styles.halfWidthPhoto : ''}`}
                      onClick={() => onSelectPhoto(globalPhotoIndex >= 0 ? globalPhotoIndex : 0, photo)}
                      aria-label={`View photo: ${photo.alt}`}
                    >
                      <img
                        src={photo.url}
                        alt={photo.alt}
                        className={styles.roomPhotoImg}
                        loading="lazy"
                      />
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
};
