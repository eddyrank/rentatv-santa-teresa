/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#000000',
        'ink-2': '#222222',
        muted: '#6C6C6C',
        hairline: '#DDDDDD',
        surface: '#F7F7F7',
        canvas: '#FFFFFF',
        error: '#C13515',
        // WhatsApp green — now the single primary CTA color
        'cta': '#25D366',
        'cta-hover': '#1da851',
        // Contrast section: warm sand/clay gradient anchor
        'contrast': '#F5E6D3',
      },
      fontFamily: {
        sans: ['-apple-system','BlinkMacSystemFont','Segoe UI','Roboto','Helvetica Neue','Arial','sans-serif'],
      },
      fontSize: {
        micro: ['12px', { lineHeight: '16px' }],
        body: ['14px', { lineHeight: '18px' }],
        base: ['16px', { lineHeight: '22px' }],
        lead: ['18px', { lineHeight: '26px' }],
        h4: ['18px', { lineHeight: '24px', letterSpacing: '-0.01em' }],
        h3: ['22px', { lineHeight: '28px', letterSpacing: '-0.01em' }],
        h2: ['32px', { lineHeight: '36px', letterSpacing: '-0.02em' }],
        h1: ['44px', { lineHeight: '48px', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        media: '20px',
        xl: '24px',
        pill: '30px',
        xxl: '32px',
      },
      boxShadow: {
        card: '0 0 0 1px rgba(0,0,0,0.02), 0 2px 4px rgba(0,0,0,0.06)',
        'card-hover': '0 0 0 1px rgba(0,0,0,0.02), 0 6px 16px rgba(0,0,0,0.10)',
        raised: '0 0 0 1px rgba(0,0,0,0.02), 0 3px 12px rgba(0,0,0,0.08)',
      },
      maxWidth: { content: '1344px' },
      transitionTimingFunction: { airbnb: 'cubic-bezier(0.2, 0, 0, 1)' },
    },
  },
  plugins: [],
};
