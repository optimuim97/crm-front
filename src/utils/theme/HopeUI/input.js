const input = (theme) => ({
    ".form-control": {
        display: "block",
        width: "100%",
        padding: "0.5rem 1rem",
        "font-size": "1rem",
        "font-weight": "400",
        "line-height": "1.5rem",
        color: theme("textColor.body"),
        "background-color": theme("colors.white"),
        "background-clip": "padding-box",
        border: `1px solid #eee`,
        appearance: "none",
        "border-radius": theme("borderRadius.DEFAULT"),
        transition: ".2s ease",

        "&:focus-visible": {
            outline: "none",
        },
        "&:focus": {
            "border-color": theme("colors.primary.500"),
        },
        "&.form-control-sm": {
            "min-height": `calc(1.5em + 0.5rem + 2px)`,
            padding: `0.25rem 0.5rem`,
            "font-size": "0.813rem",
        },
        "&.form-control-lg": {
            "min-height": `calc(1.5em + 2rem + 2px)`,
            padding: `1rem 2rem`,
            "font-size": "1.188rem",
        }
    },
    ".form-label": {
        position: "absolute",
    },
    ".form-label,label": {
        "font-size": "1rem",
        "font-weight": "400",
        "margin-bottom": "0.5rem",
        color: theme("textColor.body"),
        "margin-left": "0",
        transition: "all .2s ease",
    },
    ".input-group": {
        position: "relative",
        display: "flex",
        "flex-wrap": "wrap",
        "align-items": "stretch",
        width: "100%",
        transition: ".2s ease",
        border: "none",

        "&.input-group-outline": {
            ".form-label": {
                display: "flex",
                "line-height": "3.925",
                top: "-0.375rem",
                "margin-bottom": "0",

                "&:before,&:after": {
                    content: '""',
                    "border-top": "1px solid",
                    "border-top-color": theme("colors.secondary.100"),
                    "pointer-events": "none",
                    "margin-top": "0.375rem",
                    "box-sizing": "border-box",
                    display: "block",
                    height: "0.5rem",
                    width: "0.625rem",
                    "border-width": "1px 0 0",
                    "border-color": "transparent",
                },

                "&:before": {
                    "margin-right": "4px",
                    "border-left": "1px solid transparent",
                    "border-radius": "6px 0",
                },

                "&:after": {
                    "flex-grow": "1",
                    "margin-left": "4px",
                    "border-right": "1px solid transparent",
                    "border-radius": "0 6px",
                },
            },

            ".form-control": {
                background: "none",
                border: `1px solid theme("colors.secondary.500")`,
                "border-radius": "0.375rem",
                "border-top-left-radius": "0.375rem",
                "border-bottom-left-radius": "0.375rem",
                padding: "0.625rem 0.75rem",
                "line-height": "1.25rem",
                "z-index": "20",
            },
        },

        "&.focused,&.is-filled": {
            ".form-label": {
                width: "100%",
                height: "100%",
                "font-size": ".6875rem",
                color: theme("colors.primary.500"),
                display: "flex",
                "line-height": "1.25",

                "&:before": {
                    opacity: "1",
                    "border-top-color": theme("colors.primary.500"),
                    "box-shadow": `inset 0 1px theme("colors.primary.500")`,
                },

                "&:after": {
                    opacity: "1",
                    "border-top-color": theme("colors.primary.500"),
                    "box-shadow": `inset 0 1px theme("colors.primary.500")`,
                },
            },

            "&.input-group-outline": {
                ".form-label+.form-control": {
                    "border-color": theme("colors.primary.500"),
                    "border-top-color": "transparent",
                    "box-shadow": `inset 1px 0 theme("colors.primary.500"), inset -1px 0 theme("colors.primary.500"), inset 0 -1px theme("colors.primary.500")`,
                },
            },

            ".form-control": {
                "background-size": "100% 100%,100% 100%",
            },
        },

        "&:focus-visible": {
            outline: "none",
        },
    },
    ".dark .form-control" : {
        "color": theme("colors.dark.text"),
        "background-color": theme("colors.dark.bg"),
        "border-color": "rgba(255,255,255, .1)",
    }
});

module.exports.input = input;
