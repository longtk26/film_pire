import { createSlice } from "@reduxjs/toolkit";

const genreOrCategory = createSlice({
    name: "genreOrCategory",
    initialState: {
        genreIdOrCategoryName: "",
        page: 1,
        searchQuery: "",
    },
    reducers: {
        selectGenreOrCategory: (state, action) => {
            state.genreIdOrCategoryName = action.payload;
        },
    },
});

export const { selectGenreOrCategory } = genreOrCategory.actions;

export default genreOrCategory.reducer;
