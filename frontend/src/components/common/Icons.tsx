import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export const StarIcon: React.FC<IconProps> = ({ size = 14, color = 'currentColor', ...props }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill={color}
    aria-hidden="true"
    {...props}
  >
    <path d="M15.094 1.579l-4.124 8.885-9.78 1.187a1 1 0 0 0-.563 1.734l7.214 6.643-1.927 9.664a1 1 0 0 0 1.474 1.071L16 26.131l8.682 4.962a1 1 0 0 0 1.474-1.071l-1.927-9.664 7.214-6.643a1 1 0 0 0-.563-1.734l-9.78-1.187-4.124-8.885a1 1 0 0 0-1.882 0z" />
  </svg>
);

export const ShareIcon: React.FC<IconProps> = ({ size = 16, color = 'currentColor', ...props }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2.5"
    aria-hidden="true"
    {...props}
  >
    <path d="M27 18v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V18M16 3v18M8 11l8-8 8 8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const HeartIcon: React.FC<IconProps & { filled?: boolean }> = ({ size = 16, color = 'currentColor', filled = false, ...props }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill={filled ? '#FF385C' : 'none'}
    stroke={filled ? '#FF385C' : color}
    strokeWidth="2.5"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M16 28C16 28 3 20.5 3 11.5a7.5 7.5 0 0 1 13-5 7.5 7.5 0 0 1 13 5c0 9-13 16.5-13 16.5z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ size = 16, color = 'currentColor', ...props }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="3"
    strokeLinecap="round"
    aria-hidden="true"
    {...props}
  >
    <line x1="7" y1="7" x2="25" y2="25" />
    <line x1="25" y1="7" x2="7" y2="25" />
  </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ size = 16, color = 'currentColor', ...props }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <polyline points="20 6 10 16 20 26" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ size = 16, color = 'currentColor', ...props }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <polyline points="12 6 22 16 12 26" />
  </svg>
);

export const GridNineDotsIcon: React.FC<IconProps> = ({ size = 16, color = 'currentColor', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    fill={color}
    aria-hidden="true"
    {...props}
  >
    <circle cx="2" cy="2" r="1.5" />
    <circle cx="8" cy="2" r="1.5" />
    <circle cx="14" cy="2" r="1.5" />
    <circle cx="2" cy="8" r="1.5" />
    <circle cx="8" cy="8" r="1.5" />
    <circle cx="14" cy="8" r="1.5" />
    <circle cx="2" cy="14" r="1.5" />
    <circle cx="8" cy="14" r="1.5" />
    <circle cx="14" cy="14" r="1.5" />
  </svg>
);

export const HouseWithTreeIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden="true">
    {/* House roof */}
    <path d="M2.5 10.5L12 3l7 5.5V6h2v4.5l2 1.5-1.2 1.6L20 14.3V21H5v-6.7l-1.3.9-1.2-1.7z" fill="#717171" />
    {/* House walls */}
    <rect x="6" y="10.5" width="13" height="9.5" fill="#E8E8E8" rx="0.5" />
    {/* Red entrance door */}
    <rect x="10.5" y="13.5" width="3.5" height="6.5" fill="#FF385C" rx="0.5" />
    {/* Door knob */}
    <circle cx="13" cy="17" r="0.5" fill="#FFFFFF" />
    {/* Green Tree next to house */}
    <path d="M19 12c1.8-2 3.5-1 3.5 1.8 0 2.2-1.2 2.7-3.5 2.7v4h-1v-8.5c.4 0 .7 0 1 0z" fill="#43A047" />
    {/* Window */}
    <rect x="7.2" y="12.5" width="2.2" height="2.2" fill="#9E9E9E" rx="0.3" />
  </svg>
);

export const AirbnbLogo: React.FC<IconProps> = ({ size = 32, color = '#FF385C', ...props }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M16 3.2c-2.4 0-4.2 1.6-5.5 4.3L5.2 18.5C3.3 22.4 4.5 26.8 8.1 28.2c3.2 1.2 6.6.1 8-2.6 1.4 2.7 4.8 3.8 8 2.6 3.6-1.4 4.8-5.8 2.9-9.7l-5.3-11C20.4 4.8 18.4 3.2 16 3.2z" />
    <path d="M16 11.5c1.8 0 3.2 1.6 3.2 3.6 0 2.8-1.6 6.5-3.2 9.5-1.6-3-3.2-6.7-3.2-9.5 0-2 1.4-3.6 3.2-3.6z" />
  </svg>
);

export const AirbnbFullLogo: React.FC<{ height?: number; color?: string; className?: string }> = ({
  height = 34,
  color = '#FF385C',
  className,
}) => (
  <svg
    viewBox="0 0 1300 320"
    height={height}
    width={(height * 1300) / 320}
    fill={color}
    className={className}
    aria-label="airbnb"
    role="img"
  >
    {/* Official Bélo Mark */}
    <path d="M159.2 0C134.1 0 110.4 12.3 94.6 33.5 87 43.6 77.4 62.9 66 91.2 46.2 140.6 22 195.4 3.7 236.4-1.2 247.3-.9 258.9 4.3 269.5c6.3 12.8 17.6 21.7 31.6 24.7 6.4 1.4 12.9 1.6 19.3.6 14.4-2.2 27.6-9.7 37.9-21.4 17.1-19.4 34.6-47.5 52.4-83.3 2.1-4.2 8-4.2 10.1 0 17.8 35.8 35.3 63.9 52.4 83.3 10.3 11.7 23.5 19.2 37.9 21.4 6.4 1 12.9.8 19.3-.6 14-3 25.3-11.9 31.6-24.7 5.2-10.6 5.5-22.2.6-33.1-18.3-41-42.5-95.8-62.3-145.2-11.4-28.3-21-47.6-28.6-57.7C207.6 12.3 183.9 0 158.8 0h.4zm.4 31.6c17.5 0 33.6 8.3 44.4 22.9 6 8.1 14.7 25 25.6 52 19.5 48.6 43.4 102.7 61.3 143 1.8 4.1 1.6 8.2-.1 11.7-2.1 4.3-6.1 7.3-11 8.3-2.3.5-4.6.4-6.9.1-5.7-.9-11-4-15.6-9-16.1-17.6-33.1-44.5-50.6-79.6-7.8-15.6-18.4-28.1-30.8-36.4-12.7-8.5-27-12.8-41.3-12.8s-28.6 4.3-41.3 12.8c-12.4 8.3-23 20.8-30.8 36.4-17.5 35.1-34.5 62-50.6 79.6-4.6 5-9.9 8.1-15.6 9-2.3.3-4.6.4-6.9-.1-4.9-1-8.9-4-11-8.3-1.7-3.5-1.9-7.6-.1-11.7 17.9-40.3 41.8-94.4 61.3-143 10.9-27 19.6-43.9 25.6-52 10.8-14.6 26.9-22.9 44.4-22.9h.4zm-.2 121.7c15.2 0 28.5 7.4 36.4 19.1 7.9 11.6 9.8 26.2 5.2 40-6.7 20-21.7 34.2-41.6 34.2s-34.9-14.2-41.6-34.2c-4.6-13.8-2.7-28.4 5.2-40 7.9-11.7 21.2-19.1 36.4-19.1zm0 31.6c-5.7 0-10.9 2.9-13.9 7.4-3.1 4.5-3.8 10.2-2 15.5 2.6 7.8 8.6 13.3 15.9 13.3s13.3-5.5 15.9-13.3c1.8-5.3 1.1-11-2-15.5-3-4.5-8.2-7.4-13.9-7.4z" />
    {/* 'a' */}
    <path d="M370.4 116.5c-30.4 0-53.7 21.6-53.7 54.8 0 34.9 24.9 55.2 59.6 55.2 18.6 0 34.7-7.2 46.3-20.4l.2 16h35.8V121h-35.8v16c-11.9-13.1-28-20.5-52.4-20.5zm11.9 30.7c19.4 0 34.1 14.2 34.1 31.7s-14.7 31.7-34.1 31.7c-19.2 0-34.1-14.2-34.1-31.7s14.9-31.7 34.1-31.7z" />
    {/* 'i' */}
    <path d="M505.7 72.1h38.4v40.1h-38.4V72.1zm0 48.9h38.4v101.1h-38.4V121z" />
    {/* 'r' */}
    <path d="M592.4 121h35.8v16.6c8.4-12.6 22.7-21 41.4-21 4.6 0 8.9.4 12.8 1.4v38.2c-5.4-1.4-11.1-2.2-17.1-2.2-21.1 0-37.1 15.4-37.1 38.4v29.7h-35.8V121z" />
    {/* 'b' */}
    <path d="M731.4 72.1h35.8v44.3c11.7-13.1 27.8-20.5 52.1-20.5 30.4 0 53.7 21.6 53.7 54.8 0 34.9-24.9 55.2-59.6 55.2-18.6 0-34.7-7.2-46.3-20.4l-.2 14.3h-35.5V72.1zm49.1 75.1c-19.2 0-34.1 14.2-34.1 31.7s14.9 31.7 34.1 31.7c19.4 0 34.1-14.2 34.1-31.7s-14.7-31.7-34.1-31.7z" />
    {/* 'n' */}
    <path d="M912.4 121h35.8v15.8c10.9-12.1 25.9-20.2 44.9-20.2 32.8 0 53.6 20.2 53.6 53.2v52.3h-38.4v-48.6c0-16.4-9.7-26.3-24.3-26.3-16 0-33 12.1-33 31.9v43h-38.4V121z" />
    {/* 'b' */}
    <path d="M1101.3 72.1h35.8v44.3c11.7-13.1 27.8-20.5 52.1-20.5 30.4 0 53.7 21.6 53.7 54.8 0 34.9-24.9 55.2-59.6 55.2-18.6 0-34.7-7.2-46.3-20.4l-.2 14.3h-35.5V72.1zm49.1 75.1c-19.2 0-34.1 14.2-34.1 31.7s14.9 31.7 34.1 31.7c19.4 0 34.1-14.2 34.1-31.7s-14.7-31.7-34.1-31.7z" />
  </svg>
);

export const OutdoorGrillIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M12 3.5 L5 16 h14 L12 3.5 z" />
    <path d="M3 19.5 h18" />
    <path d="M12 10.5 c-.8 1.2 -1 2.2 0 3.2 c1 -.8 1 -2 0 -3.2 z" />
  </svg>
);

export const CoolingFanIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <circle cx="12" cy="12" r="2.5" />
    <path d="M12 9.5 C12 6 10 4 8 5 C6 6 7.5 9 10 9.5" />
    <path d="M14.5 12 C18 12 20 10 19 8 C18 6 15 7.5 14.5 10" />
    <path d="M12 14.5 C12 18 14 20 16 19 C18 18 16.5 15 14 14.5" />
    <path d="M9.5 12 C6 12 4 14 5 16 C6 18 9 16.5 9.5 14" />
  </svg>
);

export const GlobeIcon: React.FC<IconProps> = ({ size = 16, color = 'currentColor', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    aria-hidden="true"
    {...props}
  >
    <circle cx="8" cy="8" r="7" />
    <line x1="1" y1="8" x2="15" y2="8" />
    <path d="M8 1c2.5 2.5 3.5 5 3.5 7s-1 4.5-3.5 7c-2.5-2.5-3.5-5-3.5-7s1-4.5 3.5-7z" />
  </svg>
);

export const MenuIcon: React.FC<IconProps> = ({ size = 16, color = 'currentColor', ...props }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="3"
    strokeLinecap="round"
    aria-hidden="true"
    {...props}
  >
    <line x1="4" y1="9" x2="28" y2="9" />
    <line x1="4" y1="16" x2="28" y2="16" />
    <line x1="4" y1="23" x2="28" y2="23" />
  </svg>
);

export const UserAvatarIcon: React.FC<IconProps> = ({ size = 28, color = '#717171', ...props }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill={color}
    aria-hidden="true"
    {...props}
  >
    <path d="M16 2a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm0 18c-6.627 0-12 4.03-12 9v1h24v-1c0-4.97-5.373-9-12-9z" />
  </svg>
);

export const BedIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    aria-hidden="true"
    {...props}
  >
    <path d="M3 24V9a2 2 0 0 1 2-2h22a2 2 0 0 1 2 2v15M3 19h26M6 14h6a2 2 0 0 0 2-2V9H6v5zm14 0h6V9h-8v3a2 2 0 0 0 2 2z" />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
  </svg>
);

export const DoorIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
    <path d="M2 20h20" />
    <circle cx="14" cy="12" r="1" fill={color} />
  </svg>
);

export const LocationPinIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const TagIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
    <path d="M7 7h.01" />
  </svg>
);

export const FlagIcon: React.FC<IconProps> = ({ size = 16, color = 'currentColor', ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zm0 0v7" />
  </svg>
);

export const LaurelLeftIcon: React.FC<IconProps> = ({ size = 36, color = '#222222', ...props }) => (
  <svg
    viewBox="0 0 24 36"
    width={size * (24 / 36)}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M18 34 C12 28 6 18 14 3" />
    <path d="M14 3 C16 6 17 9 14 10 C12 8 12 5 14 3 Z" fill={color} stroke="none" />
    <path d="M10 8 C7 10 6 13 8 15 C10 14 11 11 10 8 Z" fill={color} stroke="none" />
    <path d="M12 15 C15 17 16 20 14 22 C11 21 11 18 12 15 Z" fill={color} stroke="none" />
    <path d="M9 20 C6 22 5 25 7 27 C9 26 10 23 9 20 Z" fill={color} stroke="none" />
    <path d="M12 26 C15 28 16 30 14 32 C12 31 12 29 12 26 Z" fill={color} stroke="none" />
  </svg>
);

export const LaurelRightIcon: React.FC<IconProps> = ({ size = 36, color = '#222222', ...props }) => (
  <svg
    viewBox="0 0 24 36"
    width={size * (24 / 36)}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ transform: 'scaleX(-1)' }}
    aria-hidden="true"
    {...props}
  >
    <path d="M18 34 C12 28 6 18 14 3" />
    <path d="M14 3 C16 6 17 9 14 10 C12 8 12 5 14 3 Z" fill={color} stroke="none" />
    <path d="M10 8 C7 10 6 13 8 15 C10 14 11 11 10 8 Z" fill={color} stroke="none" />
    <path d="M12 15 C15 17 16 20 14 22 C11 21 11 18 12 15 Z" fill={color} stroke="none" />
    <path d="M9 20 C6 22 5 25 7 27 C9 26 10 23 9 20 Z" fill={color} stroke="none" />
    <path d="M12 26 C15 28 16 30 14 32 C12 31 12 29 12 26 Z" fill={color} stroke="none" />
  </svg>
);

export const SprayBottleIcon: React.FC<IconProps> = ({ size = 32, color = '#222222', ...props }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M12 9h8M14 9V6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3M10 13h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V15a2 2 0 0 1 2-2z" />
    <path d="M14 9c0 2-3 3-4 4M24 6l3-1M25 9l2 1" />
  </svg>
);

export const CheckCircleBadgeIcon: React.FC<IconProps> = ({ size = 32, color = '#222222', ...props }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <circle cx="16" cy="16" r="12" />
    <polyline points="11 16 14.5 19.5 21 13" />
  </svg>
);

export const KeyReviewIcon: React.FC<IconProps> = ({ size = 32, color = '#222222', ...props }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <circle cx="11" cy="11" r="6" />
    <path d="m15.5 15.5 11 11M22 22l3-1M24.5 24.5l2-1" />
  </svg>
);

export const MessageBubbleIcon: React.FC<IconProps> = ({ size = 32, color = '#222222', ...props }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M26 19a4 4 0 0 1-4 4H10l-5 4V9a4 4 0 0 1 4-4h13a4 4 0 0 1 4 4v10z" />
  </svg>
);

export const FoldedMapIcon: React.FC<IconProps> = ({ size = 32, color = '#222222', ...props }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <polygon points="4 7 11 4 21 8 28 5 28 25 21 28 11 24 4 27 4 7" />
    <line x1="11" y1="4" x2="11" y2="24" />
    <line x1="21" y1="8" x2="21" y2="28" />
  </svg>
);

export const PriceTagReviewIcon: React.FC<IconProps> = ({ size = 32, color = '#222222', ...props }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M16.5 4.5H8a2 2 0 0 0-2 2v8.5a2 2 0 0 0 .59 1.41l12 12a2 2 0 0 0 2.82 0l7.18-7.18a2 2 0 0 0 0-2.82l-12-12A2 2 0 0 0 16.5 4.5z" />
    <circle cx="11.5" cy="10" r="1.5" fill={color} />
  </svg>
);

export const KeyboardIcon: React.FC<IconProps> = ({ size = 20, color = '#222222', ...props }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <rect x="3" y="7" width="26" height="18" rx="3" />
    <line x1="7" y1="12" x2="9" y2="12" />
    <line x1="12" y1="12" x2="14" y2="12" />
    <line x1="17" y1="12" x2="19" y2="12" />
    <line x1="22" y1="12" x2="25" y2="12" />
    <line x1="7" y1="16" x2="9" y2="16" />
    <line x1="12" y1="16" x2="14" y2="16" />
    <line x1="17" y1="16" x2="19" y2="16" />
    <line x1="22" y1="16" x2="25" y2="16" />
    <line x1="10" y1="20" x2="22" y2="20" />
  </svg>
);

