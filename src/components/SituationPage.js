import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';

const SituationPage = ({ situation, currentIndex, totalSituations }) => {

  const [showContent, setShowContent] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    // Auto-play music when component loads
    const musicTimer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(console.error);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(musicTimer);
    };
  }, []);

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      if (currentIndex < totalSituations - 1) {
        navigate(`/situation/${currentIndex + 2}`);
      } else {
        navigate('/love-letter');
      }
    }, 200);
  };

  const handlePrevious = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      if (currentIndex > 0) {
        navigate(`/situation/${currentIndex}`);
      } else {
        navigate('/');
      }
    }, 200);
  };



  const getThemeColors = () => {
    switch (situation.theme) {
      case 'funny':
        return {
          bg: 'linear-gradient(135deg, rgba(254, 243, 199, 0.9), rgba(254, 215, 170, 0.9))',
          text: '#9a3412',
          button: 'linear-gradient(45deg, #facc15, #f97316)',
          emoji: '😄',
          glassType: 'glass-light'
        };
      case 'emotional':
        return {
          bg: 'linear-gradient(135deg, rgba(219, 234, 254, 0.9), rgba(224, 231, 255, 0.9))',
          text: '#5b21b6',
          button: 'linear-gradient(45deg, #60a5fa, #a855f7)',
          emoji: '💙',
          glassType: 'glass-medium'
        };
      case 'happy':
        return {
          bg: 'linear-gradient(135deg, rgba(252, 231, 243, 0.9), rgba(254, 243, 199, 0.9))',
          text: '#db2777',
          button: 'linear-gradient(45deg, #f472b6, #facc15)',
          emoji: '😊',
          glassType: 'glass-light'
        };
      case 'cheerful':
        return {
          bg: 'linear-gradient(135deg, rgba(209, 250, 229, 0.9), rgba(219, 234, 254, 0.9))',
          text: '#166534',
          button: 'linear-gradient(45deg, #4ade80, #06b6d4)',
          emoji: '😂',
          glassType: 'glass-medium'
        };
      default:
        return {
          bg: 'linear-gradient(135deg, rgba(252, 231, 243, 0.9), rgba(243, 232, 255, 0.9))',
          text: '#a855f7',
          button: 'linear-gradient(45deg, #f472b6, #a855f7)',
          emoji: '💖',
          glassType: 'glass-strong'
        };
    }
  };

  const theme = getThemeColors();

  const containerStyle = {
    minHeight: '100vh',
    background: theme.bg,
    padding: '1rem',
    position: 'relative'
  };

  const backgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    pointerEvents: 'none'
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 10,
    maxWidth: '64rem',
    margin: '0 auto'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '2rem'
  };

  const titleStyle = {
    fontSize: 'clamp(1.875rem, 6vw, 3rem)',
    fontFamily: 'Dancing Script, cursive',
    color: theme.text,
    marginBottom: '1rem'
  };

  const descriptionStyle = {
    fontSize: 'clamp(1rem, 4vw, 1.25rem)',
    color: theme.text,
    opacity: 0.8
  };



  const videoContainerStyle = {
    aspectRatio: '16 / 9',
    borderRadius: '1rem',
    overflow: 'hidden',
    marginBottom: '1.5rem'
  };

  const dotStyle = (isActive) => ({
    width: '0.75rem',
    height: '0.75rem',
    borderRadius: '50%',
    backgroundColor: isActive ? 'white' : 'rgba(255, 255, 255, 0.5)',
    boxShadow: isActive ? '0 4px 6px -4px rgb(0 0 0 / 0.1)' : 'none'
  });

  return (
    <div style={containerStyle}>
      {/* Background Effects */}
      <div style={backgroundStyle}>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="icon-heart"
            style={{
              position: 'absolute',
              opacity: 0.4,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: 'rotate(-45deg)',
              background: `linear-gradient(45deg, ${theme.iconColor}, ${theme.iconColor}99)`
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [-45, -45 + 180, -45 + 360],
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div style={contentStyle}>
        {/* Previous Button - Top Right */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: showContent ? 1 : 0, x: showContent ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '1rem'
          }}
        >
          <motion.button
            className="btn-premium hover-lift"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevious}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              borderRadius: '1rem',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: theme.text
            }}
          >
            ← Previous
          </motion.button>
        </motion.div>

        {/* Header */}
        <motion.div
          className={`${theme.glassType} rounded-3xl p-6 modern-card mb-6`}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : -30 }}
          transition={{ duration: 0.8 }}
          style={headerStyle}
        >
          <h1 style={titleStyle}>{situation.title}</h1>
          <p style={descriptionStyle}>{situation.description}</p>
          <div className="flex items-center justify-center mt-4">
            <div className="icon-heart heartbeat" style={{
              transform: 'rotate(-45deg)',
              background: `linear-gradient(45deg, ${theme.iconColor}, ${theme.iconColor}dd)`
            }}></div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className={`${theme.glassType} rounded-3xl hover-lift modern-card`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0.9 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            padding: 'clamp(1.5rem, 4vw, 2rem)',
            marginBottom: '2rem'
          }}
        >
          {/* Content Section */}
          {situation.content && (
            <div className="glass-light rounded-2xl p-6 mb-6 shimmer-effect" style={{
              fontSize: '1.125rem',
              lineHeight: '1.6',
              color: '#374151',
              fontFamily: 'Dancing Script, cursive',
              textAlign: 'center',
              fontWeight: '600'
            }}>
              {situation.content}
            </div>
          )}

          {/* Video Player */}
          <div style={videoContainerStyle}>
            <ReactPlayer
              url={situation.videoUrl}
              width="100%"
              height="100%"
              controls={true}
              playing={false}
              light={true}
            />
          </div>

          {/* Hidden Audio Player */}
          <audio
            ref={audioRef}
            src={situation.musicUrl}
            loop
          />

          {/* Situation Counter */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <span style={{
              color: theme.text,
              fontSize: '0.875rem',
              fontWeight: '600'
            }}>
              {currentIndex + 1} of {totalSituations}
            </span>
          </div>
        </motion.div>

        {/* Page Indicator Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '2rem'
          }}
        >
          {[...Array(totalSituations)].map((_, index) => (
            <div
              key={index}
              style={dotStyle(index === currentIndex)}
            />
          ))}
        </motion.div>

        {/* Next Button - Bottom Center */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem'
          }}
        >
          <motion.button
            className="btn-premium hover-lift"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            style={{
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              borderRadius: '2rem',
              background: theme.button,
              color: 'white',
              border: 'none',
              fontWeight: '600',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
              minWidth: '150px'
            }}
          >
            {currentIndex === totalSituations - 1 ? 'Love Letter ♡' : 'Next →'}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default SituationPage;