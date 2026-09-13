import { test, expect } from '@playwright/test';

test.describe('Airbnb Listing Page (Desktop 1440px)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
  });

  test('loads listing details, header, and 5-photo hero mosaic', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Romantic Jacuzzi 1BHK Candolim/i);

    // Header logo exists
    const logo = page.locator('a[aria-label="Airbnb Home"]');
    await expect(logo).toBeVisible();

    // Listing h1
    const heading = page.locator('h1');
    await expect(heading).toContainText('Romantic Jacuzzi 1BHK Candolim | Mirashya UG10');

    // 5 photos in gallery
    const gallerySection = page.locator('section[aria-label="Listing photo gallery"]');
    await expect(gallerySection).toBeVisible();

    const heroImages = gallerySection.locator('img');
    await expect(heroImages).toHaveCount(5);

    // Each image must have descriptive alt text
    for (let i = 0; i < 5; i++) {
      const alt = await heroImages.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt!.length).toBeGreaterThan(15);
    }

    // Guest favourite banner exists
    const guestFav = page.locator('[aria-label="Guest favourite award"]');
    await expect(guestFav).toBeVisible();
    await expect(guestFav).toContainText('Guest');
    await expect(guestFav).toContainText('favourite');

    // Sticky booking card visible
    const bookingCard = page.locator('aside[aria-label="Booking and pricing sidebar"]');
    await expect(bookingCard).toBeVisible();
    await expect(bookingCard).toContainText('for 5 nights');
    await expect(bookingCard.getByRole('button', { name: /Reserve/i })).toBeVisible();
  });

  test('opens and navigates the Photo Tour view', async ({ page }) => {
    // Click "Show all photos"
    const showAllBtn = page.getByRole('button', { name: /Show all photos/i });
    await showAllBtn.click();

    // Photo tour modal dialog appears
    const tourModal = page.locator('div[role="dialog"][aria-label="Photo tour modal"]');
    await expect(tourModal).toBeVisible();

    // Check heading inside tour
    await expect(tourModal.getByRole('heading', { name: 'Photo tour' })).toBeVisible();

    // Close tour modal via Back button
    const backBtn = tourModal.getByRole('button', { name: /Close photo tour/i });
    await backBtn.click();
    await expect(tourModal).not.toBeVisible();
  });

  test('opens Lightbox from gallery, cycles photos with keyboard and arrows, closes with Escape', async ({ page }) => {
    // Click the first photo card (Living room 2 in GalleryGrid)
    const firstPhoto = page.locator('section[aria-label="Listing photo gallery"]').locator('[role="button"]').first();
    await firstPhoto.click();

    // Photo tour modal dialog appears and scrolls to room
    const tourModal = page.locator('div[role="dialog"][aria-label="Photo tour modal"]');
    await expect(tourModal).toBeVisible();

    // Click a photo inside the photo tour to open lightbox
    const roomPhoto = tourModal.locator('button[aria-label^="View photo:"]').first();
    await roomPhoto.click();

    // Lightbox modal dialog appears
    const lightbox = page.locator('div[role="dialog"][aria-label="Photo lightbox view"]');
    await expect(lightbox).toBeVisible();
    await expect(lightbox.locator('[aria-live="polite"]')).toContainText('of 29');

    // Get current counter number
    const initialText = await lightbox.locator('[aria-live="polite"]').innerText();
    const currentNum = parseInt(initialText.split(' of ')[0], 10);

    // Click Next button
    const nextBtn = lightbox.getByRole('button', { name: /Next photo/i });
    await nextBtn.click();
    await expect(lightbox.locator('[aria-live="polite"]')).toContainText(`${currentNum + 1} of 29`);

    // Press ArrowRight key
    await page.keyboard.press('ArrowRight');
    await expect(lightbox.locator('[aria-live="polite"]')).toContainText(`${currentNum + 2} of 29`);

    // Press ArrowLeft key
    await page.keyboard.press('ArrowLeft');
    await expect(lightbox.locator('[aria-live="polite"]')).toContainText(`${currentNum + 1} of 29`);

    // Press Escape key to close
    await page.keyboard.press('Escape');
    await expect(lightbox).not.toBeVisible();
  });

  test('opens and views amenities modal with category grouping', async ({ page }) => {
    const showAmenitiesBtn = page.getByRole('button', { name: /Show all \d+ amenities/i });
    await showAmenitiesBtn.scrollIntoViewIfNeeded();
    await showAmenitiesBtn.click();

    const amenitiesDialog = page.locator('div[role="dialog"][aria-label="All amenities"]');
    await expect(amenitiesDialog).toBeVisible();
    await expect(amenitiesDialog).toContainText('What this place offers');

    // Close via close button
    const closeBtn = amenitiesDialog.getByRole('button', { name: /Close amenities modal/i });
    await closeBtn.click();
    await expect(amenitiesDialog).not.toBeVisible();
  });

  test('displays sticky top bar on scroll with quick navigation and Reserve CTA', async ({ page }) => {
    const stickyNav = page.locator('nav[aria-label="Listing quick navigation"]');

    // Scroll down 700px past hero gallery
    await page.evaluate(() => window.scrollTo(0, 700));
    await page.waitForTimeout(400);

    // Sticky bar is visible
    await expect(stickyNav).toBeVisible();
    await expect(stickyNav.getByRole('button', { name: 'Photos', exact: true })).toBeVisible();
    await expect(stickyNav.getByRole('button', { name: 'Amenities', exact: true })).toBeVisible();
    await expect(stickyNav.getByRole('button', { name: 'Reviews', exact: true })).toBeVisible();
    await expect(stickyNav.getByRole('button', { name: 'Location', exact: true })).toBeVisible();

    // Contains Reserve button
    const stickyReserveBtn = stickyNav.getByRole('button', { name: 'Reserve', exact: true });
    await expect(stickyReserveBtn).toBeVisible();

    // Click Amenities tab in sticky header to jump
    await stickyNav.getByRole('button', { name: 'Amenities', exact: true }).click();
    await page.waitForTimeout(300);

    const amenitiesSection = page.locator('#amenities');
    await expect(amenitiesSection).toBeVisible();
  });
});

