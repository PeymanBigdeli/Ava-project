import { createSlice } from "@reduxjs/toolkit";

const loadingTranscribeSlice = createSlice({
    name: "loadingTranscribe",
    initialState: {
        value: false,
    },
    reducers: {
        setLoadingTranscribe: (state , action) => {
            state.value = action.payload ;
        }
    }
});

export const {setLoadingTranscribe} = loadingTranscribeSlice.actions;
export default loadingTranscribeSlice.reducer;