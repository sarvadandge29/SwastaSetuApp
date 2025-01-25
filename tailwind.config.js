/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    colors : {
      'primary': '#22C55E',
    },
    extend: {
      fontFamily: {
        bebasNeueRegular: ["BebasNeue-Regular", "sans-serif"],
        IBMPlexSansRegular: ["IBMPlexSans-Regular", "sans-serif"],
        IBMPlexSansMedium: ["IBMPlexSans-Medium", "sans-serif"],
        IBMPlexSansBold: ["IBMPlexSans-Bold", "sans-serif"],
        IBMPlexSansSemiBold: ["IBMPlexSans-SemiBold", "sans-serif"],
      },
    },
  },
  plugins: [],
}