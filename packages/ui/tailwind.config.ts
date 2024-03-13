/** @type {import('tailwindcss').Config} */
import sharedConfig from "@repo/tailwind-config";

module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  presets: [sharedConfig],
}