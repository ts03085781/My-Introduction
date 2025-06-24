import { useState, useEffect } from 'react';
import { MessageContent } from '@/types/aiChat';

//打字機效果組件
const Typewriter = ({ text, typingSpeed = 50 }: MessageContent) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, typingSpeed, text]);

  return <span>{displayText}</span>;
};

export default Typewriter;
