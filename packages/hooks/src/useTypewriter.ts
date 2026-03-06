import { useState, useEffect, useRef } from 'react';

interface UseTypewriterOptions {
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  startDelay?: number;
}

export const useTypewriter = (phrases: string[], options?: UseTypewriterOptions) => {
  const {
    typingSpeed = 55,
    deletingSpeed = 35,
    pauseDuration = 2200,
    startDelay = 1800,
  } = options || {};

  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!hasStarted) {
      timerRef.current = setTimeout(() => {
        setHasStarted(true);
      }, startDelay);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }

    const i = loopNum % phrases.length;
    const fullText = phrases[i];

    const handleTyping = () => {
      setText(current => {
        if (isDeleting) {
          return fullText.substring(0, current.length - 1);
        }
        return fullText.substring(0, current.length + 1);
      });

      let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && text === fullText) {
        typeSpeed = pauseDuration;
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        typeSpeed = typingSpeed;
      }

      timerRef.current = setTimeout(handleTyping, typeSpeed);
    };

    timerRef.current = setTimeout(handleTyping, typingSpeed);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, isDeleting, loopNum, hasStarted, phrases, typingSpeed, deletingSpeed, pauseDuration, startDelay]);

  return { text };
};
