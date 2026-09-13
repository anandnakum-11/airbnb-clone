export interface Photo {
  id: string;
  url: string;
  room: string;
  roomId: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface RoomCategory {
  id: string;
  title: string;
  coverPhoto: string;
  amenitiesDescription: string;
  photos: Photo[];
}

export interface HostInfo {
  name: string;
  avatar: string;
  badge: string;
  joinedDate: string;
  coHosts?: string[];
  isSuperhost: boolean;
}

export interface HighlightItem {
  id: string;
  icon: 'star' | 'door' | 'calendar' | 'wifi' | 'sparkles' | 'location' | 'outdoor' | 'cooling';
  title: string;
  description: string;
}

export interface SleepingSpace {
  id: string;
  roomName: string;
  bedType: string;
  icon: 'bed' | 'double-bed' | 'sofa';
  image?: string;
}

export interface AmenityCategory {
  category: string;
  items: {
    name: string;
    description?: string;
    icon: string;
    available: boolean;
  }[];
}

export interface PricingDetails {
  pricePerNight: number;
  cleaningFee: number;
  serviceFee: number;
  currency: string;
  currencySymbol: string;
}

export interface Listing {
  id: string;
  title: string;
  subtitle: string;
  location: {
    city: string;
    region: string;
    country: string;
    displayLocation: string;
  };
  rating: number;
  reviewCount: number;
  isSuperhost: boolean;
  propertyType: string;
  capacity: {
    guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
  };
  host: HostInfo;
  highlights: HighlightItem[];
  description: string[];
  sleepingSpaces: SleepingSpace[];
  amenityCategories: AmenityCategory[];
  amenities: string[];
  pricing: PricingDetails;
  photos: Photo[];
  roomCategories: RoomCategory[];
}
