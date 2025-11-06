import "./index.css";
import { Composition } from "remotion";
import { CodeWindowScene, codeWindowSchema } from "./CodeWindowScene";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CodeWindow"
        component={CodeWindowScene}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
        schema={codeWindowSchema}
        defaultProps={{
          code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate the 10th Fibonacci number
const result = fibonacci(10);
console.log(\`Fibonacci(10) = \${result}\`);`,
          filename: "fibonacci.js",
          showLineNumbers: true,
          theme: "dark",
          fontSize: 20,
          width: 1200,
          height: 600,
          scale: 1.0,
          animate: false,
          animationSpeed: 50,
          delay: 0,
          showCursor: true,
          durationInFrames: 800,
        }}
        calculateMetadata={({ props }) => {
          return {
            durationInFrames: props.durationInFrames,
          };
        }}
      />
    </>
  );
};
