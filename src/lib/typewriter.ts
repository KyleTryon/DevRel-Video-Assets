/**
 * Remotion-compatible code typewriter animation
 * Uses frame-based timeline for deterministic rendering
 */

export interface TypewriterEvent {
  frame: number;
  action: 'type' | 'pause' | 'indent';
  data?: string; // character to type, or number of spaces for indent
}

export interface TypewriterConfig {
  baseSpeed: number; // frames per character
  burstSize: number; // max chars to type in a burst
  minBurstSize: number; // min chars before allowing burst break on space
  burstSpeed: number; // frames per char during burst
  burstPause: number; // frames to pause after burst
  indentPause: number; // frames to pause before indent jump
  indentSpeed: number; // frames per 2-space jump
}

export const DEFAULT_CONFIG: TypewriterConfig = {
  baseSpeed: 3,
  burstSize: 5, // Reduced from 6 - max burst length
  minBurstSize: 2, // Minimum chars before breaking on space
  burstSpeed: 2.5, // Much closer to baseSpeed for subtlety (was 2)
  burstPause: 2, // Reduced for smoother flow
  indentPause: 5,
  indentSpeed: 1, // very fast indent jumps
};

/**
 * Simple seeded random number generator for deterministic randomness
 * This ensures the animation is the same every time it renders
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Build a timeline of typing events from code string
 */
export function buildTypewriterTimeline(
  code: string,
  config: TypewriterConfig = DEFAULT_CONFIG
): TypewriterEvent[] {
  const events: TypewriterEvent[] = [];
  let currentFrame = 0;
  let burstCounter = 0;
  let charCounter = 0; // For seeded random

  const lines = code.split('\n');

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex];

    // Detect leading spaces (indentation)
    const leadingSpaces = line.match(/^(\s*)/)?.[1].length || 0;

    if (leadingSpaces > 0) {
      // Pause before indent
      currentFrame += config.indentPause;

      // Jump through indentation 2 spaces at a time
      const indentJumps = Math.ceil(leadingSpaces / 2);
      for (let i = 0; i < indentJumps; i++) {
        const spacesToAdd = Math.min(2, leadingSpaces - i * 2);
        events.push({
          frame: currentFrame,
          action: 'indent',
          data: ' '.repeat(spacesToAdd),
        });
        currentFrame += config.indentSpeed;
      }
    }

    // Type the rest of the line (after indentation)
    const contentStart = leadingSpaces;
    const content = line.slice(contentStart);

    for (let i = 0; i < content.length; i++) {
      const char = content[i];

      // Determine if we're in a burst
      const inBurst = burstCounter < config.burstSize;
      const baseCharSpeed = inBurst ? config.burstSpeed : config.baseSpeed;
      
      // Add slight random variation ONLY outside bursts for more natural feel
      // During bursts, keep it smooth and consistent
      let charSpeed = baseCharSpeed;
      if (!inBurst) {
        // Use seeded random for deterministic animation
        const randomFactor = seededRandom(charCounter * 7919); // Prime number for better distribution
        const variation = (randomFactor - 0.5) * 0.3; // -0.15 to +0.15 (reduced from 0.4)
        charSpeed = baseCharSpeed * (1 + variation);
      }
      
      // Use floating point frames - no rounding for smoother animation
      charSpeed = Math.max(1, charSpeed);

      events.push({
        frame: Math.round(currentFrame), // Round only when creating events
        action: 'type',
        data: char,
      });

      currentFrame += charSpeed;
      burstCounter++;
      charCounter++;

      // Check if burst should end
      const shouldEndBurst = 
        burstCounter >= config.burstSize || // Hit max burst size
        (char === ' ' && burstCounter >= config.minBurstSize); // Space after min burst
      
      if (shouldEndBurst) {
        // Shorter, more subtle pause after burst
        currentFrame += config.burstPause;
        burstCounter = 0;
      }
    }

    // Add newline (except for last line)
    if (lineIndex < lines.length - 1) {
      events.push({
        frame: currentFrame,
        action: 'type',
        data: '\n',
      });
      currentFrame += config.baseSpeed;

      // Small pause after newline
      currentFrame += 3;
    }
  }

  return events;
}

/**
 * Calculate displayed text at a given frame
 */
export function getTextAtFrame(
  timeline: TypewriterEvent[],
  frame: number
): string {
  let text = '';

  for (const event of timeline) {
    if (event.frame > frame) {
      break; // Haven't reached this event yet
    }

    if (event.action === 'type' || event.action === 'indent') {
      text += event.data || '';
    }
  }

  return text;
}

/**
 * Get the total duration in frames
 */
export function getTimelineDuration(timeline: TypewriterEvent[]): number {
  if (timeline.length === 0) return 0;
  return timeline[timeline.length - 1].frame + 10; // Add buffer frames
}
