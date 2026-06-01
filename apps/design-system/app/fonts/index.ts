import { Fira_Code, Outfit } from 'next/font/google'

export const customFont = Outfit({
  subsets: ['latin'],
  variable: '--font-custom',
  display: 'swap',
  fallback: ['Circular', 'custom-font', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const firaCode = Fira_Code({
  subsets: ['latin'],
  fallback: ['Fira Code', 'Menlo', 'monospace'],
  variable: '--font-fira-code',
  display: 'swap',
})
