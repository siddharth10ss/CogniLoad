/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Base colors (static values for @apply compatibility)
                background: '#FFFBF5',
                surface: '#FFFFFF',
                text: '#2D2D2D',
                muted: '#9ca3af',

                // Creamy Wellness Palette
                'teal-soft': '#A6E3E9',
                'teal-dark': '#3a7ca5',
                'lavender-soft': '#E3DFFD',
                'lavender-dark': '#6b5b95',
                'coral-soft': '#FFD3B6',
                'coral-dark': '#d66d4f',
                'cream': '#FFFBF5',

                // Legacy mapping
                primary: '#8ba88e',
                secondary: '#c0b2d6',
                accent: '#f2b5a6',
                border: '#E5E5E5',
            },
            fontFamily: {
                sans: ['Outfit', 'Inter', 'sans-serif'],
            },
            borderRadius: {
                'xl': '1.75rem',
                '2xl': '2rem',
            }
        },
    },
    plugins: [],
}
