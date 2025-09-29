import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LoveLetter = () => {
  const [visibleParagraphs, setVisibleParagraphs] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [showNavigation, setShowNavigation] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  const letterParagraphs = useMemo(() => [
    "Enti bhavya yedho badha badha ga undi vadili veltunte. heart mottom heavy heavy ga undi enduko, istamaina vallaki dooram ga velthe inthe emo. ee 1 month naku colorful days ga gadichai bhavyasrii, ahh sushmitha pg , na pg la feel ayya. emo nuv pilisthe yekkadikaina ravali anipisthadhi. comedy enti ante nuv chala strong nik evari avasaram ledhu antav, kani nakenti ante i should be with you my storng cutie. enti cring ga undaa ??",
    
    "ni gurinchi nak prathi chinna chinnaaaa vishyam gurtuntadhi endukante ni vishyam lo naku yedhi chinnadhi kadhu. anni observe cheskunta. ni daggara enduko ego,attittude selfrepect asalu undav bokka anni intlo petti vasta endukante nik unnai ga chalu le ani iddarki unte bagodhu kadhaaa. Kaani bhavyasri ninnu evadaina cute bokka tokka ante mental mentalll vachhesthadhi bokka evad adu asalu anataniki pakkana undi ani unte pagilipoyedhi pakka antha temper vastadhi enduko anthe adhi don't question why ani!",
    
    "Evadaina touch chesadu pics lo ante ne volcano kuda antha heat undadhu emo antha kopam pichhi mental yekkesthadhi, ahh pics lo evado blue shirt pakkana nunchunnadu ani chusthene temper vachhindi, sarle i know abt You where you keep the persons ani kani ahh time lo ahh kopam veru inka, na best rides ante nitho scooty midha tiragatam bhavyasri, entha entha entha baguntadhooo asalu road chudalo addam lo ni face chudalo ardam kadhu kani first priority ni face chuddam ane untadhi, road em undi i can handle kadhaaa!!! chinnaga smile chestunnav ga",
    "Paina music icon undi song nachhakapothe off chey click chey chalu",
    "asal nak ardam kadhu pics tise vadini nen undaga digataniki nikem ayyindi, nuv digu nenu min 1000 pics tiyataniki ayna ready bhavyasri, antav ga antha opika yela ani. Na time ki nik iddam ani fix aynapppudu bokkalo opika em undi ni istam yentha sepu ayna unta, ee madhyam bale chinna pilla la chestunnav mari nak ala anipistunda ??",
    
    "asal nenu intha change avtha ani nak ardam kala , nen enti grahanam patinchatam enti, bhuthulu tirige notlo palakaleni words tho hanuman chalisa nerchukotam enti, zomato ni veg mode lo marchatam enti, okkasari venakki tirigi chusthe areyy nene na idhi anipistundi. Marchesav, Maripoya kuda. ento nuv cheppedhi vinali anipistahdhi, Non-veg tinoddu annav tinatla( Note: upto dussehra asaluuu vaddu ante cheppu bokka maanidobbutha bokkalo non-veg )",
    
    "Bhavyasriii nuv intha sensitive anukoledhu, cute ga kallalo nillu vachhai ante naku areyyy ayyaaa ani anipinchindi asalu nen aunty ni enduku anta, mem frnds ani nik telida cheppu ahhaaa cheppuu. Mundu evaraina mimmalni emanna antene urkonu alantine how I ? mottoniki ramoji film city yeggottav sarleee em undi !:)",
    
    "asaluuuu ee sunnandalu yekkada tagilai naku, na midha arichesav ahh sunnandala valla. Na Hyd life lo ahh sunnandalaki manchi villain character istha. My thanks to repalle express diver. correct time ki vellipoyindi. happy ga nitho ala market ki velli spend chesina time chalu anipinchindi, palnadu ki veltunna kuda abaaa vellalaa anipinchindi kani tappdhu ga function asaleeeeee manam select chesina dress veskovali kadha!!",
    
    "Na worst feel ento telsa nuv na valla upset ayyav ani telisina vishyam ahh roju the worst asalu chi nenduku na valla enduku papam ( sorry papam anakudadhu kadha ), na valla enduku bhavya andavarsam ga upset ayyindi ani. Nuv nannu chempakesi pikuthav chusava yedho lkg pilla kottinnatu feel avtha cute ga.",
    
    "idhi koncham nik kopam teppinche vishyame....!! nak ni frnds ki kalavali anipinchadhu bhavya, 1st time sky view ki kuda anduke ranu ranu anna emanna office frinds untaru emo ani, endukante nuv emo angel la untav manam yekkadoo worst ga untam malli evaraina entra ahh ammai ahh abbai tho ani antaru emo aniiiii chinna insecure. taravta ahh bokkale ani vadilesa. Ante comments cheskuntaru ga pakka manaki telsu, Ala ninnu comments lo mention cheyatam kuda nak istam undadhu.",
    
    "Bhavya yeppudu cheppedhee...!! Nuvvante nak chalaaa istam , pichhi etc etc..... sarle marii yekkuva rasesa.",
    
    "Bye bondam. Hyd lo frnds tho jagratta evari intensions yela untayo ani, mundu ahh relative gadini koncham duram pettu ( ni istam nak anipinchindi cheppa anthe ) baga irritate chestunnadu dhinamma malli enduku le ante feel avthadu ani silent unna. Nijam ga chala ante chalaaa miss avtha bhavyasrii. dhinamma rastunnadu appudu kuda edho emotional........... sarle Byeeeeeee."
  ], []);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Auto-play music when component loads
    const musicTimer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(console.error);
      }
    }, 1000);
    
    const intervals = letterParagraphs.map((_, index) => {
      return setTimeout(() => {
        setVisibleParagraphs(index + 1);
        if (index === letterParagraphs.length - 1) {
          setTimeout(() => setShowNavigation(true), 1500);
        }
      }, (index + 1) * 2000);
    });

    return () => {
      intervals.forEach(clearTimeout);
      clearTimeout(musicTimer);
    };
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
      navigate('/');
    }, 200);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(console.error);
      }
    }
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
    fontFamily: 'Kalam, cursive',
    color: '#374151',
    marginBottom: '1.5rem',
    textAlign: 'center',
    fontWeight: '500'
  };



  return (
    <div style={containerStyle}>
      {/* Top Controls - Previous Button and Music Toggle */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          left: '2rem',
          zIndex: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        {/* Music Toggle Button - Top Left */}
        <motion.button
          className="btn-premium hover-lift"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMusic}
          style={{
            padding: '0.5rem',
            fontSize: '1.2rem',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: isPlaying ? '#f472b6' : '#6b7280',
            width: '3rem',
            height: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {isPlaying ? '🎵' : '🔇'}
        </motion.button>

        {/* Previous Button - Top Right */}
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
          ♡B♡
        </motion.h1>
      </div>

      <motion.div
        className="glass-medium modern-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={letterStyle}
      >
        <AnimatePresence>
          {letterParagraphs.slice(0, visibleParagraphs).map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={paragraphStyle}
            >
              {paragraph}
            </motion.p>
          ))}
        </AnimatePresence>
      </motion.div>

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
              width: '100%',
              maxWidth: '700px',
              marginTop: '2rem',
              gap: '1.5rem'
            }}
          >
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
                minWidth: '160px'
              }}
            >
              Continue ♡
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Audio Player */}
      <audio
        ref={audioRef}
        src={`${process.env.PUBLIC_URL}/Letter_Song.mp3`}
        loop
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default LoveLetter;
