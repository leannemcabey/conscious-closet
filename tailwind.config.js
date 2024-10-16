module.exports = {
  content: [
    "./app/**/**/*.{js,ts,jsx,tsx}",
    "./app/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        md: "630px",
        lg: "1025px"
      },
      colors: {
        'theme-green': '#287e60',
        'button-green': '#85a491',
        'button-gradient-start': '#9abda5',
        'button-gradient-end': '#53806d',
        'theme-mid-green': '#85a491',
        'theme-light-green': '#c9e0cf',
        'background-green': '#eff1ef',
        'text-green': '#01523b',
        'theme-blue': '#677893',
        'theme-light-blue': '#a6a7ac',
        'theme-sage': '#727467',
        'theme-gold': '#97682b',
        'theme-light-gold': 'rgba(151,104,43,0.15)',
        'theme-brown': '#552d16',
        'theme-gray': '#f4f3f3',
        'theme-red': '#f55959',
        'transparent-bg': 'rgba(64, 64, 64, 0.5)'
      },
      keyframes: {
        'enter-from-left': {
          from: {
            left: '-100%'
          },
          to: {
            left: '0%'
          }
        },
        'enter-from-bottom': {
          from: {
            bottom: '-100%'
          },
          to: {
            bottom: '0%'
          }
        },
        'enter-from-right': {
          from: {
            right: '-100%'
          },
          to: {
            right: '0%'
          }
        },
        'exit-to-right': {
          from: {
            right: '0%'
          },
          to: {
            right: '-100%'
          }
        },
        'grow': {
          from: {
            width: '0px',
            height: '0px'
          },
          to: {
            width: '250px',
            height: '373px'
          }
        }
      },
      animation: {
        'enter-from-bottom': 'enter-from-bottom .3s forwards',
        'enter-from-right': 'enter-from-right .3s forwards',
        'enter-from-left': 'enter-from-left .3s forwards',
        'exit-to-right': 'exit-to-right .3s forwards',
        'grow': 'grow .3s forwards'
      },
    }
  },
  plugins: [],
}
