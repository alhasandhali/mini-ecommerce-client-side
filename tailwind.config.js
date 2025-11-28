module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        accent: "var(--accent)",
        softAccent: "var(--soft-accent)",
        primaryNeutral: "var(--primary-neutral)",
        lightNeutral: "var(--light-neutral)",
        softGray: "var(--soft-gray)",
        carbonGray: "var(--carbon-gray)",
        goldTint: "var(--gold-tint)",
      },
    },
  },
  plugins: [require("daisyui")],
};
