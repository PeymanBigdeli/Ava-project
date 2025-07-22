import { configureStore } from "@reduxjs/toolkit";
import paginationReducer from "./currPageSlice.js"
import lastIdReducer from "./lastIdSlice.js";
import toDeleteReducer from "./toDelete.js" 
import expandedItemReducer from "./expandedItemSlice.js";
import isDisabledReducer from "./isDisabledSlice.js"
import isRecordingReducer from "./isRecordingSlice.js"
import loadingTranscribeReducer from "./loadingTranscribe.js"

export const store = configureStore({
    reducer: {
        pagination: paginationReducer,
        lastId: lastIdReducer,
        toDelete: toDeleteReducer,
        expandedItem: expandedItemReducer,
        isDisabled: isDisabledReducer,
        isRecording: isRecordingReducer,
        loadingTranscribe: loadingTranscribeReducer,
    }
});


