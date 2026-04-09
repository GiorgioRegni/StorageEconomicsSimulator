/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#050811",
          900: "#08101d",
          850: "#0b1424",
          800: "#101b2e",
        },
        mist: "#eef4ff",
        flash: "#47a9ff",
        hdd: "#c6ced9",
        tape: "#efb14d",
        success: "#8fe388",
      },
      boxShadow: {
        panel: "0 28px 90px rgba(0, 0, 0, 0.48)",
        flash: "0 0 40px rgba(71, 169, 255, 0.28)",
        tape: "0 0 40px rgba(239, 177, 77, 0.2)",
      },
      maxWidth: {
        "8xl": "90rem",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

