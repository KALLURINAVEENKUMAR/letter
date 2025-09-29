import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const VideoPage = () => {
  const [showContent, setShowContent] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
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

    // Show navigation after a delay
    const navTimer = setTimeout(() => {
      setShowNavigation(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(musicTimer);
      clearTimeout(navTimer);
    };
  }, []);

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      navigate('/');
    }, 200);
  };

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      navigate('/love-letter');
    }, 200);
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fce7f3, #f3e8ff, #e0e7ff)',
    padding: '1rem',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '4rem',
    paddingBottom: '4rem'
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
    maxWidth: '900px',
    width: '100%',
    margin: '0 auto'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '3rem'
  };

  const titleStyle = {
    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
    fontFamily: 'Dancing Script, cursive',
    background: 'linear-gradient(135deg, #dc2626, #7c2d12)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '1rem',
    fontWeight: '700'
  };

  const subtitleStyle = {
    fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
    fontFamily: 'Comic Neue, cursive',
    color: '#7c2d12',
    fontWeight: '600',
    opacity: 0.9
  };

  const cardStyle = {
    padding: 'clamp(1.5rem, 4vw, 2.5rem)',
    marginBottom: '2rem'
  };

  const videoContainerStyle = {
    aspectRatio: '16 / 9',
    borderRadius: '1rem',
    overflow: 'hidden',
    marginBottom: '1.5rem'
  };

  return (
    <div style={containerStyle}>
      {/* Previous Button - Top Right */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          zIndex: 20
        }}
      >
        <motion.button
          className="btn-premium hover-lift"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBack}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '0.9rem',
            borderRadius: '1rem',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#dc2626'
          }}
        >
          ← Previous
        </motion.button>
      </motion.div>

      {/* Background Effects */}
      <div style={backgroundStyle}>
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            😤
          </motion.div>
        ))}
      </div>

      <div style={contentStyle}>
        {/* Header */}
        <motion.div
          className="glass-medium rounded-3xl p-6 modern-card mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : -30 }}
          transition={{ duration: 0.8 }}
          style={headerStyle}
        >
          <h1 style={titleStyle}>
            Me to some boys :
          </h1>
          {/* <p style={subtitleStyle}>
            Stay away from my girlfriend! 😤
          </p> */}
          <div className="flex items-center justify-center mt-4">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
              style={{
                fontSize: '2rem'
              }}
            >
              🙂
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="glass-light rounded-3xl modern-card hover-lift"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0.9 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={cardStyle}
        >
          {/* Video Player */}
          <div style={videoContainerStyle}>
            <video
              width="100%"
              height="100%"
              controls
              preload="metadata"
              crossOrigin="anonymous"
              style={{
                borderRadius: '1rem',
                objectFit: 'contain',
                backgroundColor: '#000',
                maxWidth: '100%',
                maxHeight: '100%'
              }}
              onError={(e) => {
                console.error('Video error:', e);
                console.error('Error details:', e.target.error);
                console.log('Trying to load:', e.target.currentSrc);
              }}
              onLoadedData={() => {
                console.log('Video loaded successfully');
              }}
              onLoadStart={() => {
                console.log('Video load started');
              }}
              onCanPlay={() => {
                console.log('Video can play');
              }}
            >
              <source src={`${process.env.PUBLIC_URL}/Video.mp4`} type="video/mp4" />
              <source src="/Video.mp4" type="video/mp4" />
              <source src="./Video.mp4" type="video/mp4" />
              <p style={{ 
                color: '#dc2626', 
                textAlign: 'center', 
                padding: '2rem',
                fontSize: '1.2rem',
                fontFamily: 'Dancing Script, cursive'
              }}>
                🎬 Video is loading... If it doesn't appear, the file might need to be in a different format.
                <br />
                <small>Trying to load: {`${process.env.PUBLIC_URL}/Video.mp4`}</small>
              </p>
            </video>
          </div>

          {/* Hidden Audio Player */}
          <audio
            ref={audioRef}
            src="https://www.soundjay.com/misc/sounds/dramatic-music.mp3"
            loop
          />

          {/* Message */}
          <div style={{
            textAlign: 'center',
            fontSize: 'clamp(1.125rem, 3vw, 1.375rem)',
            lineHeight: '1.6',
            color: '#7c2d12',
            fontFamily: 'Dancing Script, cursive',
            fontWeight: '600',
            marginTop: '1rem'
          }}>
            "Brooooooo..!!! That's my girl💪"
          </div>
        </motion.div>

        {/* Navigation */}
        {showNavigation && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
              marginTop: '2rem'
            }}
          >
            {/* Next Button */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              style={{
                padding: 'clamp(0.75rem, 2vw, 1rem) clamp(2rem, 5vw, 2.5rem)',
                borderRadius: '2rem',
                border: 'none',
                fontWeight: '600',
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                cursor: 'pointer',
                background: 'linear-gradient(45deg, #dc2626, #991b1b)',
                color: 'white',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                minWidth: '160px'
              }}
            >
              Start Over ♡
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VideoPage;