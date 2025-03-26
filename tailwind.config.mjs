// filepath: /home/adam-noah/next-support/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export const content = [
    "./app/**/*.{js,ts,jsx,tsx}", // Include all files in the `app` directory
    "./components/**/*.{js,ts,jsx,tsx}", // Include all files in the `components` directory
];
export const theme = {
    extend: {
        fontFamily: {
            signature: ["vscript", "sans-serif"], // Add your custom font
        },
    },
};
export const plugins = [];