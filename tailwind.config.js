/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        user: "#E9EDEF",
        "read-msg": "#8696A0",
        "unread-msg": "#D1D7DB",
        button: "#00A884",
        modal: "#AEBBC0",
        "icon-bg": "#374248",
        "received-msg-bg": "#212C32",
        "wa-gray": {
          default: "#222E35",
          light: "#222C35",
          light2: "#202D32",
          "v-dark": "#111B21",
        },
      },
    },
  },
  plugins: [],
};
