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
    plugins: [
        require("daisyui"),
        require("tailwindcss-animate"),
        require('@tailwindcss/forms')
    ],
    daisyui: {
        themes: [
            // Custom theme (object)
            {
                nimbus: {
                    "primary": "#FFD1DC",
                    "secondary": "#FFE4E1",
                    "accent": "#DB7093",
                    "neutral": "#4A4A4A",
                    "base-100": "#FFF0F5",
                },
            },
            "light",
            "dark",
            "cupcake",
            "valentine",
            "bumblebee",
            "emerald",
            "corporate",
            "synthwave",
            "retro",
            "cyberpunk",
            "halloween",
            "garden",
            "forest",
            "aqua",
            "lofi",
            "pastel",
            "fantasy",
            "wireframe",
            "black",
            "luxury",
            "dracula",
            "cmyk",
            "autumn",
            "business",
            "acid",
            "lemonade",
            "night",
            "coffee",
            "winter",
            "dim",
            "nord",
            "sunset",
        ],
    },
};