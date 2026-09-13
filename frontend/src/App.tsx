import React, { useState, useEffect } from 'react';
import { Listing, Photo } from './types/listing';
import { fallbackListing } from './data/mockListing';
import { Header } from './components/Header/Header';
import { StickyTopBar } from './components/Header/StickyTopBar';
import { TitleSection } from './components/ListingDetails/TitleSection';
import { GalleryGrid } from './components/Gallery/GalleryGrid';
import { PhotoTourModal } from './components/Gallery/PhotoTourModal';
import { LightboxModal } from './components/Gallery/LightboxModal';
import { HostOverview } from './components/ListingDetails/HostOverview';
import { GuestFavouriteBanner } from './components/ListingDetails/GuestFavouriteBanner';
import { Highlights } from './components/ListingDetails/Highlights';
import { DescriptionSection } from './components/ListingDetails/DescriptionSection';
import { SleepingArrangements } from './components/ListingDetails/SleepingArrangements';
import { AmenitiesSection } from './components/ListingDetails/AmenitiesSection';
import { CalendarSection } from './components/ListingDetails/CalendarSection';
import { ReviewsSection } from './components/ListingDetails/ReviewsSection';
import { LocationSection } from './components/ListingDetails/LocationSection';
import { MeetYourHost } from './components/ListingDetails/MeetYourHost';
import { ThingsToKnow } from './components/ListingDetails/ThingsToKnow';
import { MoreStaysNearby } from './components/ListingDetails/MoreStaysNearby';
import { BookingCard } from './components/BookingCard/BookingCard';
import styles from './App.module.css';

export const App: React.FC = () => {
  const [listing, setListing] = useState<Listing>(fallbackListing);
  const [loading, setLoading] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Interactive booking dates
  const [startDate, setStartDate] = useState<Date | null>(new Date(2026, 9, 18));
  const [endDate, setEndDate] = useState<Date | null>(new Date(2026, 9, 23));

  const handleDatesChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
  };

  const calculateNights = (): number => {
    if (!startDate || !endDate) return 0;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();

  // Focus restore tracking
  const [tourTrigger, setTourTrigger] = useState<HTMLElement | null>(null);
  const [lightboxTrigger, setLightboxTrigger] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Check initial URL query params for ?modal=PHOTO_TOUR_SCROLLABLE
    const params = new URLSearchParams(window.location.search);
    if (params.get('modal') === 'PHOTO_TOUR_SCROLLABLE') {
      setIsTourOpen(true);
      const modalItem = params.get('modalItem');
      if (modalItem) {
        const itemIdx = parseInt(modalItem, 10) - 1001;
        if (!isNaN(itemIdx) && itemIdx >= 0) {
          setCurrentPhotoIndex(itemIdx);
          setIsLightboxOpen(true);
        }
      }
    }

    const fetchListing = async () => {
      try {
        const res = await fetch('/api/listings/romantic-jacuzzi-1bhk-candolim');
        if (res.ok) {
          const data = await res.json();
          setListing(data);
        }
      } catch {
        // Fallback
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, []);

  const handleOpenTour = (targetRoomId?: string, triggerElement?: HTMLElement | null) => {
    if (triggerElement) {
      setTourTrigger(triggerElement);
    }
    setIsTourOpen(true);

    if (targetRoomId) {
      setTimeout(() => {
        const el = document.getElementById(`room-${targetRoomId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  };

  const handleCloseTour = () => {
    setIsTourOpen(false);
  };

  const handleSelectPhotoInTour = (index: number, _photo: Photo, triggerEl?: HTMLElement | null) => {
    setCurrentPhotoIndex(index);
    if (triggerEl) {
      setLightboxTrigger(triggerEl);
    }
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
  };

  const handleBackToTourFromLightbox = () => {
    setIsLightboxOpen(false);
    setIsTourOpen(true);
  };

  const handleReserveClick = () => {
    const bookingEl = document.getElementById('booking-sidebar');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.spinner} />
        <p>Loading listing details...</p>
      </div>
    );
  }

  return (
    <div className={styles.appWrapper}>
      {/* Sticky Top Bar that appears when scrolling past hero gallery */}
      <StickyTopBar
        pricing={listing.pricing}
        rating={listing.rating}
        reviewCount={listing.reviewCount}
        nights={nights}
        onReserveClick={handleReserveClick}
      />

      {/* Main Desktop Airbnb Header */}
      <Header />

      {/* Main Listing Viewport (Desktop 1440px / 1280px Grid) */}
      <main className={styles.mainContainer} id="main-content">
        {/* Title, Rating, Location, Share/Save */}
        <TitleSection
          title={listing.title}
          rating={listing.rating}
          reviewCount={listing.reviewCount}
          isSuperhost={listing.isSuperhost}
          location={listing.location.displayLocation}
        />

        {/* 5-Photo Hero Mosaic */}
        <GalleryGrid
          photos={listing.photos}
          onOpenTour={handleOpenTour}
        />

        {/* Two-Column Content Layout (7:4 Ratio) */}
        <div className={styles.contentColumns}>
          {/* Left Column: Details & Amenities */}
          <div className={styles.leftColumn}>
            <div className={styles.propertyHeader}>
              <h2 className={styles.propertyTitle}>
                {listing.propertyType} in {listing.location.displayLocation}
              </h2>
              <p className={styles.propertySubtitle}>
                {listing.capacity.guests} guests · {listing.capacity.bedrooms} bedroom · {listing.capacity.beds} bed · {listing.capacity.bathrooms} bathroom
              </p>
            </div>

            <GuestFavouriteBanner
              rating={listing.rating}
              reviewCount={listing.reviewCount}
            />

            <HostOverview
              host={listing.host}
            />

            <Highlights highlights={listing.highlights} />

            <DescriptionSection paragraphs={listing.description} />

            <SleepingArrangements spaces={listing.sleepingSpaces} />

            <AmenitiesSection
              amenities={listing.amenities}
              categories={listing.amenityCategories}
            />

            <CalendarSection
              startDate={startDate}
              endDate={endDate}
              onChangeDates={handleDatesChange}
              locationName={listing.location.city}
            />
          </div>

          {/* Right Column: Sticky Booking Card */}
          <div className={styles.rightColumn} id="booking-sidebar">
            <BookingCard
              pricing={listing.pricing}
              rating={listing.rating}
              reviewCount={listing.reviewCount}
              maxGuests={listing.capacity.guests}
              startDate={startDate}
              endDate={endDate}
              nights={nights}
              onDatesClick={() => {
                const el = document.getElementById('calendar-section');
                el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
            />
          </div>
        </div>

        {/* Reviews Section matching Image */}
        <ReviewsSection
          rating={listing.rating}
          reviewCount={listing.reviewCount}
        />

        {/* Location Section matching Image */}
        <LocationSection
          location={listing.location.displayLocation}
        />

        {/* Meet Your Host Section matching Image 2 */}
        <MeetYourHost />

        {/* Things To Know Section matching Image 3 */}
        <ThingsToKnow />

        {/* More Stays Nearby Section matching Image 3 */}
        <MoreStaysNearby />
      </main>

      {/* Photo Tour Modal (Show all photos view with top room tabs & scrollable sections) */}
      <PhotoTourModal
        photos={listing.photos}
        roomCategories={listing.roomCategories}
        isOpen={isTourOpen}
        onClose={handleCloseTour}
        onSelectPhoto={handleSelectPhotoInTour}
        triggerRef={tourTrigger}
      />

      {/* Accessible Lightbox Modal matching Image 3 */}
      <LightboxModal
        photos={listing.photos}
        currentIndex={currentPhotoIndex}
        isOpen={isLightboxOpen}
        onClose={handleCloseLightbox}
        onNavigate={setCurrentPhotoIndex}
        onBackToTour={handleBackToTourFromLightbox}
        triggerRef={lightboxTrigger}
      />
    </div>
  );
};
