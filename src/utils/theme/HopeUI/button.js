const buttonRoot = {
    padding: ".5rem 1.5rem",
    "border-radius": ".25rem",
    "font-weight": "400",
    "font-size": "1rem",
    display: "inline-block",
    "line-height": "1.5",
    "text-align": "center",
    "vertical-align": "middle",
    transition: "all 300ms ease-in-out",
    cursor: "pointer",
    "letter-spacing": "0",
    position: "relative",
    "text-transform": "capitalize",
};

const buttonSize = (y, x, fontSize) => ({
    padding: `${y} ${x}`,
    "font-size": fontSize || "1rem",
});

const buttonIconSize = (height, width, iconWidth, iconHeight) => ({
    "&.btn-icon": {
        padding: "0",
        "text-align": "center",
        display: "inline-flex",
        "justify-content": "center",
        "align-items": "center",
        height: `${height}`,
        width: `${width}`,

        ".btn-inner": {
            display: "inline-flex",
            svg: {
                width: `${iconWidth}`,
                height: `${iconHeight}`,
            },
        },

        "&.btn-sm":{
            width: '1.875rem',
            height: '1.875rem',
            ".btn-inner": {
                svg: {
                    width: `1rem`,
                    height: `1rem`,
                },
            }
        }
    },
});

const buttonVariant = (theme, background) => ({
    "background-color": background != 'colors.secondary' ? theme(`${background}.500`) : theme(`${background}.600`),
    color: theme("colors.white"),
    "box-shadow": `0 0px 0px 0 rgba(0, 0, 0, 0)`,

    "&:hover, &:focus, &:active": {
        "background-color": theme(`${background}.700`),
        color: theme("colors.white"),
        transition: "all 300ms ease-in-out",
    },

    "&.btn-outlined": {
        "background-color": `transparent`,
        border: `1px solid ${theme(`${background}.500`)}`,
        color: theme(`${background}.500`),
        "box-shadow": "0 0 rgba(0, 0, 0, 0)",

        "&:focus:not(:hover)": {
            "box-shadow": `0 0 0 0.2rem ${theme(`${background}.200`)}`,
        },
    },
});

const button = (theme) => ({
    ".btn": buttonRoot,
    ".btn-primary": buttonVariant(theme, "colors.primary"),
    ".btn-secondary": buttonVariant(theme, "colors.secondary"),
    ".btn-success": buttonVariant(theme, "colors.success"),
    ".btn-info": buttonVariant(theme, "colors.info"),
    ".btn-warning": buttonVariant(theme, "colors.warning"),
    ".btn-danger": buttonVariant(theme, "colors.danger"),
    ".btn-icon": buttonIconSize("2.5rem", "2.5rem", "1.5rem", "1.5rem"),
    ".btn-icon-sm": buttonIconSize("1.875rem", "1.875rem", "1rem", "1rem"),
    ".btn-icon-lg": buttonIconSize("3rem", "3rem", "2.5rem", "2.5rem"),
    ".btn-sm": buttonSize("0.375rem", "1rem", "0.813rem"),
    ".btn-lg": buttonSize("0.771rem", "1.75rem", "1.188rem"),
    ".btn-block": {
        display: "block",
        width: "100%",
    },
});

module.exports.buttonVariant = buttonVariant;
module.exports.buttonSize = buttonSize;
module.exports.button = button;
