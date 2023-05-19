import { useDispatch, useSelector } from "react-redux";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import {
    Divider,
    List,
    ListItemButton,
    ListItemText,
    ListSubheader,
    ListItemIcon,
    Box as BoxMUI,
    CircularProgress,
} from "@mui/material";

import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import useClassesSidebar from "./useClassesSidebar";
import { useGetGenresQuery } from "../../services/TMDB";
import genresIcon from "../../assets/genres";

const categories = [
    {
        label: "Popular",
        value: "popular",
    },
    {
        label: "Top Rated",
        value: "top_rated",
    },
    {
        label: "Upcoming",
        value: "upcoming",
    },
];

const redLogo =
    "https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png";
const blueLogo =
    "https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png";

const Sidebar = () => {
    const { genreIdOrCategoryName } = useSelector(
        (state) => state.currentGenreOrCategory
    );
    const theme = useTheme();
    const classes = useClassesSidebar();
    const { data, isLoading } = useGetGenresQuery();
    const dispatch = useDispatch();

    const colorActive =
        theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.2)" : "#f44336";

    return (
        <>
            <Link to="/" style={classes.imageLink}>
                <img
                    src={theme.palette.mode === "light" ? redLogo : blueLogo}
                    style={classes.image}
                    alt="Filmpire logo"
                ></img>
            </Link>
            <Divider />
            <List>
                <ListSubheader>Categories</ListSubheader>
                {categories.map(({ label, value }) => (
                    <Link key={value} style={classes.links} to="/">
                        <ListItemButton
                            onClick={() => {
                                dispatch(selectGenreOrCategory(value));
                            }}
                            sx={{
                                bgcolor:
                                    value === genreIdOrCategoryName &&
                                    colorActive,
                            }}
                        >
                            <ListItemIcon>
                                <BoxMUI
                                    component="img"
                                    src={genresIcon[label.toLowerCase()]}
                                    height={30}
                                    sx={{
                                        filter:
                                            theme.palette.mode === "dark"
                                                ? "invert(1)"
                                                : "",
                                    }}
                                    alt={label}
                                />
                            </ListItemIcon>

                            <ListItemText primary={label} />
                        </ListItemButton>
                    </Link>
                ))}
            </List>

            <Divider />
            <List>
                <ListSubheader>Genres</ListSubheader>
                {isLoading ? (
                    <BoxMUI display="flex" justifyContent="center">
                        <CircularProgress />
                    </BoxMUI>
                ) : (
                    data?.genres?.map(({ name, id }) => (
                        <Link key={id} style={classes.links} to="/">
                            <ListItemButton
                                onClick={() => {
                                    dispatch(selectGenreOrCategory(id));
                                }}
                                sx={{
                                    bgcolor:
                                        id === genreIdOrCategoryName &&
                                        colorActive,
                                }}
                            >
                                <ListItemIcon>
                                    <BoxMUI
                                        component="img"
                                        src={genresIcon[name.toLowerCase()]}
                                        sx={{
                                            filter:
                                                theme.palette.mode === "dark"
                                                    ? "invert(1)"
                                                    : "",
                                        }}
                                        height={30}
                                        alt={name}
                                    />
                                </ListItemIcon>

                                <ListItemText primary={name} />
                            </ListItemButton>
                        </Link>
                    ))
                )}
            </List>
        </>
    );
};

export default Sidebar;
