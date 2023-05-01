import { useTheme } from "@mui/material/styles";

const useClassesMovieList = () => {
    const theme = useTheme();
    return {
        movieContainer: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: " space-between",
            overflow: "auto",
            [theme.breakpoints.down("sm")]: {
                justifyContent: "center",
            },
        },
    };
};

export default useClassesMovieList;
