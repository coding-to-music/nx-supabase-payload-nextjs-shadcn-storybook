/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["selector", '[data-theme="dark"]'],
    content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
    safelist: [
        "dark",
        "lg:col-span-4",
        "lg:col-span-6",
        "lg:col-span-8",
        "lg:col-span-12",
        "border-border",
        "bg-card",
        "border-error",
        "bg-error/30",
        "border-success",
        "bg-success/30",
        "border-warning",
        "bg-warning/30",
    ],
    theme: {
        container: {
            center: true,
            padding: {
                "2xl": "2rem",
                DEFAULT: "1rem",
                lg: "2rem",
                md: "2rem",
                sm: "1rem",
                xl: "2rem",
            },
            screens: {
                "2xl": "86rem",
                lg: "64rem",
                md: "48rem",
                sm: "40rem",
                xl: "80rem",
            },
        },
        extend: {
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
            colors: {
                border: "hsla(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },

                success: "hsl(var(--success))",
                error: "hsl(var(--error))",
                warning: "hsl(var(--warning))",
            },
            borderRadius: {
                lg: `var(--radius)`,
                md: `calc(var(--radius) - 2px)`,
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                mono: ["var(--font-geist-mono)"],
                sans: ["var(--font-geist-sans)"],
            },
            keyframes: {
                "accordion-down": {
                    from: {height: "0"},
                    to: {height: "var(--radix-accordion-content-height)"},
                },
                "accordion-up": {
                    from: {height: "var(--radix-accordion-content-height)"},
                    to: {height: "0"},
                },
            },
            typography: ({theme}) => ({
                DEFAULT: {
                    css: {
                        "--tw-prose-body": "var(--text)",
                        "--tw-prose-headings": "var(--text)",
                        h1: {
                            fontSize: "3.5rem",
                            fontWeight: "normal",
                            marginBottom: "0.25em",
                        },
                    },
                },
            }),
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("@tailwindcss/typography"),
    ],
};
