import { useEffect, useState } from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { searchMovie } from "../../features/currentGenreOrCategory";

const Search = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { searchQuery } = useSelector(
        (state) => state.currentGenreOrCategory
    );
    const [query, setQuery] = useState("");

    const location = useLocation();

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            dispatch(searchMovie(query));
        }
    };

    useEffect(() => {
        setQuery(searchQuery);
    }, [searchQuery]);

    if (location.pathname !== "/") return null;

    return (
        <Box
            sx={{
                [theme.breakpoints.down("sm")]: {
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    marginBottom: "10px",
                },
            }}
        >
            <TextField
                variant="standard"
                value={query}
                onKeyDown={handleKeyDown}
                onChange={(e) => setQuery(e.target.value)}
                InputProps={{
                    sx: {
                        color: theme.palette.mode === "light" && "black",
                        filter: theme.palette.mode === "light" && "invert(1)",
                    },

                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
};

export default Search;
