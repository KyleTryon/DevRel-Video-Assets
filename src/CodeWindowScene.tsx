import { useMemo } from "react";
import { AbsoluteFill } from "remotion";
import { CodeWindow } from "./components/ui/code-window";
import { z } from "zod";
import { zTextarea } from "@remotion/zod-types";
import { themeNames } from "./themes/index";

export const codeWindowSchema = z.object({
  code: zTextarea(),
  filename: z.string(),
  showLineNumbers: z.boolean(),
  theme: z.enum(themeNames as [string, ...string[]]),
  fontSize: z.number().min(8).max(72),
  width: z.number().min(200).max(2000),
  height: z.number().min(100).max(2000),
  scale: z.number().min(0.1).max(3).step(0.1),

  // Animation controls
  animate: z.boolean(),
  animationSpeed: z.number().min(1).max(100).step(1),
  delay: z.number().min(0).max(300).step(1), // Start delay (before animation begins)
  showCursor: z.boolean(),

  // Video duration
  durationInFrames: z.number().min(30).max(6000).step(1),
});

const defaultCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate the 10th Fibonacci number
const result = fibonacci(10);
console.log(\`Fibonacci(10) = \${result}\`);`;

export const CodeWindowScene: React.FC<z.infer<typeof codeWindowSchema>> = ({
  code = defaultCode,
  filename = "fibonacci.js",
  showLineNumbers = true,
  theme = "dark",
  fontSize = 20,
  width = 1200,
  height = 600,
  scale = 1.0,
  animate = false,
  animationSpeed = 15,
  delay = 0,
  showCursor = true,
  durationInFrames = 800,
}) => {
  // Convert animationSpeed to chars per frame
  // Higher speed = more chars per frame = faster typing
  const charsPerFrame = useMemo(() => {
    // Speed 1: 0.083 chars/frame (slow)
    // Speed 100: 8.3 chars/frame (fast)
    // Speed 1000: 83 chars/frame (very fast)
    const speed = animationSpeed / 18; // Slightly slower than before
    console.log(`AnimationSpeed: ${animationSpeed}, charsPerFrame: ${speed}`);
    return speed;
  }, [animationSpeed]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <CodeWindow
        code={code}
        filename={filename}
        showLineNumbers={showLineNumbers}
        theme={theme}
        fontSize={fontSize}
        width={width}
        height={height}
        scale={scale}
        animate={animate}
        animationStartFrame={delay}
        animationSpeed={charsPerFrame}
        showCursor={showCursor}
      />
    </AbsoluteFill>
  );
};
