import { createSlice } from "@reduxjs/toolkit";

const lastIdSlice = createSlice({
    name: "lastId",
    initialState: {
        value: 1,
    },
    reducers: {
        incrementLastId: (state) => {
            state.value = state.value + 1;
        }
    }
});

export const {incrementLastId} = lastIdSlice.actions;
export default lastIdSlice.reducer;