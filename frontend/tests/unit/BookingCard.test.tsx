import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BookingCard } from '../../src/components/BookingCard/BookingCard';
import { fallbackListing } from '../../src/data/mockListing';

describe('BookingCard component', () => {
  it('renders pricing information and reserve button', () => {
    render(
      <BookingCard
        pricing={fallbackListing.pricing}
        rating={fallbackListing.rating}
        reviewCount={fallbackListing.reviewCount}
        maxGuests={fallbackListing.capacity.guests}
      />
    );

    // Nightly price
    expect(screen.getByText(`₹${fallbackListing.pricing.pricePerNight.toLocaleString()}`)).toBeInTheDocument();

    // Reserve button
    const reserveButton = screen.getByRole('button', { name: /Reserve/i });
    expect(reserveButton).toBeInTheDocument();

    // Rating & reviews
    expect(screen.getByText('4.97')).toBeInTheDocument();
    expect(screen.getByText('33 reviews')).toBeInTheDocument();
  });

  it('calculates price totals accurately based on nights', () => {
    render(
      <BookingCard
        pricing={fallbackListing.pricing}
        rating={fallbackListing.rating}
        reviewCount={fallbackListing.reviewCount}
        maxGuests={fallbackListing.capacity.guests}
      />
    );

    // Default 5 nights: 4250 * 5 = 21250 + 500 + 620 = 22370
    expect(screen.getByText('₹21,250')).toBeInTheDocument();
    expect(screen.getByText('₹500')).toBeInTheDocument();
    expect(screen.getByText('₹620')).toBeInTheDocument();
    expect(screen.getByText('₹22,370')).toBeInTheDocument();
  });

  it('updates reserve button feedback on click', () => {
    render(
      <BookingCard
        pricing={fallbackListing.pricing}
        rating={fallbackListing.rating}
        reviewCount={fallbackListing.reviewCount}
        maxGuests={fallbackListing.capacity.guests}
      />
    );

    const reserveButton = screen.getByRole('button', { name: /Reserve/i });
    fireEvent.click(reserveButton);

    expect(screen.getByText(/Reservation Requested!/i)).toBeInTheDocument();
  });
});
