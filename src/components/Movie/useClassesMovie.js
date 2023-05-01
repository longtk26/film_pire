import { useTheme } from "@mui/material/styles";

const useClassesMovie = () => {
    const theme = useTheme();
    return {
        links: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textDecoration: "none",
        },
        image: {
            borderRadius: 20,
            height: 300,
            "&:hover": {
                cursor: "pointer",
                transform: "scale(1.05)",
            },
            marginBottom: "10px",
        },
        title: {
            textOverflow: "ellipsis",
            overflow: "hidden",
            width: "230px",
            textAlign: "center",
            whiteSpace: "nowrap",
            color: theme.palette.text.primary,
        },
        movieContain: {
            padding: "10px",
        },
    };
};

export default useClassesMovie;
