import * as React from "react";
import { highlight } from "sugar-high";
import { cn } from "../../lib/utils";

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
}

const CodeWindow = React.forwardRef<HTMLDivElement, CodeWindowProps>(
  (
    {
      code,
      filename,
      showDots = true,
      title,
      showLineNumbers = false,
      className,
      ...props
    },
    ref
  ) => {
    const highlightedCode = React.useMemo(() => {
      return highlight(code);
    }, [code]);

    const lines = code.split("\n");

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-lg border bg-background shadow-sm",
          className
        )}
        {...props}
      >
        {/* macOS Header */}
        <div className="flex items-center gap-4 border-b bg-muted/30 px-6 py-4">
          {showDots && (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-[#ff5f57]" />
              <div className="h-4 w-4 rounded-full bg-[#febc2e]" />
              <div className="h-4 w-4 rounded-full bg-[#28c840]" />
            </div>
          )}
          {(filename || title) && (
            <div className="text-lg font-medium text-muted-foreground">
              {filename || title}
            </div>
          )}
        </div>

        {/* Code Content */}
        <div className="overflow-x-auto">
          <pre className="p-6 text-xl leading-relaxed">
            {showLineNumbers ? (
              <code className="grid">
                {lines.map((line, index) => (
                  <span key={index} className="table-row">
                    <span className="table-cell select-none pr-6 text-right text-muted-foreground/50">
                      {index + 1}
                    </span>
                    <span
                      className="table-cell"
                      dangerouslySetInnerHTML={{
                        __html: highlight(line || " "),
                      }}
                    />
                  </span>
                ))}
              </code>
            ) : (
              <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
            )}
          </pre>
        </div>
      </div>
    );
  }
);

CodeWindow.displayName = "CodeWindow";

export { CodeWindow };
