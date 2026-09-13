import React, { useEffect, useRef } from 'react';
import { Photo } from '../../types/listing';
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon, GridNineDotsIcon } from '../common/Icons';
import styles from './Gallery.module.css';

interface LightboxModalProps {
  photos: Photo[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  onBackToTour?: () => void;
  triggerRef?: HTMLElement | null;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  onBackToTour,
  triggerRef,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const currentPhoto = photos[currentIndex] || photos[0];
  const total = photos.length;

  const handlePrev = () => {
    onNavigate((currentIndex - 1 + total) % total);
  };

  const handleNext = () => {
    onNavigate((currentIndex + 1) % total);
  };

  // Handle open/close side effects & focus management
  useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add('modal-open');
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      clearTimeout(timer);
      if (!document.querySelector(`.${styles.tourBackdrop}`)) {
        document.body.classList.remove('modal-open');
      }

      // Remove modalItem on close, retaining tour modal query if active
      const url = new URL(window.location.href);
      url.searchParams.delete('modalItem');
      window.history.pushState({}, '', url.toString());

      if (triggerRef && typeof triggerRef.focus === 'function') {
        triggerRef.focus();
      }
    };
  }, [isOpen, triggerRef]);

  // Handle URL syncing for current active photo
  useEffect(() => {
    if (!isOpen) return;

    const url = new URL(window.location.href);
    url.searchParams.set('modal', 'PHOTO_TOUR_SCROLLABLE');
    url.searchParams.set('modalItem', String(1001 + currentIndex));
    window.history.pushState({}, '', url.toString());
  }, [isOpen, currentIndex]);

  // Handle keyboard events (Escape, ArrowLeft, ArrowRight, Tab trapping)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopImmediatePropagation();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, total, onClose]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      className={styles.lightboxBackdropLight}
      role="dialog"
      aria-modal="true"
      aria-label="Photo lightbox view"
      ref={modalRef}
    >
      {/* Top Header Bar matching Image 3 */}
      <div className={styles.lightboxTopBarLight}>
        {/* Left: 9-dot grid icon */}
        <button
          type="button"
          onClick={onBackToTour || onClose}
          className={styles.lightboxGridIconBtn}
          aria-label="Show all photos in tour"
        >
          <GridNineDotsIcon size={18} color="#222222" />
        </button>

        {/* Center: Current room name */}
        <div className={styles.lightboxCenterTitle}>
          {currentPhoto.room}
        </div>

        {/* Right: Counter and close button */}
        <div className={styles.lightboxRightControls}>
          <span className={styles.lightboxCounterText} aria-live="polite">
            {currentIndex + 1} of {total}
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className={styles.lightboxCloseIconBtn}
            aria-label="Close photo view"
          >
            <CloseIcon size={16} color="#222222" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className={styles.lightboxStageLight}>
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          className={`${styles.lightboxCircleNavBtn} ${styles.lightboxCircleNavPrev}`}
          aria-label="Previous photo"
        >
          <ChevronLeftIcon size={18} color="#222222" />
        </button>

        {/* Center Image Container */}
        <div className={styles.lightboxImageContainerLight}>
          <img
            key={currentPhoto.id}
            src={currentPhoto.url}
            alt={currentPhoto.alt}
            className={styles.lightboxImageElement}
          />
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          className={`${styles.lightboxCircleNavBtn} ${styles.lightboxCircleNavNext}`}
          aria-label="Next photo"
        >
          <ChevronRightIcon size={18} color="#222222" />
        </button>
      </div>
    </div>
  );
};
