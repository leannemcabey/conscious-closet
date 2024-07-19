module.exports = {
  content: [
    "./app/**/**/*.{js,ts,jsx,tsx}",
    "./app/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-green': '#287e60',
        'theme-mid-green': '#85a491',
        'theme-light-green': '#bed7c5',
        'background-green': '#eff1ef',
        'text-green': '#027d5a',
        'theme-blue': '#677893',
        'theme-light-blue': '#a6a7ac',
        'theme-sage': '#727467',
        'theme-gold': '#97682b',
        'theme-brown': '#552d16',
        'theme-gray': '#f4f3f3',
        'theme-red': '#c27070'
      },
      keyframes: {
        'enter-from-bottom': {
          from: {
            bottom: '-500px'
          },
          to: {
            bottom: '25%'
          },
        },
      },
      animation: {
        'enter-from-bottom': 'enter-from-bottom .2s forwards',
      },
    }
  },
  plugins: [],
}
