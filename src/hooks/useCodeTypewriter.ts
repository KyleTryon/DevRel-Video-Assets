import { useCurrentFrame } from 'remotion';

export interface UseCodeTypewriterOptions {
  code: string;
  speed: number; // Characters per frame
  startFrame?: number;
  enabled?: boolean;
}

export interface UseCodeTypewriterResult {
  displayedText: string;
  isComplete: boolean;
  progress: number; // 0-1
}

/**
 * SIMPLE frame-based typewriter with word bursting effect
 */
export function useCodeTypewriter({
  code,
  speed,
  startFrame = 0,
  enabled = true,
}: UseCodeTypewriterOptions): UseCodeTypewriterResult {
  const frame = useCurrentFrame();
  
  if (!enabled) {
    return {
      displayedText: code,
      isComplete: true,
      progress: 1,
    };
  }

  const adjustedFrame = Math.max(0, frame - startFrame);
  
  // Calculate character position with burst effect
  let charsToShow = 0;
  let currentFrame = 0;
  let inWord = false;
  
  for (let i = 0; i < code.length; i++) {
    const char = code[i];
    const isSpace = char === ' ' || char === '\n' || char === '\t';
    
    // Burst typing: go faster in the middle of words, slower at spaces
    const wasInWord = inWord;
    inWord = !isSpace;
    
    let charSpeed = speed;
    if (inWord && wasInWord) {
      // In middle of word - burst faster (1.5x speed)
      charSpeed = speed * 1.5;
    } else if (isSpace) {
      // At space - slow down (0.7x speed)
      charSpeed = speed * 0.7;
    }
    
    currentFrame += 1 / charSpeed;
    
    if (adjustedFrame >= currentFrame) {
      charsToShow = i + 1;
    } else {
      break;
    }
  }
  
  const totalChars = code.length;
  const actualCharsToShow = Math.min(charsToShow, totalChars);
  
  const displayedText = code.slice(0, actualCharsToShow);
  const isComplete = actualCharsToShow >= totalChars;
  const progress = totalChars > 0 ? actualCharsToShow / totalChars : 1;

  return {
    displayedText,
    isComplete,
    progress,
  };
}
