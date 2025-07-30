import React from 'react';

interface BrandNameProps {
  className?: string;
}

const BrandName: React.FC<BrandNameProps> = ({ className }) => {
  return (
    <span className={className}>
      <span style={{ color: '#1dc3b6' }}>Tempa Web.12</span><span style={{ color: '#e9806c' }}>3</span>
    </span>
  );
};

export default BrandName;
