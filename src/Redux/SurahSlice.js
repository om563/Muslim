import { createSlice } from "@reduxjs/toolkit";

const surahSlice = createSlice({
    name: "surahSlice",
    initialState: {
        surahId: null,
        rewayahData: null,
        SurahLink: null,
        selectSura: null,

    },
    reducers: {
        handleSuran: (prevState, action) => {
            prevState.surahId = action.payload.padId;
            prevState.selectSura = action.payload.name;
    
            prevState.rewayahData = action.payload.selectReyahaData;
            prevState.SurahLink = `${prevState.rewayahData?.server}${prevState.surahId}.mp3`;

        },



    }
})

export const { handleSuran } = surahSlice.actions;
export default surahSlice.reducer;