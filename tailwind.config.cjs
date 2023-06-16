// The following import is the path to where the component source code lives
const { ComponentsContentPath } = require("@yext/search-ui-react");

module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./lib/**/*.{js,jsx}",
    // tailwind is applied to the components by adding the component path here
    ComponentsContentPath,
  ],
  theme: {
    container: {
      center: true,
    },
    screens: {
      xs: "576px",
      sm: "640px",
      md: "767px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      black: "#000000",
      primaryRed: "#D21243",
      textRed: "#D11242",
      primaryBlue: "#004990",
      footerBorder: "#a8d6e2",
      topbarHoverBG: "#800b28",
      submenuBorder: "#80a3c6",
      resultCardHover: "#f4f5f7",
      borderColor: "rgba(0, 73, 144, 0.5)",
      // primary: "var(--primary-color, #2563eb)",
      // "primary-light": "var(--primary-color-light, #dbeafe)",
      // "primary-dark": "var(--primary-color-dark, #1e40af)",
      // neutral: "var(--neutral-color, #4b5563)",
      // "neutral-light": "var(--neutral-color-light, #9ca3af)",
      // "neutral-dark": "var(--neutral-color-dark, #1f2937)",
    },
    fontFamily: {          
       myriad: ['"Myriad Pro", Georgia, sans-serif'],    
       myriadCondened: ['"myriad-pro-condensed", Georgia, sans-serif'],    
    },
    extend: {
      backgroundImage: {
        // plus: "url('images/plus.svg')",
        bodyBG: "url('Images/epnb-background.png')",       
        arrowUP: "url('Images/Arrow-up.svg')",       
        arrowDown: "url('Images/Arrow-down.svg')",       
      },
      borderRadius: {
        cta: "var(--cta-border-radius, 1rem)",
      },
      keyframes: {
        rotate: {
          "100%": { transform: "rotate(360deg)" },
        },
        dash: {
          "0%": { transform: "rotate(0deg)", "stroke-dashoffset": 204 },
          "50%": { transform: "rotate(45deg)", "stroke-dashoffset": 52 },
          "100%": { transform: "rotate(360deg)", "stroke-dashoffset": 204 },
        },
      },
    },
  },  
  plugins: [
    require("@tailwindcss/forms")({ 
      strategy: "class",
    }),
  ],
};
