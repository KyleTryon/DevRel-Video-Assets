import * as React from "react";
import { highlight } from "sugar-high";
import { useCurrentFrame } from "remotion";
import { cn } from "../../lib/utils";
import { themes, type ThemeName } from "../../themes/index";
import { useCodeTypewriter } from "../../hooks/useCodeTypewriter";
import type { TypewriterConfig } from "../../lib/typewriter";

export interface CodeWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The code to display
   */
  code: string;
  /**
   * The programming language for syntax highlighting
   */
  language?: string;
  /**
   * Optional filename to display in the window header
   */
  filename?: string;
  /**
   * Show macOS dots
   * @default true
   */
  showDots?: boolean;
  /**
   * Custom title for the window
   */
  title?: string;
  /**
   * Line numbers
   * @default false
   */
  showLineNumbers?: boolean;
  /**
   * Theme name
   * @default "dark"
   */
  theme?: ThemeName;
  /**
   * Font size in pixels
   * @default 20
   */
  fontSize?: number;
  /**
   * Width in pixels
   */
  width?: number;
  /**
   * Height in pixels. If not provided and animate is true, auto-calculates based on full code content.
   */
  height?: number;
  /**
   * Enable typewriter animation
   * @default false
   */
  animate?: boolean;
  /**
   * Frame to start animation
   * @default 0
   */
  animationStartFrame?: number;
  /**
   * Animation speed in characters per frame
   */
  animationSpeed?: number;
  /**
   * Show blinking cursor during typing
   * @default true
   */
  showCursor?: boolean;
  /**
   * Scale factor for the entire window
   * @default 1.0
   */
  scale?: number;
}

const CodeWindow = React.forwardRef<HTMLDivElement, CodeWindowProps>(
  (
    {
      code,
      filename,
      showDots = true,
      title,
      showLineNumbers = false,
      theme = "dark",
      fontSize = 20,
      width,
      height,
      scale = 1.0,
      animate = false,
      animationStartFrame = 0,
      animationSpeed = 1,
      showCursor = true,
      className,
      ...props
    },
    ref
  ) => {
    const selectedTheme = themes[theme];
    const frame = useCurrentFrame();

    // Use typewriter animation if enabled
    const { displayedText, isComplete } = useCodeTypewriter({
      code,
      speed: animationSpeed,
      startFrame: animationStartFrame,
      enabled: animate,
    });

    // Use animated text if enabled, otherwise use original code
    const codeToDisplay = animate ? displayedText : code;

    const highlightedCode = React.useMemo(() => {
      return highlight(codeToDisplay);
    }, [codeToDisplay]);

    const lines = codeToDisplay.split("\n");

    // Show cursor when animating and not complete
    const shouldShowCursor = animate && showCursor && !isComplete;
    
    // Simple blink effect: on for 15 frames, off for 15 frames
    const cursorVisible = Math.floor(frame / 15) % 2 === 0;

    // Calculate the height based on full code to prevent window from growing during animation
    const fullLineCount = code.split("\n").length;
    const lineHeight = fontSize * 1.5; // 'leading-relaxed' is typically 1.5
    const codePadding = 24; // p-6 = 24px
    const headerHeight = 56; // Approximate header height
    const borderHeight = 2; // 1px top + 1px bottom
    const calculatedHeight = 
      headerHeight + 
      (fullLineCount * lineHeight) + 
      (codePadding * 2) + 
      borderHeight;

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-lg shadow-sm",
          className
        )}
        style={{
          width: width ? `${width}px` : undefined,
          height: height ? `${height}px` : (animate ? `${calculatedHeight}px` : undefined),
          backgroundColor: selectedTheme.background,
          borderColor: selectedTheme.border,
          borderWidth: "1px",
          borderStyle: "solid",
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
        {...props}
      >
        {/* macOS Header */}
        <div
          className="flex items-center gap-4 px-6 py-4"
          style={{
            backgroundColor: selectedTheme.headerBg,
            borderBottomColor: selectedTheme.border,
            borderBottomWidth: "1px",
            borderBottomStyle: "solid",
          }}
        >
          {showDots && (
            <div className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded-full border-2"
                style={{ borderColor: selectedTheme.dots.red }}
              />
              <div
                className="h-4 w-4 rounded-full border-2"
                style={{ borderColor: selectedTheme.dots.yellow }}
              />
              <div
                className="h-4 w-4 rounded-full border-2"
                style={{ borderColor: selectedTheme.dots.green }}
              />
            </div>
          )}
          {(filename || title) && (
            <div
              className="text-lg font-medium"
              style={{ color: selectedTheme.headerText }}
            >
              {filename || title}
            </div>
          )}
        </div>

        {/* Code Content */}
        <div
          className="overflow-x-auto"
          style={{ backgroundColor: selectedTheme.codeBg }}
        >
          <pre
            className="p-6 leading-relaxed"
            style={{
              fontSize: `${fontSize}px`,
              color: selectedTheme.codeText,
            }}
          >
            {showLineNumbers ? (
              <code
                className="grid"
                style={{
                  // @ts-expect-error - CSS variables for sugar-high
                  "--sh-class": selectedTheme.syntax.class,
                  "--sh-identifier": selectedTheme.syntax.function,
                  "--sh-sign": selectedTheme.syntax.operator,
                  "--sh-string": selectedTheme.syntax.string,
                  "--sh-keyword": selectedTheme.syntax.keyword,
                  "--sh-comment": selectedTheme.syntax.comment,
                  "--sh-jsxliterals": selectedTheme.syntax.class,
                  "--sh-property": selectedTheme.syntax.property,
                  "--sh-entity": selectedTheme.syntax.number,
                }}
              >
                {lines.map((line, index) => {
                  const isLastLine = index === lines.length - 1;
                  // Calculate minimum width based on total number of lines
                  const totalLines = code.split("\n").length;
                  const digits = totalLines.toString().length;
                  const minWidth = `${digits * 0.6}em`; // Approximate character width
                  
                  return (
                    <span key={index} className="table-row">
                      <span
                        className="table-cell select-none pr-6 text-right"
                        style={{ 
                          color: selectedTheme.lineNumbers,
                          minWidth: minWidth
                        }}
                      >
                        {index + 1}
                      </span>
                      <span className="table-cell">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: highlight(line || " "),
                          }}
                        />
                        {shouldShowCursor && isLastLine && (
                          <span
                            className="inline-block w-[2px] h-[1.2em] ml-[1px]"
                            style={{ 
                              backgroundColor: selectedTheme.codeText,
                              opacity: cursorVisible ? 1 : 0,
                              transition: 'opacity 0.1s ease-in-out'
                            }}
                          />
                        )}
                      </span>
                    </span>
                  );
                })}
              </code>
            ) : (
              <code
                style={{
                  // @ts-expect-error - CSS variables for sugar-high
                  "--sh-class": selectedTheme.syntax.class,
                  "--sh-identifier": selectedTheme.syntax.function,
                  "--sh-sign": selectedTheme.syntax.operator,
                  "--sh-string": selectedTheme.syntax.string,
                  "--sh-keyword": selectedTheme.syntax.keyword,
                  "--sh-comment": selectedTheme.syntax.comment,
                  "--sh-jsxliterals": selectedTheme.syntax.class,
                  "--sh-property": selectedTheme.syntax.property,
                  "--sh-entity": selectedTheme.syntax.number,
                }}
              >
                <span dangerouslySetInnerHTML={{ __html: highlightedCode }} />
                {shouldShowCursor && (
                  <span
                    className="inline-block w-[2px] h-[1.2em] ml-[1px]"
                    style={{ 
                      backgroundColor: selectedTheme.codeText,
                      opacity: cursorVisible ? 1 : 0,
                      transition: 'opacity 0.1s ease-in-out'
                    }}
                  />
                )}
              </code>
            )}
          </pre>
        </div>
      </div>
    );
  }
);

CodeWindow.displayName = "CodeWindow";

export { CodeWindow };
