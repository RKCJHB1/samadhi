import React from 'react';
import { useNavigate } from 'react-router-dom';
import RibbonCuttingCeremony from '../../components/learn/RibbonCuttingCeremony';

const LearnUnveilPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCeremonyComplete = () => {
    // Redirect to the main learn page
    navigate('/learn');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indian-cream to-white">
      <RibbonCuttingCeremony onComplete={handleCeremonyComplete} />
    </div>
  );
};

export default LearnUnveilPage;
