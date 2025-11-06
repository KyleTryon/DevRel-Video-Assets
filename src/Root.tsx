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
          filename: "fibonacci.js",
          showLineNumbers: true,
        }}
      />
    </>
  );
};
