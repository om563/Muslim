import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react-dom/test-utils";




export const getTafserData = createAsyncThunk("tafserSlice/getTafserData", async () => {
    const { data } = await axios.get(`https://mp3quran.net/api/v3/tafsir?tafsir=4&language=ar`);
    return data;

}
)

export const getAllSuarhs = createAsyncThunk("tafserSlice/getAllSuarhs", async () => {
    const { data } = await axios.get(`https://mp3quran.net/api/v3/suwar?language=ar`);
    return data;

}
)


const tafserSlice = createSlice({

    name: "tafserSlice",


    initialState: {
        isError: false,
        isFetching: false,
        isLoading: false,
        tafserData: null,
        allSuarhs: null,
        selectedSurahName: null,
        surahId: null,
        TafserUrl: null,
        selectedAya: null,

    },
    reducers: {
        handleSurahName: (prevState, action) => {
            prevState.selectedSurahName = action.payload.name;
            prevState.surahId = action.payload.id;

        },
        handleSelectedTafser: (prevState, action) => {
            prevState.selectedAya = action.payload.tafserName;
            prevState.TafserUrl = action.payload.tafserUrl;
         

        }


    },
    extraReducers: (builder) => {

        builder.addCase(getAllSuarhs.fulfilled, (prevState, action) => {
            prevState.allSuarhs = action.payload.suwar;
            prevState.isFetching = true;


        }
        )
        builder.addCase(getTafserData.fulfilled, (prevState, action) => {
            prevState.tafserData = action.payload;
        }
        )


    }


})
export const { handleSurahName, handleSelectedTafser } = tafserSlice.actions
export default tafserSlice.reducer;