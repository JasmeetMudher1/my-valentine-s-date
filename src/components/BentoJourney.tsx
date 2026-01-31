import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Heart, Star, Camera, Lock, Unlock, ChevronLeft, ChevronRight } from 'lucide-react';

const memories = [];

const photos = [
  '/my-valentine-s-date/photos/IMG-20240707-WA0015.jpg',
  '/my-valentine-s-date/photos/IMG-20240803-WA0023.jpg',
  '/my-valentine-s-date/photos/IMG-20240803-WA0028.jpg',
  '/my-valentine-s-date/photos/IMG-20240824-WA0010~3.jpg',
  '/my-valentine-s-date/photos/IMG-20240824-WA0018.jpg',
  '/my-valentine-s-date/photos/Screenshot_20241114_212827_Gallery.jpg',
  '/my-valentine-s-date/photos/Screenshot_20241114_213007_Gallery.jpg',
  '/my-valentine-s-date/photos/Snapchat-1938613865~2.jpg',
];

const BentoJourney = () => {
  const [secretRevealed, setSecretRevealed] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <motion.section
      className="py-16 px-4 md:px-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.h2
        className="text-4xl md:text-5xl font-display text-center text-valentine-deep-pink mb-12"
        variants={itemVariants}
      >
        Our Journey Together 💕
      </motion.h2>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[140px] md:auto-rows-[180px]">
        {/* Memory Cards */}
        {/* No memory cards to display */}

        {/* Secret Message Card */}
        <motion.div
          className="glass-card-gold rounded-2xl p-4 md:p-6 cursor-pointer max-w-xl w-full mx-auto flex flex-col justify-center items-center text-center col-span-full mt-0 mb-4"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSecretRevealed(!secretRevealed)}
        >
          <AnimatePresence mode="wait">
            {!secretRevealed ? (
              <motion.div
                key="locked"
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Lock className="w-8 h-8 text-valentine-gold mb-2" />
                <p className="font-display text-lg text-valentine-gold">
                  Tap to reveal a secret...
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="unlocked"
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <Unlock className="w-6 h-6 text-valentine-gold mb-2" />
                <p className="font-display text-xl md:text-2xl text-valentine-deep-pink">
                  "You make my heart skip a beat every single day" 💗
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        {/* Removed special stats and stars cards */}
      </div>

      {/* Photo Gallery Card - moved below the grid */}
      <motion.div
        className="glass-card rounded-2xl p-3 max-w-xl w-full mx-auto mt-8 overflow-hidden relative"
        variants={itemVariants}
      >
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
          <Camera className="w-4 h-4 text-valentine-deep-pink" />
          <span className="font-display text-sm text-valentine-deep-pink">Our Memories</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.img
            key={currentPhoto}
            src={photos[currentPhoto]}
            alt="Memory"
            className="w-full max-h-96 object-contain rounded-xl bg-white"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Navigation */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <motion.button
            onClick={() => setCurrentPhoto((p) => (p - 1 + photos.length) % photos.length)}
            className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-4 h-4 text-valentine-deep-pink" />
          </motion.button>
          <div className="flex gap-1.5">
            {photos.map((_, i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === currentPhoto ? 'bg-valentine-deep-pink' : 'bg-white/60'
                }`}
                animate={{ scale: i === currentPhoto ? 1.2 : 1 }}
              />
            ))}
          </div>
          <motion.button
            onClick={() => setCurrentPhoto((p) => (p + 1) % photos.length)}
            className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-4 h-4 text-valentine-deep-pink" />
          </motion.button>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default BentoJourney;
