/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-opensans)"],
        mono: ["var(--font-roboto-mono)"],
        'edu-sa': ["var(--font-edu-sa-beginner)"],
        crushed: ["var(--crushed)"],
        unifrakturCook: ["var(--unifrakturCook)"],
        'young-serif': ["var(--youngSerif)"],
        // Add more custom font families as needed
      },
      colors: {
        foreground: 'hsl(var(--foreground))',
        luxury: {
					gold: 'hsl(var(--luxury-gold))',
					'gold-soft': 'hsl(var(--luxury-gold-soft))',
					ivory: 'hsl(var(--luxury-ivory))',
					champagne: 'hsl(var(--luxury-champagne))',
					emerald: 'hsl(var(--luxury-emerald))',
					'royal-blue': 'hsl(var(--luxury-royal-blue))',
					accent: 'hsl(var(--luxury-accent))'
				},
        muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				}
      }
    },
  },
  plugins: [],
}

