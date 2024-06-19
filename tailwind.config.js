/* @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        tertiary: {
          DEFAULT: "var(--tertiary)",
          foreground: "var(--tertiary-foreground))",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        dark: {
          DEFAULT: "var(--dark)",
          foreground: "var(--dark-foreground)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          foreground: "var(--warning-foreground)",
        },
        success: {
          DEFAULT: "var(--success)",
          foreground: "var(--success-foreground)",
        },
        info: {
          DEFAULT: "var(--info)",
          foreground: "var(--info-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        gray: {
          50: "#333333",
          150: "#eeeeee",
          250: "#8f8f8f",
          350: "#ebebeb",
          450: "#999",
          550: "#555555",
          650: "#666",
          750: "#888",
          850: "#777777",
          950: "#e8e8e8",
          1050: "#313139",
          1100: "#dee0e4",
          1150: "#f5f5f5",
          1200: "#ddd",
          1250: "#f3f3f3",
          1350: "#dbdbdb",
          1450: "#9b9b9b",
          1500: "#f5faff",
        },
        zinc: {
          250: "#454545",
          450: "#c1c1c1",
        },
        slate: {
          150: "#f6f6f6",
          250: "#f9f9f9",
          350: "#222222",
          450: "#292F36",
          550: "#4D5053",
          850: "#253237",
          955: "#3a3a3a",
        },
        orange: {
          150: "rgba(245,130,31,.1)",
          250: "#e57615",
          450: "#f58220",
          550: "rgba(0,0,0,.125)",
        },
        red: {
          250: "#cf2929",
        },

        "white-50": "#fafafa",
        "white-250": "#767676",
        "white-350": "#2e323e",
        "white-150": "#e6f5ee",

        green: {
          50: "#80bb01",
          150: "rgba(0, 174, 77, 0.2)",
        },
      },
      fontFamily: {
        shadows: ['"Shadows Into Light Two"', "cursive"],
      },
      screens: {
        xxs: "490px",
        xs: "640px",
        sm: "768px",
        md: "975px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },

  plugins: [require("tailwindcss-animate")],
};
