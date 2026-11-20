module.exports = {
        content: ["./index.html","./*.{tsx,ts}","./pages/**/*.tsx","./components/**/*.tsx","./src/**/*.{tsx,ts}"],
        theme: {
          extend: {
            colors: {
              brand: {
                900: 'var(--brand-900)',
                700: 'var(--brand-700)',
                500: 'var(--brand-500)',
                200: 'var(--brand-200)',
                50:  'var(--brand-50)',
              },
              primary: {
                DEFAULT: 'var(--color-primary)',
                dark: 'var(--color-primary-dark)',
              },
              accent: 'var(--color-accent)',
              grey: {
                900: 'var(--grey-900)',
                600: 'var(--grey-600)',
                200: 'var(--grey-200)',
              },
              text: {
                primary: 'var(--text-primary)',
                secondary: 'var(--text-secondary)',
                nav: 'var(--text-nav)',
                'nav-active': 'var(--text-nav-active)',
              },
              bg: {
                primary: 'var(--bg-primary)',
                secondary: 'var(--bg-secondary)',
                card: 'var(--bg-card)',
                'section-dark': 'rgba(179, 236, 231, 0.7)',
                'section-light': 'rgba(229, 249, 247, 0.7)',
              },
              border: {
                primary: 'var(--border-primary)',
              },
              white: 'var(--white)',
              success: 'var(--color-success)',
              error: 'var(--color-error)',
            },
            fontFamily: {
              'poppins': ['Poppins', 'sans-serif'],
              'inter': ['Inter', 'sans-serif'],
              'lora': ['Lora', 'serif'],
            },
            letterSpacing: {
              'wide-sm': '0.05em',
            },
            backgroundImage: {
              'hero-pattern': "url('https://picsum.photos/1920/1080?grayscale&blur=2')",
            },
            boxShadow: {
              'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.07), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }
          }
        }
      }
