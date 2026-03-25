import React from 'react';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'medium', color = '#C7B268' }) => {
  let dimension = 'w-8 h-8';
  if (size === 'small') dimension = 'w-4 h-4';
  else if (size === 'large') dimension = 'w-12 h-12';

  return (
    <div className="flex justify-center items-center py-6">
      <div
        className={`${dimension} border-4 border-t-transparent border-solid rounded-full animate-spin`}
        style={{ borderColor: `${color} transparent ${color} ${color}` }}
      ></div>
    </div>
  );
};

export default Loader;