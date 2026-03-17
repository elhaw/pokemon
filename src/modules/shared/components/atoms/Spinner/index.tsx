import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

const sizes = {
  sm: 'w-6 h-6 border-2',
  md: 'w-10 h-10 border-4',
  lg: 'w-16 h-16 border-4',
};

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', message }) => (
  <div className="flex items-center justify-center gap-3">
    <div
      className={`${sizes[size]} border-gray-500 border-t-transparent rounded-full animate-spin`}
    />
    {message && <p className="text-black text-sm font-medium">{message}</p>}
  </div>
);

export default Spinner;
