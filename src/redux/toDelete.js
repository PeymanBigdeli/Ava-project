import { createSlice } from "@reduxjs/toolkit";

const toDeleteSlice = createSlice({
    name: "toDelete",
    initialState: {
        value: 1,
    },
    reducers: {
        setToDelete: (state , action) => {
            state.value = action.payload;
        }
    }
});

export const {setToDelete} = toDeleteSlice.actions;
export default toDeleteSlice.reducer;