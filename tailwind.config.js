/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        // ธีม "ม่วงลึกลับ"
        mystery: {
          950: '#0a0514', // ม่วงเกือบดำ (พื้นหลัง)
          900: '#160d2b', // ม่วงเข้ม (Card Surface)
          800: '#2d1b4e', // ม่วงมิดไนท์ (Border/Active)
            700: '#4b2e8a', // ม่วงอเมทิสต์ (Hover/Focus)
            600: '#6e42c1', // ม่วงลาเวนเดอร์ (Primary Text)
            500: '#8b5cf6', // ม่วงสว่าง (Accent/Highlight)
            400: '#a78bfa', // ม่วงพาสเทล (Secondary Text)
            300: '#c4b5fd', // ม่วงอ่อน (Disabled/Background Accent)
          accent: '#8b5cf6', // ม่วงสว่างสำหรับ Glow (Violet 500)
        }
      },
      boxShadow: {
        'purple-glow': '0 0 40px rgba(139, 92, 246, 0.15)',
      }
    },
  },
  plugins: [],
}