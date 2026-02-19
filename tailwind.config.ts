import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                ivory: {
                    50: '#fdfbf7',
                    100: '#fbf7ef',
                    200: '#f6ebd7',
                    300: '#efdbb5',
                    400: '#e6c48a',
                    500: '#dfaf64',
                    600: '#d19446',
                    700: '#ae7236',
                    800: '#8d5a31',
                    900: '#734a2c',
                },
                emerald: {
                    800: '#065f46', // Adjusting standard defaults if needed or keeping standard
                    900: '#064e3b', // Deep forest green
                    950: '#022c22', // Even deeper
                },
            },
            fontFamily: {
                serif: ['var(--font-playfair-display)', 'serif'],
                sans: ['var(--font-lato)', 'sans-serif'],
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'scale-in': 'scaleIn 0.5s ease-out forwards',
                'bounce-slow': 'bounce 3s infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            },
        },
    },
    plugins: [],
};
export default config;
