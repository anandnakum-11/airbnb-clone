import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, KeyboardIcon } from '../common/Icons';
import styles from './CalendarSection.module.css';

interface CalendarSectionProps {
  startDate: Date | null;
  endDate: Date | null;
  onChangeDates: (start: Date | null, end: Date | null) => void;
  locationName?: string;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({
  startDate,
  endDate,
  onChangeDates,
  locationName = 'Candolim',
}) => {
  // Base month is October 2026 by default matching the screenshot
  const [viewDate, setViewDate] = useState<Date>(new Date(2026, 9, 1));
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  // Month navigation
  const nextMonthDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  // Blocked dates matching Airbnb screenshot (e.g., Nov 17-21 2026)
  const isDateBlocked = (date: Date): boolean => {
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();
    if (y === 2026 && m === 10 && d >= 17 && d <= 21) {
      return true;
    }
    return false;
  };

  const isSameDay = (d1: Date | null, d2: Date | null): boolean => {
    if (!d1 || !d2) return false;
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const isDateInRange = (date: Date): boolean => {
    if (!startDate) return false;
    const end = endDate || hoverDate;
    if (!end) return false;

    const startMs = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime();
    const endMs = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
    const currentMs = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

    if (startMs < endMs) {
      return currentMs >= startMs && currentMs <= endMs;
    }
    return false;
  };

  const handleDateClick = (date: Date) => {
    if (isDateBlocked(date)) return;

    if (!startDate || (startDate && endDate)) {
      // Start a new selection
      onChangeDates(date, null);
    } else if (startDate && !endDate) {
      if (date.getTime() < startDate.getTime()) {
        // Reset start date if clicked earlier date
        onChangeDates(date, null);
      } else if (isSameDay(date, startDate)) {
        // Deselect if clicked same date
        onChangeDates(null, null);
      } else {
        // Complete the range
        onChangeDates(startDate, date);
      }
    }
  };

  const calculateNights = (): number => {
    if (!startDate || !endDate) return 0;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const formatDateDisplay = (date: Date): string => {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const nights = calculateNights();

  // Render month grid
  const renderMonth = (monthDate: Date, showPrev: boolean, showNext: boolean) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const monthName = monthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }
    for (let d = 1; d <= totalDays; d++) {
      days.push(new Date(year, month, d));
    }

    return (
      <div className={styles.monthBlock} key={`${year}-${month}`}>
        <div className={styles.monthHeader}>
          {showPrev ? (
            <button
              type="button"
              className={styles.navBtn}
              onClick={handlePrevMonth}
              aria-label="Previous month"
            >
              <ChevronLeftIcon size={14} />
            </button>
          ) : (
            <div style={{ width: 32 }} />
          )}

          <span className={styles.monthTitle}>{monthName}</span>

          {showNext ? (
            <button
              type="button"
              className={styles.navBtn}
              onClick={handleNextMonth}
              aria-label="Next month"
            >
              <ChevronRightIcon size={14} />
            </button>
          ) : (
            <div style={{ width: 32 }} />
          )}
        </div>

        <div className={styles.weekdaysRow}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
            <span key={idx} className={styles.weekday}>
              {day}
            </span>
          ))}
        </div>

        <div className={styles.daysGrid}>
          {days.map((date, idx) => {
            if (!date) {
              return <div key={`empty-${idx}`} className={styles.dayCellWrapper} />;
            }

            const isStart = isSameDay(date, startDate);
            const isEnd = isSameDay(date, endDate || hoverDate);
            const inRange = isDateInRange(date);
            const blocked = isDateBlocked(date);

            return (
              <div
                key={date.toISOString()}
                className={styles.dayCellWrapper}
                onMouseEnter={() => {
                  if (startDate && !endDate && !blocked) {
                    setHoverDate(date);
                  }
                }}
                onMouseLeave={() => {
                  if (startDate && !endDate) {
                    setHoverDate(null);
                  }
                }}
              >
                {inRange && !blocked && (
                  <div
                    className={`${styles.inRangeBg} ${isStart ? styles.rangeStartBg : ''} ${
                      isEnd ? styles.rangeEndBg : ''
                    }`}
                  />
                )}
                <button
                  type="button"
                  disabled={blocked}
                  onClick={() => handleDateClick(date)}
                  className={`${styles.dayBtn} ${
                    isStart || (isEnd && endDate) ? styles.selectedDay : ''
                  } ${blocked ? styles.disabledDay : ''}`}
                  aria-label={`${date.toLocaleDateString()}${isStart ? ', selected check-in' : ''}${
                    isEnd && endDate ? ', selected checkout' : ''
                  }`}
                >
                  {date.getDate()}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section className={styles.calendarSection} id="calendar-section" aria-label="Availability calendar">
      <h2 className={styles.title}>
        {nights > 0
          ? `${nights} nights in ${locationName}`
          : startDate
          ? 'Select checkout date'
          : 'Select check-in date'}
      </h2>
      <p className={styles.subtitle}>
        {startDate && endDate
          ? `${formatDateDisplay(startDate)} - ${formatDateDisplay(endDate)}`
          : startDate
          ? 'Minimum stay: 2 nights'
          : 'Add your travel dates for exact pricing'}
      </p>

      <div className={styles.monthsContainer}>
        {renderMonth(viewDate, true, false)}
        {renderMonth(nextMonthDate, false, true)}
      </div>

      <div className={styles.footerRow}>
        <button type="button" className={styles.keyboardBtn} aria-label="Keyboard shortcuts">
          <KeyboardIcon size={20} />
        </button>

        <button
          type="button"
          onClick={() => onChangeDates(null, null)}
          className={styles.clearDatesBtn}
        >
          Clear dates
        </button>
      </div>
    </section>
  );
};
