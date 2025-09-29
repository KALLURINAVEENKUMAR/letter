import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FinalPage = () => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const emotions = [
    { emotion: '😍', label: 'Adoration' },
    { emotion: '🥰', label: 'Love' },
    { emotion: '😘', label: 'Affection' },
    { emotion: '💕', label: 'Hearts' },
    { emotion: '🌟', label: 'Sparkle' },
    { emotion: '🦋', label: 'Butterflies' },
    { emotion: '🌈', label: 'Rainbow' },
    { emotion: '✨', label: 'Magic' }
  ];

  const handlePlayVoiceMessage = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setShowCelebration(true);
        }).catch(console.error);
      }
    }
  };

  const handleRestart = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      navigate('/');
    }, 200);
  };

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      navigate('/video');
    }, 200);
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fce7f3, #f3e8ff, #e0e7ff)',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '2rem',
    paddingBottom: '4rem',
    position: 'relative'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '2rem',
    width: '100%',
    maxWidth: '800px'
  };

  const titleStyle = {
    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
    fontFamily: 'Dancing Script, cursive',
    background: 'linear-gradient(135deg, #a855f7, #f472b6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '1rem',
    fontWeight: '700'
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto 2rem auto'
  };

  const voiceCardStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(15px)',
    borderRadius: '2rem',
    padding: 'clamp(1.5rem, 4vw, 2rem)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    textAlign: 'center',
    marginBottom: '2rem'
  };

  const emotionGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
    maxWidth: '600px',
    width: '100%'
  };

  const emotionCardStyle = {
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '1rem',
    padding: '1rem',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.3s ease'
  };



  const buttonStyle = {
    padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
    borderRadius: '2rem',
    border: 'none',
    fontWeight: '600',
    fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textShadow: '0 1px 2px rgba(0,0,0,0.2)'
  };

  const voiceButtonStyle = {
    ...buttonStyle,
    background: isPlaying 
      ? 'linear-gradient(45deg, #10b981, #06d6a0)' 
      : 'linear-gradient(45deg, #f472b6, #a855f7)',
    color: 'white',
    fontSize: 'clamp(1rem, 3vw, 1.25rem)',
    minWidth: '200px'
  };

  return (
    <div style={containerStyle}>
      {/* Confetti Effect */}
      {showCelebration && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          pointerEvents: 'none'
        }}>
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: '-50px',
                fontSize: '2rem',
              }}
              animate={{
                y: [0, window.innerHeight + 100],
                x: [0, (Math.random() - 0.5) * 200],
                rotate: [0, 360],
                opacity: [1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
              }}
            >
              {emotions[Math.floor(Math.random() * emotions.length)].emotion}
            </motion.div>
          ))}
        </div>
      )}

      {/* Back Button - Top Right */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          maxWidth: '800px',
          marginBottom: '1rem'
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
            color: '#a855f7'
          }}
        >
          ← Back
        </motion.button>
      </motion.div>

      <div style={headerStyle}>
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={titleStyle}
        >
          You're My Everything ♡
        </motion.h1>
      </div>

      <motion.div
        className="glass-medium modern-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={cardStyle}
      >
        <div style={voiceCardStyle}>
          <h2 style={{
            fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
            fontFamily: 'Dancing Script, cursive',
            color: '#374151',
            marginBottom: '1rem',
            fontWeight: '600'
          }}>
            A Special Message for You
          </h2>
          
          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.125rem)',
            color: '#6b7280',
            marginBottom: '1.5rem',
            lineHeight: '1.6'
          }}>
            Click below to hear my voice telling you how much I love you ♡
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayVoiceMessage}
            style={voiceButtonStyle}
          >
            {isPlaying ? '⏸️ Pause' : '▶️ Play Message'}
          </motion.button>

          <audio
            ref={audioRef}
            src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
            onEnded={() => setIsPlaying(false)}
          />
        </div>

        {/* Emotion Collage */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={emotionGridStyle}
        >
          {emotions.map((item, index) => (
            <motion.div
              key={index}
              className="modern-card hover-lift"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              style={emotionCardStyle}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                {item.emotion}
              </div>
              <div style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#6b7280'
              }}>
                {item.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Restart Button - Bottom Center */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
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
          onClick={handleRestart}
          style={{
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            borderRadius: '2rem',
            background: 'linear-gradient(45deg, #f472b6, #a855f7)',
            color: 'white',
            border: 'none',
            fontWeight: '600',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            minWidth: '150px'
          }}
        >
          Start Over ♡
        </motion.button>
      </motion.div>
    </div>
  );
};

export default FinalPage;
