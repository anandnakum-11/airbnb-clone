import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GalleryGrid } from '../../src/components/Gallery/GalleryGrid';
import { fallbackListing } from '../../src/data/mockListing';

describe('GalleryGrid component', () => {
  it('renders the 5 display photos with descriptive alt text', () => {
    const onOpenTour = vi.fn();

    render(
      <GalleryGrid
        photos={fallbackListing.photos}
        onOpenTour={onOpenTour}
      />
    );

    // Should display the 5 visible photos
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(5);

    // Check first photo alt text
    expect(images[0]).toHaveAttribute('alt', fallbackListing.photos[0].alt);

    // Check "Show all photos" button
    const showAllButton = screen.getByRole('button', {
      name: new RegExp(`Show all ${fallbackListing.photos.length} photos`, 'i'),
    });
    expect(showAllButton).toBeInTheDocument();
  });

  it('triggers onOpenTour with roomId when clicking an image', () => {
    const onOpenTour = vi.fn();

    render(
      <GalleryGrid
        photos={fallbackListing.photos}
        onOpenTour={onOpenTour}
      />
    );

    const firstCard = screen.getByLabelText(new RegExp(`View photo 1:`, 'i'));
    fireEvent.click(firstCard);

    expect(onOpenTour).toHaveBeenCalledWith(fallbackListing.photos[0].roomId, expect.anything());
  });

  it('triggers onOpenTour when clicking Show all photos button', () => {
    const onOpenTour = vi.fn();

    render(
      <GalleryGrid
        photos={fallbackListing.photos}
        onOpenTour={onOpenTour}
      />
    );

    const showAllButton = screen.getByRole('button', {
      name: new RegExp(`Show all ${fallbackListing.photos.length} photos`, 'i'),
    });
    fireEvent.click(showAllButton);

    expect(onOpenTour).toHaveBeenCalled();
  });
});
