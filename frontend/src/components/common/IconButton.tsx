import React from 'react';
import styles from './IconButton.module.css';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string; // Accessible aria-label
  variant?: 'subtle' | 'outline' | 'filled' | 'pill' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, variant = 'subtle', size = 'md', children, className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
        {...props}
      >
        <span className={styles.icon}>{icon}</span>
        {children && <span className={styles.label}>{children}</span>}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
