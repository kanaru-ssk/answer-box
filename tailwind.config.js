module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: ["bg-twitter-color", "bg-gray", "bg-main-color"],
  darkMode: "media",
  theme: {
    colors: {
      white: "#fff",
      "trans-white": "hsla(0,0%,100%,.8)",
      black: "#000",
      gray: "#bbb",
      "light-gray": "#eee",
      "dark-gray": "#888",
      blue: "#232C93",
      red: "#b00",
      "main-color": "#F0B135",
      "sub-color": "#F6D38F",
      "twitter-color": "#00acee",
    },
    fontFamily: {
      sans: [
        "Nunito Sans",
        "Helvetica Neue",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
    },
  },
};
