import React, { useState } from 'react';
import { PricingDetails } from '../../types/listing';
import { TagIcon, FlagIcon } from '../common/Icons';
import styles from './BookingCard.module.css';

interface BookingCardProps {
  pricing: PricingDetails;
  rating?: number;
  reviewCount?: number;
  maxGuests: number;
  startDate?: Date | null;
  endDate?: Date | null;
  nights?: number;
  onDatesClick?: () => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  pricing,
  maxGuests,
  startDate,
  endDate,
  nights = 5,
  onDatesClick,
}) => {
  const [guests, setGuests] = useState(2);
  const [isGuestPickerOpen, setIsGuestPickerOpen] = useState(false);
  const [reserved, setReserved] = useState(false);
  const [claimedPromo, setClaimedPromo] = useState(false);

  // Format dates
  const formatDateSlash = (date: Date | null): string => {
    if (!date) return 'Add date';
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    const y = date.getFullYear();
    return `${m}/${d}/${y}`;
  };

  const getCancellationDateStr = (): string => {
    if (!startDate) return '17 October';
    const c = new Date(startDate);
    c.setDate(c.getDate() - 1);
    return c.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
  };

  // Price calculations
  const effectiveNights = nights > 0 ? nights : 1;
  const baseTotal = pricing.pricePerNight * effectiveNights;
  const totalBeforeTaxes = baseTotal + pricing.cleaningFee + pricing.serviceFee;

  const handleReserve = () => {
    setReserved(true);
    setTimeout(() => setReserved(false), 3000);
  };

  return (
    <aside className={styles.stickyWrapper} aria-label="Booking and pricing sidebar">
      {/* 10% Off Promo Card matching Screenshot */}
      <div className={styles.promoCard}>
        <div className={styles.promoLeft}>
          <span className={styles.tagIconWrap}>
            <TagIcon size={18} color="#2e7d32" />
          </span>
          <div className={styles.promoTextWrap}>
            <span className={styles.promoTitle}>Get 10% off your next stay.</span>
            <button type="button" className={styles.termsLink}>
              Terms apply
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setClaimedPromo(!claimedPromo)}
          className={styles.claimBtn}
        >
          {claimedPromo ? 'Claimed' : 'Claim'}
        </button>
      </div>

      <div className={styles.card}>
        {/* Card Header */}
        <div className={styles.header}>
          <div className={styles.priceRow}>
            {nights > 0 ? (
              <>
                <span className={styles.priceAmount}>
                  {pricing.currencySymbol}{totalBeforeTaxes.toLocaleString()}
                </span>
                <span className={styles.pricePeriod}>for {nights} nights</span>
              </>
            ) : (
              <>
                <span className={styles.priceAmount}>
                  {pricing.currencySymbol}{pricing.pricePerNight.toLocaleString()}
                </span>
                <span className={styles.pricePeriod}>night</span>
              </>
            )}
          </div>
        </div>

        {/* Inputs Box (Dates & Guests) */}
        <div className={styles.inputsBox}>
          {/* Check-in / Checkout */}
          <div className={styles.datesRow} onClick={onDatesClick} role="button" tabIndex={0}>
            <div className={styles.dateCell}>
              <label htmlFor="check-in-select" className={styles.inputLabel}>CHECK-IN</label>
              <input
                id="check-in-select"
                type="text"
                readOnly
                value={formatDateSlash(startDate ?? null)}
                className={styles.inputValue}
              />
            </div>
            <div className={styles.dateCell}>
              <label htmlFor="check-out-select" className={styles.inputLabel}>CHECKOUT</label>
              <input
                id="check-out-select"
                type="text"
                readOnly
                value={formatDateSlash(endDate ?? null)}
                className={styles.inputValue}
              />
            </div>
          </div>

          {/* Guests dropdown */}
          <div className={styles.guestCell}>
            <button
              type="button"
              className={styles.guestButton}
              onClick={() => setIsGuestPickerOpen(!isGuestPickerOpen)}
              aria-expanded={isGuestPickerOpen}
              aria-haspopup="dialog"
            >
              <div className={styles.guestInfo}>
                <span className={styles.inputLabel}>GUESTS</span>
                <span className={styles.inputValue}>
                  {guests} guest{guests > 1 ? 's' : ''}
                </span>
              </div>
              <span className={styles.dropdownChevron} aria-hidden="true">
                {isGuestPickerOpen ? '▲' : '▼'}
              </span>
            </button>

            {/* Simple Guest Count Popup */}
            {isGuestPickerOpen && (
              <div className={styles.guestDropdown} role="dialog" aria-label="Select guest count">
                <div className={styles.guestControlRow}>
                  <div>
                    <p className={styles.guestControlTitle}>Adults & Children</p>
                    <p className={styles.guestControlSub}>Max {maxGuests} guests</p>
                  </div>
                  <div className={styles.stepperWrap}>
                    <button
                      type="button"
                      disabled={guests <= 1}
                      onClick={() => setGuests(guests - 1)}
                      className={styles.stepperBtn}
                      aria-label="Decrease guests"
                    >
                      −
                    </button>
                    <span className={styles.stepperVal}>{guests}</span>
                    <button
                      type="button"
                      disabled={guests >= maxGuests}
                      onClick={() => setGuests(guests + 1)}
                      className={styles.stepperBtn}
                      aria-label="Increase guests"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsGuestPickerOpen(false)}
                  className={styles.closeDropdownBtn}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Free Cancellation Banner matching Screenshot */}
        <div className={styles.freeCancellationBanner}>
          Free cancellation before <span className={styles.freeCancellationBold}>{getCancellationDateStr()}</span>
        </div>

        {/* Reserve CTA */}
        <button
          type="button"
          onClick={handleReserve}
          className={styles.reserveBtn}
        >
          {reserved ? 'Request to Book' : 'Reserve'}
        </button>

        <p className={styles.disclaimerText}>You won't be charged yet</p>
      </div>

      {/* Report this listing button */}
      <button type="button" className={styles.reportListingBtn}>
        <FlagIcon size={14} color="#717171" />
        <span>Report this listing</span>
      </button>
    </aside>
  );
};
