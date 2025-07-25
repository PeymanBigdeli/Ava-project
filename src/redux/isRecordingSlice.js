import { createSlice } from "@reduxjs/toolkit";

const isRecordingSlice = createSlice({
    name: "isRecording",
    initialState: {
        value: false,
    },
    reducers: {
        setIsRecording: (state , action) => {
            state.value = action.payload;
        }
    }
});

export const {setIsRecording} = isRecordingSlice.actions;
export default isRecordingSlice.reducer;