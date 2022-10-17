const disabledCss = {
  'code::before': false,
  'code::after': false,
  pre: false,
  code: false,
  'pre code': false,
  'code::before': false,
  'code::after': false,
  'blockquote p:first-of-type::before': false,
	'blockquote p:last-of-type::after': false,
}

module.exports = {  
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.js',
    './app/javascript/**/*.tsx',
    './app/components/**/*.html.erb',
    './app/components/**/*.rb',
    './node_modules/flowbite/**/*.js',
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require('flowbite/plugin')
  ],
  theme: {
		extend: {
			typography: {
				DEFAULT: { css: disabledCss },
				sm: { css: disabledCss },
				lg: { css: disabledCss },
				xl: { css: disabledCss },
				'2xl': { css: disabledCss },
			},
		},
	},
}
