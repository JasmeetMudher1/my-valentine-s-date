import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingHearts from '@/components/FloatingHearts';
import Envelope from '@/components/Envelope';
import BentoJourney from '@/components/BentoJourney';
import ValentineQuestion from '@/components/ValentineQuestion';
import Celebration from '@/components/Celebration';
import MusicToggle from '@/components/MusicToggle';

const Index = () => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleEnvelopeOpen = () => {
    setIsEnvelopeOpen(true);
  };

  const handleYes = () => {
    setShowCelebration(true);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Floating Background */}
      <FloatingHearts />

      {/* Music Toggle */}
      <MusicToggle />

      {/* Entrance - Sealed Envelope */}
      <Envelope isOpen={isEnvelopeOpen} onOpen={handleEnvelopeOpen} />

      {/* Main Content - Revealed after envelope opens */}
      <AnimatePresence>
        {isEnvelopeOpen && !showCelebration && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Hero Section */}
            <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-12">
              <motion.div
                className="text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
              >
                <motion.div
                  className="text-6xl md:text-8xl mb-6"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                  💌
                </motion.div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-valentine-deep-pink mb-4 leading-tight">
                  Hey You,
                  <br />
                  <span className="text-gradient-gold">You're Special!</span>
                </h1>
                <p className="text-lg md:text-xl font-body text-valentine-deep-pink/80 max-w-md mx-auto">
                  I've been putting together something just for you...
                  <br />
                  Scroll down to see it all 💕
                </p>
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="w-6 h-10 border-2 border-valentine-pink rounded-full flex justify-center pt-2">
                  <motion.div
                    className="w-1.5 h-1.5 bg-valentine-pink rounded-full"
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            </section>

            {/* Our Journey - Bento Grid */}
            <BentoJourney />

            {/* The Big Question */}
            <ValentineQuestion onYes={handleYes} />

            {/* Footer */}
            <footer className="py-8 text-center">
              <p className="font-body text-sm text-muted-foreground">
                Made with 💖 just for you
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Celebration Screen */}
      <Celebration show={showCelebration} />
    </div>
  );
};

export default Index;
