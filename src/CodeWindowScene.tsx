import { AbsoluteFill } from "remotion";
import { CodeWindow } from "./components/ui/code-window";
import { z } from "zod";

export const codeWindowSchema = z.object({
  code: z.string().optional(),
  filename: z.string().optional(),
  showLineNumbers: z.boolean().optional(),
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
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#fafafa",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          width: "100%",
        }}
      >
        <CodeWindow
          code={code}
          filename={filename}
          showLineNumbers={showLineNumbers}
        />
      </div>
    </AbsoluteFill>
  );
};
