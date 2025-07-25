import { createSlice } from "@reduxjs/toolkit";

const isDisabledSlice = createSlice({
    name: "toDisabled",
    initialState: {
        value: false,
    },
    reducers: {
        setIsDisabled: (state , action) => {
            state.value = action.payload;
        }
    }
});

export const {setIsDisabled} = isDisabledSlice.actions;
export default isDisabledSlice.reducer;