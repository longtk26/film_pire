import { useTheme } from "@mui/material/styles";

const useClassesSidebar = () => {
    const theme = useTheme();
    return {
        imageLink: {
            display: "flex",
            justifyContent: "center",
            padding: "10% 0",
        },
        image: {
            width: "70%",
        },
        links: {
            color: theme.palette.text.primary,
            textDecoration: "none",
        },
        genreImage: {
            filter: theme.palette.mode === "dark" ? "dark" : "invert(1)",
        },
    };
};

export default useClassesSidebar;
