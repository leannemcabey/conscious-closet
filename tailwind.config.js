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
        'theme-light-green': '#c9e0cf',
        'background-green': '#eff1ef',
        'text-green': '#01523b',
        'theme-blue': '#677893',
        'theme-light-blue': '#a6a7ac',
        'theme-sage': '#727467',
        'theme-gold': '#97682b',
        'theme-brown': '#552d16',
        'theme-gray': '#f4f3f3',
        'theme-red': '#f55959',
        'transparent-bg': 'rgba(64, 64, 64, 0.5)'
      },
      keyframes: {
        'enter-from-bottom': {
          from: {
            top: '100%'
          },
          to: {
            top: '15%'
          },
        },
        'enter-from-right': {
          from: {
            left: '100%'
          },
          to: {
            left: '25%'
          }
        },
        'exit-to-right': {
          from: {
            left: '25%'
          },
          to: {
            left: '100%'
          }
        }
      },
      animation: {
        'enter-from-bottom': 'enter-from-bottom .3s forwards',
        'enter-from-right': 'enter-from-right .5s forwards',
        'exit-to-right': 'exit-to-right .5s forwards'
      },
    }
  },
  plugins: [],
}
