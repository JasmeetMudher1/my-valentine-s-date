import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Heart } from 'lucide-react';

interface ValentineQuestionProps {
  onYes: () => void;
}

const ValentineQuestion = ({ onYes }: ValentineQuestionProps) => {
  const [noAttempts, setNoAttempts] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isNoTransformed, setIsNoTransformed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  // Yes button scale animation
  const yesScale = useMotionValue(1);
  const yesShadow = useTransform(
    yesScale,
    [1, 1.1],
    ['0 4px 20px rgba(255, 194, 209, 0.4)', '0 8px 40px rgba(255, 194, 209, 0.6)']
  );

  useEffect(() => {
    // Heartbeat animation for Yes button
    const animation = animate(yesScale, [1, 1.08, 1, 1.08, 1], {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    });

    return () => animation.stop();
  }, [yesScale]);

  const noMessages = [
    'No',
    'Please? 🥺',
    'I love you! 💖',
    'You can do this! 💪',
    'Pretty please? 😘',
    'Are you sure? 😳',
    'Don’t break my heart! 💔',
    'You’re my favorite! 🌹',
    'Say yes, it’s fate! ✨',
    'You make me smile! 😊',
    'Let’s make memories! 📸',
    'You’re the best! 🏆',
    'I’ll bring chocolate! 🍫',
    'I’ll be so happy! 🥰',
    'You light up my world! 🌟',
    'Forever us? 💑',
    'You’re my everything! 💞',
    'Please, please, please! 🙏',
    'I can’t do this without you! 😢',
    'Say yes for me! 💌',
  ];

  const runAwayNo = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.preventDefault();
    setNoAttempts((prev) => prev + 1);
  }, []);

  const handleNoMouseEnter = () => {
    runAwayNo();
  };

  const handleNoTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    runAwayNo();
  };

  return (
    <motion.section
      ref={containerRef}
      className="py-20 px-4 min-h-[70vh] flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Decorative Hearts */}
      <motion.div
        className="absolute top-10 left-10 text-6xl text-valentine-pink/30"
        animate={{ rotate: [0, 10, -10, 0], y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        ♥
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-10 text-4xl text-valentine-gold/40"
        animate={{ rotate: [0, -10, 10, 0], y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      >
        ✦
      </motion.div>

      <motion.h2
        className="text-4xl md:text-6xl font-display text-center text-valentine-deep-pink mb-4"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        The Big Question...
      </motion.h2>

      <motion.p
        className="text-xl md:text-2xl font-body text-valentine-deep-pink/80 mb-12 text-center"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        I've been meaning to ask you something special...
      </motion.p>

      <motion.h3
        className="text-3xl md:text-5xl font-display text-center mb-12"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
      >
        <span className="text-gradient-romantic">Will you be my Valentine?</span>
        <span className="ml-2">💝</span>
      </motion.h3>

      <div className="w-full flex justify-center">
        <div
          ref={containerRef}
          className="relative flex flex-col sm:flex-row items-center gap-8 min-h-[300px] w-full max-w-xl justify-center border-2 border-dashed border-valentine-pink/30 rounded-2xl bg-white/10"
          style={{overflow: 'hidden'}}
        >
        {/* YES Button */}
        <motion.button
          onClick={onYes}
          className="btn-valentine z-10 flex items-center gap-2"
          style={{ scale: yesScale, boxShadow: yesShadow }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
        >
          <Heart className="w-5 h-5 fill-current" />
          Yes!
          <Heart className="w-5 h-5 fill-current" />
        </motion.button>

        {/* NO Button - The Tricky One */}
        {!isNoTransformed ? (
          <motion.button
            ref={noButtonRef}
            className="px-8 py-4 rounded-full font-display text-xl bg-muted text-muted-foreground transition-all duration-200 select-none"
            style={{
              position: 'relative',
              cursor: 'pointer',
            }}
            whileHover={{ scale: 1.08, rotate: [0, 5, -5, 0] }}
            whileTap={{ scale: 0.95 }}
            onClick={runAwayNo}
            onTouchStart={runAwayNo}
          >
            {noMessages[noAttempts % noMessages.length]}
          </motion.button>
        ) : (
          <motion.button
            onClick={onYes}
            className="btn-valentine flex items-center gap-2"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className="w-4 h-4 fill-current" />
            Okay, Yes! 💕
          </motion.button>
        )}
        </div>
      </div>

      {noAttempts > 0 && noAttempts < 5 && (
        <motion.p
          className="mt-8 text-base text-valentine-pink font-body animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          The No button is too quick for you! 💨
        </motion.p>
      )}

      {isNoTransformed && (
        <motion.p
          className="mt-8 text-lg text-valentine-deep-pink font-display"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          See? There was never really a choice 💖
        </motion.p>
      )}
    </motion.section>
  );
};

export default ValentineQuestion;
