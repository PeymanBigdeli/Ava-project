import { createSlice } from "@reduxjs/toolkit";

const expandedItemSlice = createSlice({
    name: "expandedItem",
    initialState: {
        value: 0,
    },
    reducers: {
        setExpandedItem: (state , action) => {
            state.value = action.payload;
        }
    }
});

export const {setExpandedItem} = expandedItemSlice.actions;
export default expandedItemSlice.reducer;