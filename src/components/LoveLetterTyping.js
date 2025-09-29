import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LoveLetter = () => {
  const [completedParagraphs, setCompletedParagraphs] = useState([]);

  const [typedText, setTypedText] = useState('');
  const [showNavigation, setShowNavigation] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const navigate = useNavigate();

  const letterParagraphs = useMemo(() => [
    "When I get angry with you...",
    "But then I remember how cute you are...",
    "And all my anger just melts away like snow in the sunshine ☀️",
    "Your smile has this magical power to turn my worst days into the most beautiful ones 😊",
    "When you laugh, it's like listening to my favorite song on repeat 🎵",
    "Every time I look into your eyes, I see our entire future together ✨",
    "You're not just my girlfriend, you're my best friend, my home, my everything 💕",
    "Even when we disagree, I love how we always find our way back to each other 💖",
    "Thank you for being the most amazing person in my world, Bhavysri 🌟",
    "I love you more than words could ever express ❤️"
  ], []);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    let charIndex = 0;
    let paragraphIndex = 0;
    
    const typeNextCharacter = () => {
      if (paragraphIndex >= letterParagraphs.length) {
        setIsTyping(false);
        setTimeout(() => setShowNavigation(true), 1000);
        return;
      }

      const currentParagraph = letterParagraphs[paragraphIndex];
      
      if (charIndex < currentParagraph.length) {
        setTypedText(currentParagraph.slice(0, charIndex + 1));
        charIndex++;
        setTimeout(typeNextCharacter, 80); // Typing speed
      } else {
        // Finished typing current paragraph
        setCompletedParagraphs(prev => [...prev, currentParagraph]);
        paragraphIndex++;
        charIndex = 0;
        setTypedText('');
        setTimeout(typeNextCharacter, 800); // Pause between paragraphs
      }
    };

    const startTyping = setTimeout(typeNextCharacter, 1000);

    return () => clearTimeout(startTyping);
  }, [letterParagraphs]);

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      navigate('/video');
    }, 200);
  };

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      navigate('/situation/4');
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
    paddingBottom: '4rem'
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

  const letterStyle = {
    width: '100%',
    maxWidth: '700px',
    margin: '0 auto',
    padding: 'clamp(1.5rem, 4vw, 3rem)',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(15px)',
    borderRadius: '2rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    minHeight: '60vh'
  };

  const paragraphStyle = {
    fontSize: 'clamp(1.125rem, 3vw, 1.375rem)',
    lineHeight: '1.8',
    fontFamily: 'Dancing Script, cursive',
    color: '#374151',
    marginBottom: '1.5rem',
    textAlign: 'center',
    fontWeight: '600'
  };

  const typingParagraphStyle = {
    ...paragraphStyle,
    position: 'relative'
  };

  const cursorStyle = {
    display: 'inline-block',
    width: '2px',
    height: '1.2em',
    backgroundColor: '#f472b6',
    marginLeft: '2px',
    animation: 'blink 1s infinite'
  };

  return (
    <div style={containerStyle}>
      {/* Add blinking cursor animation */}
      <style>
        {`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}
      </style>

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
            color: '#a855f7'
          }}
        >
          ← Previous
        </motion.button>
      </motion.div>

      {/* Background Hearts */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="icon-heart"
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: 'rotate(-45deg)',
              opacity: 0.3,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [-45, -45 + 180, -45 + 360],
              scale: [0.8, 1.1, 0.8],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div style={headerStyle}>
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={titleStyle}
        >
          My Love Letter ♡
        </motion.h1>
      </div>

      <motion.div
        className="glass-medium modern-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={letterStyle}
      >
        {/* Completed Paragraphs */}
        <AnimatePresence>
          {completedParagraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={paragraphStyle}
            >
              {paragraph}
            </motion.p>
          ))}
        </AnimatePresence>

        {/* Currently Typing Paragraph */}
        {isTyping && typedText && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={typingParagraphStyle}
          >
            {typedText}
            <span style={cursorStyle}></span>
          </motion.p>
        )}
      </motion.div>

      {/* Navigation */}
      <AnimatePresence>
        {showNavigation && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
              marginTop: '2rem'
            }}
          >
            {/* Page Indicator */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center'
            }}>
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: '0.75rem',
                    height: '0.75rem',
                    borderRadius: '50%',
                    backgroundColor: index === 4 ? '#f472b6' : 'rgba(244, 114, 182, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>

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
                background: 'linear-gradient(45deg, #f472b6, #a855f7)',
                color: 'white',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                minWidth: '150px'
              }}
            >
              Continue ♡
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoveLetter;