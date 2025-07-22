import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
    name: "pagination",
    initialState: {
        currPage: 1,
    },
    reducers: {
        setCurrPage: (state , action ) => {
            state.currPage = action.payload;
        }
    }
});

export const {setCurrPage} = paginationSlice.actions;
export default paginationSlice.reducer;


