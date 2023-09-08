/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			dropShadow: {
				'3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
				'4xl': [
					'0 20px 25px rgba(0, 0, 0, 0.1)',
					'0 10px 10px rgba(0, 0, 0, 0.04)'
				]
			},
			colors: {
				'off-white': '#fafafa',
			},
		},
		fontFamily: {
			'sans': ['montserrat', 'sans-serif'],
			'lato': ['lato', 'sans-serif'],
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
