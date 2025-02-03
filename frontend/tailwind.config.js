/** @type {import('tailwindcss').Config} */
module.exports = {
    // darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {},
        keyframes: {
            move: {
                '0%, 100%': { transform: 'translateY(-6px)' },
                '50%': { transform: 'translateY(6px)' },
            },
        },
        animation: {
            move: 'move 5s ease-in-out infinite',
        },
  	},
  },
  plugins: [require("daisyui"), require("tailwindcss-animate"), require('@tailwindcss/forms')],
}

