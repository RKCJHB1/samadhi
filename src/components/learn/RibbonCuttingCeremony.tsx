import React, { useState, useEffect } from 'react';
import { Scissors, Sparkles, Star, Heart } from 'lucide-react';

interface RibbonCuttingCeremonyProps {
  onComplete: () => void;
}

const RibbonCuttingCeremony: React.FC<RibbonCuttingCeremonyProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'unveiling' | 'celebration' | 'complete'>('unveiling');
  const [ribbonCut, setRibbonCut] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [scissorsPosition, setScissorsPosition] = useState({ x: 50, y: 60 });

  // Remove all auto-timers - everything is now click-controlled

  const handleRibbonCut = () => {
    setRibbonCut(true);
    setShowConfetti(true);
    setStage('celebration');
    // Start fireworks when entering celebration stage
    setTimeout(() => setShowFireworks(true), 500);
  };

  const handleScissorsClick = () => {
    if (stage === 'unveiling') {
      handleRibbonCut();
    }
  };

  // Confetti particles
  const confettiParticles = Array.from({ length: 50 }, (_, i) => (
    <div
      key={i}
      className={`absolute w-2 h-2 ${
        ['bg-indian-saffron', 'bg-spiritual-500', 'bg-yellow-400', 'bg-pink-400', 'bg-blue-400'][i % 5]
      } animate-bounce`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${1 + Math.random() * 2}s`,
      }}
    />
  ));

  // Fireworks particles - shooting rockets
  const fireworksParticles = Array.from({ length: 15 }, (_, i) => {
    const colors = ['bg-red-500', 'bg-yellow-400', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-indian-saffron'];
    const delay = (i * 0.4) % 3; // Stagger the fireworks
    const leftPosition = 15 + (i % 6) * 12;
    const isLeftSide = leftPosition < 50; // Left side of screen

    return (
      <div
        key={`firework-${i}`}
        className={`absolute w-3 h-8 rounded-full ${colors[i % colors.length]} shadow-lg`}
        style={{
          left: `${leftPosition}%`,
          bottom: '5%',
          animation: isLeftSide
            ? `firework-shoot-split 2.5s ease-out ${delay}s infinite`
            : `firework-shoot 2.5s ease-out ${delay}s infinite`,
          transform: 'translateY(0)',
        }}
      />
    );
  });

  // Split particles for left-side rockets
  const splitParticles = Array.from({ length: 20 }, (_, i) => {
    const colors = ['bg-red-300', 'bg-yellow-300', 'bg-blue-300', 'bg-green-300', 'bg-purple-300', 'bg-pink-300'];
    const delay = (i * 0.4) % 3 + 1.2; // Start splitting after rocket reaches height
    const leftPosition = 15 + (i % 3) * 12; // Only for left side positions
    const splitDirection = (i % 2 === 0) ? -1 : 1; // Split left or right

    return (
      <div
        key={`split-${i}`}
        className={`absolute w-2 h-4 rounded-full ${colors[i % colors.length]} shadow-md`}
        style={{
          left: `${leftPosition}%`,
          bottom: '5%',
          animation: `firework-split 1.5s ease-out ${delay}s infinite`,
          '--split-direction': splitDirection,
        } as React.CSSProperties}
      />
    );
  });

  // Explosion particles
  const explosionParticles = Array.from({ length: 25 }, (_, i) => {
    const colors = ['bg-red-400', 'bg-yellow-300', 'bg-blue-400', 'bg-green-400', 'bg-purple-400', 'bg-pink-400', 'bg-orange-400'];
    const delay = (i * 0.2) % 2.5;
    const angle = (i * 360) / 25; // Spread in circle

    return (
      <div
        key={`explosion-${i}`}
        className={`absolute w-2 h-2 rounded-full ${colors[i % colors.length]}`}
        style={{
          left: `${30 + (i % 4) * 20}%`,
          top: '30%',
          animation: `explosion-burst 1.5s ease-out ${delay}s infinite`,
          '--angle': `${angle}deg`,
        } as React.CSSProperties}
      />
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 text-6xl animate-pulse">🎉</div>
          <div className="absolute top-20 right-20 text-4xl animate-bounce">✨</div>
          <div className="absolute bottom-20 left-20 text-5xl animate-pulse">🎊</div>
          <div className="absolute bottom-10 right-10 text-4xl animate-bounce">🌟</div>
        </div>

        {/* Confetti */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {confettiParticles}
          </div>
        )}

        {/* Fireworks */}
        {showFireworks && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {fireworksParticles}
            {splitParticles}
            {explosionParticles}
          </div>
        )}

        {/* Main ceremony content */}
        <div className="relative bg-gradient-to-br from-indian-cream to-white rounded-2xl p-12 max-w-4xl mx-4 shadow-2xl border-4 border-indian-saffron">
          
          {/* Stage: Unveiling (Combined intro and cutting) */}
          {stage === 'unveiling' && (
            <div className="text-center animate-fade-in">
              {/* Welcome Section */}
              <div className="mb-8">
                <Sparkles className="w-12 h-12 mx-auto text-indian-saffron animate-spin mb-4" />
                <h1 className="text-4xl font-heading font-bold mb-4 text-spiritual-800">
                  🎊 Official Unveiling 🎊
                </h1>
                <p className="text-xl text-spiritual-600 mb-2">
                  Welcome to the unveiling of our
                </p>
                <p className="text-2xl font-heading font-bold text-indian-saffron mb-6">
                  Hinduism for Children Learning Center
                </p>
                <div className="flex justify-center space-x-4 text-3xl animate-bounce mb-8">
                  <span>🕉️</span>
                  <span>📚</span>
                  <span>🎮</span>
                  <span>🎵</span>
                </div>
              </div>
              
              {/* Ribbon */}
              <div className="relative mb-12">
                <div className="flex justify-center items-center">
                  {/* Left side of ribbon */}
                  <div 
                    className={`h-8 bg-gradient-to-r from-red-500 to-red-600 shadow-lg transition-all duration-1000 ${
                      ribbonCut ? 'w-32 transform -translate-x-8 -rotate-12' : 'w-64'
                    }`}
                  />
                  
                  {/* Cut mark */}
                  {ribbonCut && (
                    <div className="w-4 h-8 bg-transparent relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1 h-8 bg-gray-300 transform rotate-12"></div>
                        <div className="w-1 h-8 bg-gray-300 transform -rotate-12 -ml-1"></div>
                      </div>
                    </div>
                  )}
                  
                  {/* Right side of ribbon */}
                  <div 
                    className={`h-8 bg-gradient-to-r from-red-500 to-red-600 shadow-lg transition-all duration-1000 ${
                      ribbonCut ? 'w-32 transform translate-x-8 rotate-12' : 'w-64'
                    }`}
                  />
                </div>
                
                {/* Ribbon bow */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                  <div className="w-12 h-8 bg-red-600 rounded-full shadow-lg"></div>
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-red-700 rounded-full"></div>
                </div>
              </div>

              {/* Scissors */}
              <div 
                className="relative cursor-pointer transform transition-all duration-300 hover:scale-110"
                onClick={handleScissorsClick}
                style={{
                  transform: `translate(${scissorsPosition.x - 50}px, ${scissorsPosition.y - 50}px)`,
                }}
              >
                <Scissors 
                  className={`w-16 h-16 text-gray-600 mx-auto transition-all duration-500 ${
                    ribbonCut ? 'animate-bounce' : 'animate-pulse'
                  }`} 
                />
              </div>

              <p className="text-xl text-spiritual-600 mt-8 animate-pulse">
                {ribbonCut ? '🎉 Ribbon Cut! 🎉' : '✂️ Click the scissors to cut the ribbon! ✂️'}
              </p>

              {ribbonCut && (
                <div className="mt-6">
                  <button
                    onClick={() => setStage('celebration')}
                    className="bg-gradient-to-r from-indian-saffron to-spiritual-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 animate-bounce"
                  >
                    🎊 Continue to Celebration! 🎊
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Stage: Celebration */}
          {stage === 'celebration' && (
            <div className="text-center animate-fade-in">
              <div className="mb-8 flex justify-center space-x-4">
                <Star className="w-12 h-12 text-yellow-400 animate-spin" />
                <Heart className="w-12 h-12 text-pink-500 animate-bounce" />
                <Star className="w-12 h-12 text-yellow-400 animate-spin" />
              </div>
              
              <h2 className="text-5xl font-heading font-bold mb-6 text-spiritual-800 animate-bounce">
                🕉️ Aum Namo Narayanaya 🕉️
              </h2>
              
              <p className="text-2xl text-spiritual-600 mb-4">
                The Learning Center is now officially open!
              </p>
              
              <div className="text-6xl mb-6 animate-pulse">
                🎉 🕉️ 📚 🎮 🎵 🎉
              </div>
              
              <p className="text-xl text-spiritual-700 mb-8">
                Embark on your spiritual learning journey with:
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-lg">
                <div className="bg-spiritual-100 p-4 rounded-lg">
                  <div className="text-2xl mb-2">📖</div>
                  <div>Philosophy</div>
                </div>
                <div className="bg-spiritual-100 p-4 rounded-lg">
                  <div className="text-2xl mb-2">🕉️</div>
                  <div>Deities</div>
                </div>
                <div className="bg-spiritual-100 p-4 rounded-lg">
                  <div className="text-2xl mb-2">📜</div>
                  <div>Scriptures</div>
                </div>
                <div className="bg-spiritual-100 p-4 rounded-lg">
                  <div className="text-2xl mb-2">🎮</div>
                  <div>Games</div>
                </div>
              </div>
              
              <p className="text-lg text-spiritual-600 mt-8 mb-6">
                Welcome to your spiritual learning adventure! ✨
              </p>

              <button
                onClick={() => {
                  setStage('complete');
                  onComplete();
                }}
                className="bg-gradient-to-r from-spiritual-500 to-indian-saffron text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                🚀 Enter Learning Center 🚀
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RibbonCuttingCeremony;
