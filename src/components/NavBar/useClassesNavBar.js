import { useTheme } from "@mui/material/styles";

const useClassesNavBar = () => {
    const theme = useTheme();
    return {
        toolbar: {
            height: "80px",
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "240px",
            [theme.breakpoints.down("sm")]: {
                marginLeft: 0,
                flexWrap: "wrap",
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up("sm")]: {
                display: "none",
            },
        },
        drawer: {
            [theme.breakpoints.up("sm")]: {
                width: "240px",
                flexShrink: 0,
            },
        },
        linkButton: {
            "&:hover": {
                color: "white !important",
                textDecoration: "none",
            },
        },
    };
};

export default useClassesNavBar;
