import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [showSpeech, setShowSpeech] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [isPointing, setIsPointing] = useState(false);
  const [showSadTeddy, setShowSadTeddy] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleTeddyAnimationComplete = () => {
    setTimeout(() => {
      setIsPointing(true);
      setShowSpeech(true);
      setTimeout(() => {
        setShowButtons(true);
      }, 1000);
    }, 500);
  };

  const handleNoClick = () => {
    setShowButtons(false);
    setShowSpeech(false);
    setIsPointing(false);
    setShowSadTeddy(true);
    
    setTimeout(() => {
      setShowSadTeddy(false);
      setShowButtons(true);
      setShowSpeech(true);
      setIsPointing(true);
    }, 2000);
  };

  const handleYesClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/love-letter');
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fecaca, #f3e8ff, #ddd6fe)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    position: 'relative'
  };

  const heartContainerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    pointerEvents: 'none'
  };

  const mainContentStyle = {
    textAlign: 'center',
    zIndex: 10,
    position: 'relative'
  };

  const titleStyle = {
    fontSize: 'clamp(2rem, 8vw, 4rem)',
    fontFamily: 'Dancing Script, cursive',
    color: '#5b21b6',
    marginBottom: '2rem',
    filter: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04))'
  };





  const speechTextStyle = {
    fontSize: '1.125rem',
    fontFamily: 'Comic Neue, cursive',
    color: '#1f2937',
    textAlign: 'center',
    margin: 0
  };



  const buttonContainerStyle = {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginTop: '1.5rem'
  };

  const buttonStyle = {
    border: 'none',
    borderRadius: '9999px',
    padding: '0.75rem 2rem',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    transition: 'all 0.2s',
    fontSize: '1rem'
  };

  const yesButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(45deg, #f472b6, #a855f7)',
    color: 'white'
  };

  const noButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(45deg, #9ca3af, #6b7280)',
    color: 'white'
  };

  return (
    <div style={containerStyle}>
      {/* Floating Hearts Background */}
      <div style={heartContainerStyle}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              fontSize: '2rem',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.7,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {i % 4 === 0 ? '💖' : i % 4 === 1 ? '💕' : i % 4 === 2 ? '💝' : '💗'}
          </motion.div>
        ))}
      </div>

      <div style={mainContentStyle}>
        {/* Title */}
        <motion.div
          className="glass-medium rounded-3xl p-8 mb-8 modern-card"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 style={titleStyle}>
            For My Beautiful Bhavyasri 
          </h1>
          <div className="flex items-center justify-center">
            <span style={{fontSize: '2rem', animation: 'heartbeat 1.5s ease-in-out infinite'}}>💕</span>
          </div>
        </motion.div>

        {/* Cute Teddy Bear */}
        {!showSadTeddy && (
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.5 }}
            onAnimationComplete={handleTeddyAnimationComplete}
            style={{ marginBottom: '2rem' }}
          >
            <motion.div
              animate={isPointing ? { 
                rotate: [0, 5, -5, 5, 0],
                scale: [1, 1.1, 1] 
              } : {}}
              transition={{ duration: 0.5, repeat: isPointing ? 3 : 0 }}
              style={{
                fontSize: '6rem',
                textAlign: 'center',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
              }}
            >
              🧸
            </motion.div>
          </motion.div>
        )}

        {/* Sad Teddy */}
        {showSadTeddy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              marginBottom: '2rem',
              fontSize: '6rem',
              textAlign: 'center',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
            }}
          >
            😢🧸
          </motion.div>
        )}

        {/* Speech Bubble */}
        <AnimatePresence>
          {showSpeech && !showSadTeddy && (
            <motion.div
              className="glass-medium rounded-3xl p-4 modern-card shimmer-effect"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              style={{
                position: 'relative',
                marginBottom: '1.5rem',
                maxWidth: '20rem',
                margin: '0 auto 1.5rem auto'
              }}
            >
              <p style={speechTextStyle}>Open Bhavyasri!</p>
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%) translateY(100%)',
                width: 0,
                height: 0,
                borderLeft: '15px solid transparent',
                borderRight: '15px solid transparent',
                borderTop: '15px solid rgba(255, 255, 255, 0.25)'
              }}></div>
            </motion.div>
          )}

          {showSadTeddy && (
            <motion.div
              className="glass-medium rounded-3xl p-4 modern-card"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                position: 'relative',
                marginBottom: '1.5rem',
                maxWidth: '20rem',
                margin: '0 auto 1.5rem auto'
              }}
            >
              <p style={speechTextStyle}>Aww, please? I have something special for you!</p>
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%) translateY(100%)',
                width: 0,
                height: 0,
                borderLeft: '15px solid transparent',
                borderRight: '15px solid transparent',
                borderTop: '15px solid rgba(255, 255, 255, 0.25)'
              }}></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Message */}
        <AnimatePresence>
          {showButtons && (
            <motion.div
              className="glass-strong rounded-3xl p-8 modern-card hover-lift"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              style={{
                maxWidth: '28rem',
                margin: '0 auto 2rem auto'
              }}
            >
              <h2 style={{
                fontSize: '1.5rem',
                fontFamily: 'Comic Neue, cursive',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                My Cutiee: A letter is waiting for you.
              </h2>
              <p style={{
                fontSize: '1.125rem',
                color: '#6b7280',
                marginBottom: '1rem'
              }}>
                Want to see? 💌
              </p>
              <div className="flex items-center justify-center mb-4">
                <span style={{fontSize: '1.5rem', animation: 'heartbeat 1.5s ease-in-out infinite'}}>✨💖✨</span>
              </div>
              
              <div style={buttonContainerStyle}>
                <motion.button
                  className="btn-premium hover-lift"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleYesClick}
                  style={{
                    ...yesButtonStyle,
                    background: 'linear-gradient(135deg, rgba(244, 114, 182, 0.8), rgba(168, 85, 247, 0.8))',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                >
                  Yes! 💕
                </motion.button>
                
                <motion.button
                  className="btn-premium hover-lift"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNoClick}
                  style={{
                    ...noButtonStyle,
                    background: 'linear-gradient(135deg, rgba(156, 163, 175, 0.8), rgba(107, 114, 128, 0.8))',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                >
                  No 🫠
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LandingPage;