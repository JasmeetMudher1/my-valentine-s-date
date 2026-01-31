import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Heart, Star, Camera, Lock, Unlock, ChevronLeft, ChevronRight } from 'lucide-react';

const memories = [
  { id: 1, emoji: '☕', title: 'First Coffee Date', description: 'When our story began...' },
  { id: 2, emoji: '🌙', title: 'Late Night Talks', description: 'Hours felt like minutes' },
  { id: 3, emoji: '🎬', title: 'Movie Marathons', description: 'Sharing the same blanket' },
  { id: 4, emoji: '🍕', title: 'Pizza Adventures', description: 'Your favorite toppings' },
];

const photos = [
  'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&h=300&fit=crop',
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
        {memories.map((memory, index) => (
          <motion.div
            key={memory.id}
            className={`glass-card rounded-2xl p-4 md:p-6 flex flex-col justify-between cursor-default ${
              index === 0 ? 'md:col-span-2 md:row-span-1' : ''
            }`}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-3xl md:text-4xl">{memory.emoji}</span>
            <div>
              <h3 className="font-display text-lg md:text-xl text-valentine-deep-pink">
                {memory.title}
              </h3>
              <p className="text-sm text-muted-foreground font-body">{memory.description}</p>
            </div>
          </motion.div>
        ))}

        {/* Secret Message Card */}
        <motion.div
          className="glass-card-gold rounded-2xl p-4 md:p-6 cursor-pointer md:col-span-2 row-span-1 flex flex-col justify-center items-center text-center"
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

        {/* Photo Gallery Card */}
        <motion.div
          className="glass-card rounded-2xl p-3 md:col-span-2 row-span-2 overflow-hidden relative"
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
              className="w-full h-full object-cover rounded-xl"
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

        {/* Special Stats Card */}
        <motion.div
          className="glass-card rounded-2xl p-4 md:p-6 flex flex-col justify-center items-center text-center"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <Heart className="w-8 h-8 text-valentine-pink fill-valentine-pink mb-2" />
          <p className="font-display text-2xl md:text-3xl text-valentine-deep-pink">∞</p>
          <p className="text-sm text-muted-foreground font-body">Reasons I love you</p>
        </motion.div>

        {/* Stars Card */}
        <motion.div
          className="glass-card rounded-2xl p-4 md:p-6 flex flex-col justify-center items-center text-center"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <Star className="w-8 h-8 text-valentine-gold fill-valentine-gold mb-2" />
          <p className="font-display text-2xl md:text-3xl text-valentine-deep-pink">5/5</p>
          <p className="text-sm text-muted-foreground font-body">Best partner rating</p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BentoJourney;
