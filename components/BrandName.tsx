import React from 'react';

interface BrandNameProps {
  className?: string;
}

const BrandName: React.FC<BrandNameProps> = ({ className }) => {
  return (
    <span className={className}>
      <span style={{ color: 'var(--color-logo)' }}>Tempa Web.12</span><span style={{ color: 'var(--color-coral)' }}>3</span>
    </span>
  );
};

export default BrandName;