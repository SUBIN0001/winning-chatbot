import React from 'react';
import './StarSpinner.css'; // We'll create this CSS file

const StarSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'scale-50',
    medium: 'scale-100',
    large: 'scale-150',
    xl: 'scale-200'
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`loader loader-2 ${sizeClasses[size]}`}>
        <svg className="loader-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 57">
          <polygon 
            points="29.8 0.3 22.8 21.8 0 21.8 18.5 35.2 11.5 56.7 29.8 43.4 48.2 56.7 41.2 35.1 59.6 21.8 36.8 21.8" 
            fill="#8d11e6" 
          />
        </svg>
        <div className="loader-circles"></div>
      </div>
      {text && <p className="text-[#8d11e6] text-sm mt-4 font-medium">{text}</p>}
    </div>
  );
};

export default StarSpinner;