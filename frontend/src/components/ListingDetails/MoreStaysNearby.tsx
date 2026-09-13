import React, { useRef, useState } from 'react';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from '../common/Icons';
import styles from './ListingDetails.module.css';

interface StayItem {
  id: string;
  title: string;
  price: string;
  rating: number;
  image: string;
}

export const MoreStaysNearby: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;

  const stays: StayItem[] = [
    {
      id: 'stay-1',
      title: 'The Tropical Studio | 5 mins to Beach',
      price: '₹22,824',
      rating: 4.96,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'stay-2',
      title: 'Luxury Casa Bella 1BHK with plunge pool, Calangute',
      price: '₹39,942',
      rating: 4.95,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'stay-3',
      title: 'Kanso by Earthen Window | Jacuzzi | Terrace | Pool',
      price: '₹45,648',
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'stay-4',
      title: 'Luxury Apt | Private Pool | 6 Mins from Beach',
      price: '₹48,786',
      rating: 4.93,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'stay-5',
      title: 'Serendipity Cottage - Calm Stay in Calangute-Baga.',
      price: '₹22,824',
      rating: 4.92,
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'stay-6',
      title: 'Villa Sol - Luxury 2BHK with Private Garden & Pool',
      price: '₹34,500',
      rating: 4.98,
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'stay-7',
      title: 'Boho Chic Beachside Villa Candolim',
      price: '₹28,900',
      rating: 4.89,
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'stay-8',
      title: 'Casa De Palms | Private Plunge Pool & Patio',
      price: '₹41,200',
      rating: 4.97,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'stay-9',
      title: 'Sunset View Penthouse with Rooftop Jacuzzi',
      price: '₹52,000',
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'stay-10',
      title: 'Heritage Portuguese Villa near Baga Beach',
      price: '₹31,400',
      rating: 4.91,
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    const progress = scrollLeft / maxScroll;
    const page = progress > 0.4 ? 2 : 1;
    setCurrentPage(page);
  };

  const scrollNext = () => {
    if (!scrollRef.current) return;
    const width = scrollRef.current.clientWidth;
    scrollRef.current.scrollBy({ left: width, behavior: 'smooth' });
  };

  const scrollPrev = () => {
    if (!scrollRef.current) return;
    const width = scrollRef.current.clientWidth;
    scrollRef.current.scrollBy({ left: -width, behavior: 'smooth' });
  };

  return (
    <section className={styles.moreStaysSection} aria-label="More stays nearby">
      <div className={styles.moreStaysHeader}>
        <h3 className={styles.moreStaysHeading}>More stays nearby</h3>
        <div className={styles.moreStaysControls}>
          <span className={styles.carouselCounter}>{currentPage}/{totalPages}</span>
          <button
            type="button"
            className={`${styles.carouselNavBtn} ${currentPage === 1 ? styles.carouselNavBtnDisabled : ''}`}
            aria-label="Previous stays page"
            onClick={scrollPrev}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon size={14} />
          </button>
          <button
            type="button"
            className={`${styles.carouselNavBtn} ${currentPage === totalPages ? styles.carouselNavBtnDisabled : ''}`}
            aria-label="Next stays page"
            onClick={scrollNext}
            disabled={currentPage === totalPages}
          >
            <ChevronRightIcon size={14} />
          </button>
        </div>
      </div>

      <div
        className={styles.moreStaysGrid}
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {stays.map((stay) => (
          <article key={stay.id} className={styles.stayCard}>
            <div className={styles.stayImageWrap}>
              <img
                src={stay.image}
                alt={stay.title}
                className={styles.stayImg}
                loading="lazy"
              />
            </div>
            <div className={styles.stayInfo}>
              <h4 className={styles.stayTitle}>{stay.title}</h4>
              <div className={styles.stayPriceRating}>
                <span className={styles.stayPrice}>{stay.price}</span>
                <span className={styles.stayRating}>
                  <StarIcon size={11} color="#222222" />
                  <span>{stay.rating.toFixed(2)}</span>
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
