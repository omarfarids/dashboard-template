/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  plugins: [
    require("daisyui"),
    require("tailwindcss"),
    require("autoprefixer"),
  ],
  themes: ["light", "dark"],
  daisyui: {
    darkTheme: "light",
    // if you want to customize your colors, you can do it here
    // override on daisyui colors
    // check [https://daisyui.com/docs/colors, https://daisyui.com/docs/themes] for more information
    // themes: [
    //   {
    //     light: {
    //       ...require("daisyui/src/theming/themes")["light"],
    //       primary: "blue",
    //       secondary: "teal",
    //       ".btn-twitter": {
    //         "background-color": "#1EA1F1",
    //         "border-color": "#1EA1F1",
    //       },
    //     },
    //   }
    // ],
  },
  theme: {
    extend: {
      colors: {
        // ------------ primary ------------
        "primary-500": "#2855DD",

        // ------------ Text ------------
        // ------------ general ------------
        "soft-gray": "#f1f3f4", //gray on hover
        "shadow-color": "#0000008f",
      },

      spacing: {
        xss: ".25rem",
        xs: "0.5rem",
        sm: "0.75rem",
        base: "1rem",
        md: "1.25rem",
        lg: "1.5rem",
        xl: "1.75rem",
        "2xl": "2rem",
        "3xl": "2.25rem",
        "4xl": "2.5rem",
        "5xl": "2.75rem",
      },
    },
  },
};
