import React, { useState, useRef, useEffect } from 'react';
import {
  StarIcon,
  LaurelLeftIcon,
  LaurelRightIcon,
  SprayBottleIcon,
  CheckCircleBadgeIcon,
  KeyReviewIcon,
  MessageBubbleIcon,
  FoldedMapIcon,
  PriceTagReviewIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '../common/Icons';
import styles from './ListingDetails.module.css';

interface ReviewsSectionProps {
  rating?: number;
  reviewCount?: number;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  rating = 4.95,
  reviewCount: _reviewCount = 19,
}) => {
  const [activeKeyword, setActiveKeyword] = useState<string | null>(null);
  const pillsTrackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (pillsTrackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = pillsTrackRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = pillsTrackRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll, { passive: true });
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const handleScrollPills = (direction: 'left' | 'right') => {
    if (pillsTrackRef.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      pillsTrackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const subRatings = [
    { label: 'Cleanliness', score: '5.0', icon: <SprayBottleIcon size={30} color="#222222" /> },
    { label: 'Accuracy', score: '5.0', icon: <CheckCircleBadgeIcon size={30} color="#222222" /> },
    { label: 'Check-in', score: '5.0', icon: <KeyReviewIcon size={30} color="#222222" /> },
    { label: 'Communication', score: '5.0', icon: <MessageBubbleIcon size={30} color="#222222" /> },
    { label: 'Location', score: '4.8', icon: <FoldedMapIcon size={30} color="#222222" /> },
    { label: 'Value', score: '4.8', icon: <PriceTagReviewIcon size={30} color="#222222" /> },
  ];

  const overallRatingBars = [
    { star: 5, fillPercent: 95 },
    { star: 4, fillPercent: 5 },
    { star: 3, fillPercent: 0 },
    { star: 2, fillPercent: 0 },
    { star: 1, fillPercent: 0 },
  ];

  const keywordPills = [
    { id: 'comfort', label: 'Comfort', count: 6, emoji: '🛋️' },
    { id: 'accuracy', label: 'Accuracy', count: 5, emoji: '✅' },
    { id: 'hottub', label: 'Hot tub', count: 5, emoji: '🛁' },
    { id: 'condition', label: 'Condition', count: 4, emoji: '🎨' },
    { id: 'hospitality', label: 'Hospitality', count: 8, emoji: '🎁' },
    { id: 'cleanliness', label: 'Cleanliness', count: 4, emoji: '🧼' },
    { id: 'amenities', label: 'Amenities', count: 2, emoji: '🧺' },
    { id: 'decor', label: 'Decor', count: 2, emoji: '🖼️' },
    { id: 'indoor', label: 'Indoor spaces', count: 2, emoji: '🪑' },
    { id: 'location', label: 'Location', count: 2, emoji: '📍' },
  ];

  const reviews = [
    {
      id: 'rev-amit',
      name: 'Amit',
      tenure: '2 months on Airbnb',
      timeAgo: '1 week ago',
      avatarType: 'initials',
      initials: 'A',
      avatarBg: '#f6d9be',
      avatarColor: '#8a4c16',
      rating: 5,
      comment:
        'Very helpful and responsive team. Safe and peaceful stay, loved everything about the private jacuzzi and prompt communication.',
    },
    {
      id: 'rev-aheesh',
      name: 'Aheesh',
      tenure: '3 years on Airbnb',
      timeAgo: '2 weeks ago',
      avatarType: 'image',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      rating: 5,
      comment:
        'We had a wonderful stay. The apartment was clean, comfortable, and exactly as described. The jacuzzi was a real highlight!',
    },
    {
      id: 'rev-priyanka',
      name: 'Priyanka',
      tenure: '4 years on Airbnb',
      timeAgo: '3 weeks ago',
      avatarType: 'image',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      rating: 5,
      comment:
        'The private jacuzzi was heavenly! The space is so beautifully designed and spotless. Mirashya Homes was very communicative and accommodating with our check-in. Walking distance to Candolim beach.',
    },
    {
      id: 'rev-rahul',
      name: 'Rahul',
      tenure: '1 year on Airbnb',
      timeAgo: '1 month ago',
      avatarType: 'image',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      rating: 5,
      comment:
        'Amazing stay for a romantic getaway in Goa. Fast Wi-Fi worked great for remote work, and the patio jacuzzi deck was our favorite part every evening. Highly recommend!',
    },
  ];

  return (
    <section className={styles.reviewsSection} id="reviews" aria-label="Guest reviews">
      {/* Top Guest Favourite Badge with Laurel Wreath */}
      <div className={styles.guestFavouriteHeader}>
        <div className={styles.guestFavouriteScoreRow}>
          <LaurelLeftIcon size={80} color="#2b2b2b" />
          <span className={styles.guestFavouriteBigScore}>{rating.toFixed(2)}</span>
          <LaurelRightIcon size={80} color="#2b2b2b" />
        </div>
        <h2 className={styles.guestFavouriteTitle}>Guest favourite</h2>
        <p className={styles.guestFavouriteSubtitle}>
          This home is a guest favourite based on ratings, reviews and reliability
        </p>
        <a href="#how-reviews-work" className={styles.howReviewsWorkLink}>
          How reviews work
        </a>
      </div>

      {/* Ratings Breakdown Grid Bar */}
      <div className={styles.ratingsBreakdownBar}>
        {/* Overall rating column */}
        <div className={styles.overallRatingCol}>
          <span className={styles.breakdownColTitle}>Overall rating</span>
          <div className={styles.overallRatingBarsList}>
            {overallRatingBars.map((item) => (
              <div key={item.star} className={styles.overallBarRow}>
                <span className={styles.overallStarNum}>{item.star}</span>
                <div className={styles.overallBarTrack}>
                  <div
                    className={styles.overallBarFill}
                    style={{ width: `${item.fillPercent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6 Category Sub-ratings */}
        {subRatings.map((sub, idx) => (
          <div key={idx} className={styles.subRatingCol}>
            <span className={styles.breakdownColTitle}>{sub.label}</span>
            <span className={styles.subRatingScore}>{sub.score}</span>
            <div className={styles.subRatingIconWrap}>{sub.icon}</div>
          </div>
        ))}
      </div>

      {/* Scrollable Keyword Filter Pills */}
      <div className={styles.keywordPillsWrapper}>
        {canScrollLeft && (
          <button
            type="button"
            className={`${styles.pillScrollBtn} ${styles.pillScrollBtnLeft}`}
            onClick={() => handleScrollPills('left')}
            aria-label="Scroll pills left"
          >
            <ChevronLeftIcon size={14} />
          </button>
        )}

        <div className={styles.keywordPillsContainer} ref={pillsTrackRef}>
          {keywordPills.map((pill) => {
            const isSelected = activeKeyword === pill.id;
            return (
              <button
                key={pill.id}
                type="button"
                className={`${styles.keywordPill} ${isSelected ? styles.keywordPillActive : ''}`}
                onClick={() => setActiveKeyword(isSelected ? null : pill.id)}
              >
                <span className={styles.keywordPillEmoji}>{pill.emoji}</span>
                <span>{pill.label}</span>
                <span className={styles.keywordPillCount}>{pill.count}</span>
              </button>
            );
          })}
        </div>

        {canScrollRight && (
          <button
            type="button"
            className={`${styles.pillScrollBtn} ${styles.pillScrollBtnRight}`}
            onClick={() => handleScrollPills('right')}
            aria-label="Scroll pills right"
          >
            <ChevronRightIcon size={14} />
          </button>
        )}
      </div>

      {/* Review Cards Grid */}
      <div className={styles.reviewsCardsGrid}>
        {reviews.map((rev) => (
          <article key={rev.id} className={styles.reviewCard}>
            <div className={styles.reviewerHeader}>
              {rev.avatarType === 'initials' ? (
                <div
                  className={styles.reviewerInitialsAvatar}
                  style={{ backgroundColor: rev.avatarBg, color: rev.avatarColor }}
                >
                  {rev.initials}
                </div>
              ) : (
                <img
                  src={rev.avatar}
                  alt={`${rev.name}'s profile avatar`}
                  className={styles.reviewerAvatar}
                  loading="lazy"
                />
              )}
              <div className={styles.reviewerMeta}>
                <h4 className={styles.reviewerName}>{rev.name}</h4>
                <p className={styles.reviewerTenure}>{rev.tenure}</p>
              </div>
            </div>

            <div className={styles.reviewRatingDateRow}>
              <div className={styles.reviewStarIcons}>
                {[...Array(rev.rating)].map((_, i) => (
                  <StarIcon key={i} size={10} color="#222222" />
                ))}
              </div>
              <span className={styles.reviewDotSeparator}>·</span>
              <span className={styles.reviewDate}>{rev.timeAgo}</span>
            </div>

            <p className={styles.reviewComment}>{rev.comment}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
