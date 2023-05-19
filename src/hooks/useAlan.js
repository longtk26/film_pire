import { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import alanBtn from "@alan-ai/alan-sdk-web";

import { ToggleThemeContext } from "../utils/ToggleTheme";
import {
    selectGenreOrCategory,
    searchMovie,
} from "../features/currentGenreOrCategory";
import { getToken } from "../utils";

const useAlan = () => {
    const dispatch = useDispatch();
    const { setMode } = useContext(ToggleThemeContext);

    useEffect(() => {
        alanBtn({
            key: "1016e20e0fa611e4b626dfdcfb058f172e956eca572e1d8b807a3e2338fdd0dc/stage",
            onCommand: ({ command, mode, genreOrCategory, genres, query }) => {
                switch (command) {
                    case "changeMode":
                        if (mode === "light") {
                            setMode(() => {
                                localStorage.setItem("mode", "light");
                                return "light";
                            });
                        } else {
                            setMode(() => {
                                localStorage.setItem("mode", "dark");
                                return "dark";
                            });
                        }
                        break;
                    case "login":
                        getToken();
                        break;
                    case "logout":
                        localStorage.clear();
                        window.location.href = "/";
                        break;
                    case "chooseGenre":
                        const foundGenre = genres.find(
                            (genre) =>
                                genre.name.toLowerCase() ===
                                genreOrCategory.toLowerCase()
                        );
                        if (foundGenre) {
                            dispatch(selectGenreOrCategory(foundGenre.id));
                        } else {
                            const value =
                                genreOrCategory === "top rated"
                                    ? "top_rated"
                                    : genreOrCategory;
                            dispatch(selectGenreOrCategory(value));
                        }
                        break;
                    case "search":
                        dispatch(searchMovie(query));
                        break;
                    default:
                        break;
                }
            },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useAlan;
