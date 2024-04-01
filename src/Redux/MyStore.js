import { configureStore } from '@reduxjs/toolkit';
import recitersSliceReducers from "./RecitersSlice"
import rewayahSliceReducers from "./RewayahSlice"
import surahSliceReducers from "./SurahSlice"
import radioSliceReducer from './RadioSlice'
import tafserSliceReducer from './TafserSlice'

const myStore = configureStore({
    reducer: {
        reciters: recitersSliceReducers,
        rewayah: rewayahSliceReducers,
        surah: surahSliceReducers,
        radio: radioSliceReducer,
        tafser: tafserSliceReducer
    }
})

export default myStore;