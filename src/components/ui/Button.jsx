import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({ children, onClick, className = '', variant = 'primary', ...props }) => {
  const baseStyle = {
    display: 'inline-block',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '500',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    textAlign: 'center'
  };

  const variants = {
    primary: {
      backgroundColor: 'var(--color-white)',
      color: 'var(--color-black)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--color-white)',
      border: '1px solid var(--color-soft-grey)',
    }
  };

  return (
    <motion.button
      whileHover={{ opacity: 0.8 }}
      whileTap={{ scale: 0.98 }}
      style={{ ...baseStyle, ...variants[variant] }}
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
};
