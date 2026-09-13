import { Router, Request, Response } from 'express';
import { mockListing } from '../data/listing.mock.js';

export const listingRouter = Router();

// GET all listings (summary)
listingRouter.get('/listings', (_req: Request, res: Response) => {
  res.json([
    {
      id: mockListing.id,
      title: mockListing.title,
      subtitle: mockListing.subtitle,
      location: mockListing.location,
      rating: mockListing.rating,
      reviewCount: mockListing.reviewCount,
      isSuperhost: mockListing.isSuperhost,
      pricing: mockListing.pricing,
      heroPhoto: mockListing.photos[0],
      totalPhotos: mockListing.photos.length,
    },
  ]);
});

// GET listing by ID
listingRouter.get('/listings/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  if (id === mockListing.id || id === 'current' || id === 'default') {
    res.json(mockListing);
    return;
  }
  res.status(404).json({ error: `Listing with id '${id}' not found` });
});

// GET photo by ID
listingRouter.get('/photos/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const photo = mockListing.photos.find((p) => p.id === id);
  if (photo) {
    res.json(photo);
    return;
  }
  res.status(404).json({ error: `Photo with id '${id}' not found` });
});
