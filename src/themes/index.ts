export interface CodeTheme {
  name: string;
  background: string;
  border: string;
  headerBg: string;
  headerText: string;
  codeBg: string;
  codeText: string;
  lineNumbers: string;
  // Window control dots
  dots: {
    red: string;
    yellow: string;
    green: string;
  };
  // Syntax highlighting colors
  syntax: {
    keyword: string;
    string: string;
    number: string;
    comment: string;
    function: string;
    class: string;
    property: string;
    operator: string;
  };
}

export const themes: Record<string, CodeTheme> = {
  light: {
    name: "Light",
    background: "#ffffff",
    border: "#e5e5e5",
    headerBg: "#ffffff",
    headerText: "#737373",
    codeBg: "#ffffff",
    codeText: "#171717",
    lineNumbers: "rgba(115, 115, 115, 0.5)",
    dots: {
      red: "#ff5f57",
      yellow: "#febc2e",
      green: "#28c840",
    },
    syntax: {
      keyword: "#9333ea",
      string: "#16a34a",
      number: "#ea580c",
      comment: "#737373",
      function: "#2563eb",
      class: "#ca8a04",
      property: "#0891b2",
      operator: "#64748b",
    },
  },
  dark: {
    name: "Dark",
    background: "#1e1e1e",
    border: "#333333",
    headerBg: "#1e1e1e",
    headerText: "#a3a3a3",
    codeBg: "#1e1e1e",
    codeText: "#e5e5e5",
    lineNumbers: "rgba(163, 163, 163, 0.5)",
    dots: {
      red: "#666666",
      yellow: "#808080",
      green: "#999999",
    },
    syntax: {
      keyword: "#c084fc",
      string: "#4ade80",
      number: "#fb923c",
      comment: "#737373",
      function: "#60a5fa",
      class: "#fbbf24",
      property: "#22d3ee",
      operator: "#94a3b8",
    },
  },
  github: {
    name: "GitHub",
    background: "#ffffff",
    border: "#d0d7de",
    headerBg: "#ffffff",
    headerText: "#57606a",
    codeBg: "#ffffff",
    codeText: "#1f2328",
    lineNumbers: "rgba(87, 96, 106, 0.5)",
    dots: {
      red: "#ff5f57",
      yellow: "#febc2e",
      green: "#28c840",
    },
    syntax: {
      keyword: "#cf222e",
      string: "#0a3069",
      number: "#0550ae",
      comment: "#6e7781",
      function: "#8250df",
      class: "#953800",
      property: "#0550ae",
      operator: "#1f2328",
    },
  },
  githubDark: {
    name: "GitHub Dark",
    background: "#0d1117",
    border: "#30363d",
    headerBg: "#0d1117",
    headerText: "#7d8590",
    codeBg: "#0d1117",
    codeText: "#e6edf3",
    lineNumbers: "rgba(125, 133, 144, 0.5)",
    dots: {
      red: "#484f58",
      yellow: "#636e7b",
      green: "#7d8590",
    },
    syntax: {
      keyword: "#ff7b72",
      string: "#a5d6ff",
      number: "#79c0ff",
      comment: "#8b949e",
      function: "#d2a8ff",
      class: "#ffa657",
      property: "#79c0ff",
      operator: "#e6edf3",
    },
  },
  vercel: {
    name: "Vercel",
    background: "#000000",
    border: "#333333",
    headerBg: "#000000",
    headerText: "#888888",
    codeBg: "#000000",
    codeText: "#ededed",
    lineNumbers: "rgba(136, 136, 136, 0.5)",
    dots: {
      red: "#4d4d4d",
      yellow: "#666666",
      green: "#808080",
    },
    syntax: {
      keyword: "#ff0080",
      string: "#50e3c2",
      number: "#f81ce5",
      comment: "#666666",
      function: "#79ffe1",
      class: "#ff0080",
      property: "#79ffe1",
      operator: "#ededed",
    },
  },
  nord: {
    name: "Nord",
    background: "#2e3440",
    border: "#3b4252",
    headerBg: "#2e3440",
    headerText: "#d8dee9",
    codeBg: "#2e3440",
    codeText: "#eceff4",
    lineNumbers: "rgba(216, 222, 233, 0.5)",
    dots: {
      red: "#bf616a",
      yellow: "#ebcb8b",
      green: "#a3be8c",
    },
    syntax: {
      keyword: "#81a1c1",
      string: "#a3be8c",
      number: "#b48ead",
      comment: "#616e88",
      function: "#88c0d0",
      class: "#ebcb8b",
      property: "#8fbcbb",
      operator: "#eceff4",
    },
  },
  dracula: {
    name: "Dracula",
    background: "#282a36",
    border: "#44475a",
    headerBg: "#282a36",
    headerText: "#f8f8f2",
    codeBg: "#282a36",
    codeText: "#f8f8f2",
    lineNumbers: "rgba(248, 248, 242, 0.5)",
    dots: {
      red: "#ff5555",
      yellow: "#f1fa8c",
      green: "#50fa7b",
    },
    syntax: {
      keyword: "#ff79c6",
      string: "#f1fa8c",
      number: "#bd93f9",
      comment: "#6272a4",
      function: "#50fa7b",
      class: "#8be9fd",
      property: "#50fa7b",
      operator: "#f8f8f2",
    },
  },
  monokai: {
    name: "Monokai",
    background: "#272822",
    border: "#3e3d32",
    headerBg: "#272822",
    headerText: "#f8f8f2",
    codeBg: "#272822",
    codeText: "#f8f8f2",
    lineNumbers: "rgba(248, 248, 242, 0.5)",
    dots: {
      red: "#f92672",
      yellow: "#e6db74",
      green: "#a6e22e",
    },
    syntax: {
      keyword: "#f92672",
      string: "#e6db74",
      number: "#ae81ff",
      comment: "#75715e",
      function: "#a6e22e",
      class: "#66d9ef",
      property: "#a6e22e",
      operator: "#f8f8f2",
    },
  },
  sentry: {
    name: "Sentry",
    background: "#241F3D",
    border: "#6e47ae",
    headerBg: "#241F3D",
    headerText: "#f6f6f8",
    codeBg: "#241F3D",
    codeText: "#f0f0f0",
    lineNumbers: "rgba(158, 134, 255, 0.5)",
    dots: {
      red: "#ff70bc",
      yellow: "#ff9838",
      green: "#9e86ff",
    },
    syntax: {
      keyword: "#ff70bc",
      string: "#ff9838",
      number: "#9e86ff",
      comment: "#9e86ff",
      function: "#9e86ff",
      class: "#ff70bc",
      property: "#9e86ff",
      operator: "#f0f0f0",
    },
  },
};

export const themeNames = Object.keys(themes) as Array<keyof typeof themes>;
export type ThemeName = keyof typeof themes;
