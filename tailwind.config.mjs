/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				"secondary-gray": "#CDCDC3",
				"primary-yellow-100": "#CAA45D",
				"primary-yellow-300": "#CC922F",
				"primary-blue-100": "#1E3957",
				"primary-blue-300": "#0A2749",
				"primary-blue-500": "#0F1F2F",
				"primary-danger-100": "#DA3939",
				"primary-danger-300": "#A82D2D",
			},
			fontWeight: {
				thin: 100,
				"extra-light": 200,
				light: 300,
				regular: 400,
				medium: 500,
				semibold: 600,
				bold: 700,
				"extra-bold": 800,
				black: 900,
			},
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
			},
			fontSize: {
				nano: "0.6875rem",
				micro: "0.75rem",
				"2xs": "0.875rem",
				xs: "1.0rem",
				sm: "1.125rem",
				md: "1.5rem",
				lg: "2.0rem",
				xl: "2.5rem",
				"2xl": "3.0rem",
				"3xl": "4.0rem",
				"4xl": "6.0rem",
			},
		},
		fontFamily: {
			// sans: ["Inter Variable", "sans-serif"],
			sans: ["Urbanist Variable", "sans-serif"],
		},
		fontWeight: {
			thin: 100,
			"extra-light": 200,
			light: 300,
			regular: 400,
			medium: 500,
			semibold: 600,
			bold: 700,
			"extra-bold": 800,
			black: 900,
		},
	},
	plugins: [
		function ({ addBase }) {
			addBase({
				html: { fontSize: "13px" },
			});
		},
	],
};
