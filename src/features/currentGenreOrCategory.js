import { createSlice } from "@reduxjs/toolkit";

const genreOrCategory = createSlice({
    name: "genreOrCategory",
    initialState: {
        genreIdOrCategoryName: "",
        searchQuery: "",
    },
    reducers: {
        selectGenreOrCategory: (state, action) => {
            state.genreIdOrCategoryName = action.payload;
            state.searchQuery = "";
        },
        searchMovie: (state, action) => {
            state.searchQuery = action.payload;
            state.genreIdOrCategoryName = "";
        },
    },
});

export const { selectGenreOrCategory, searchMovie } = genreOrCategory.actions;

export default genreOrCategory.reducer;
