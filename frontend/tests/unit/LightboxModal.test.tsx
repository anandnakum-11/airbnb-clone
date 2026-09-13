import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LightboxModal } from '../../src/components/Gallery/LightboxModal';
import { fallbackListing } from '../../src/data/mockListing';

describe('LightboxModal component', () => {
  it('renders nothing when isOpen is false', () => {
    const onClose = vi.fn();
    const onNavigate = vi.fn();

    render(
      <LightboxModal
        photos={fallbackListing.photos}
        currentIndex={0}
        isOpen={false}
        onClose={onClose}
        onNavigate={onNavigate}
      />
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders modal dialog with correct accessibility attributes when open', () => {
    const onClose = vi.fn();
    const onNavigate = vi.fn();

    render(
      <LightboxModal
        photos={fallbackListing.photos}
        currentIndex={0}
        isOpen={true}
        onClose={onClose}
        onNavigate={onNavigate}
      />
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-label', 'Photo lightbox view');

    // Counter check
    expect(screen.getByText(`1 of ${fallbackListing.photos.length}`)).toBeInTheDocument();

    // Close button
    const closeBtn = screen.getByRole('button', { name: /Close photo view/i });
    expect(closeBtn).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    const onNavigate = vi.fn();

    render(
      <LightboxModal
        photos={fallbackListing.photos}
        currentIndex={0}
        isOpen={true}
        onClose={onClose}
        onNavigate={onNavigate}
      />
    );

    const closeBtn = screen.getByRole('button', { name: /Close photo view/i });
    fireEvent.click(closeBtn);

    expect(onClose).toHaveBeenCalled();
  });

  it('calls onNavigate with next index when next button is clicked', () => {
    const onClose = vi.fn();
    const onNavigate = vi.fn();

    render(
      <LightboxModal
        photos={fallbackListing.photos}
        currentIndex={2}
        isOpen={true}
        onClose={onClose}
        onNavigate={onNavigate}
      />
    );

    const nextBtn = screen.getByRole('button', { name: /Next photo/i });
    fireEvent.click(nextBtn);

    expect(onNavigate).toHaveBeenCalledWith(3);
  });

  it('calls onNavigate with previous index when prev button is clicked', () => {
    const onClose = vi.fn();
    const onNavigate = vi.fn();

    render(
      <LightboxModal
        photos={fallbackListing.photos}
        currentIndex={2}
        isOpen={true}
        onClose={onClose}
        onNavigate={onNavigate}
      />
    );

    const prevBtn = screen.getByRole('button', { name: /Previous photo/i });
    fireEvent.click(prevBtn);

    expect(onNavigate).toHaveBeenCalledWith(1);
  });

  it('responds to keyboard events: Escape to close, ArrowRight/Left to navigate', () => {
    const onClose = vi.fn();
    const onNavigate = vi.fn();

    render(
      <LightboxModal
        photos={fallbackListing.photos}
        currentIndex={0}
        isOpen={true}
        onClose={onClose}
        onNavigate={onNavigate}
      />
    );

    // Escape closes
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();

    // ArrowRight navigates
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(onNavigate).toHaveBeenCalledWith(1);

    // ArrowLeft wraps around to last photo
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(onNavigate).toHaveBeenCalledWith(fallbackListing.photos.length - 1);
  });
});
