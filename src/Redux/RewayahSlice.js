import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




export const getRewayahData = createAsyncThunk("rewayahSlice/getRewayahData", async (reciterId) => {
    const language = localStorage.getItem("language");
    
    const { data } = await axios.get(`https://www.mp3quran.net/api/v3/reciters?language=${language === "en" ? "eng" : "ar"}&reciter=${reciterId}`);

    return data;

}
)
const rewayahSlice = createSlice({

    name: "rewayahSlice",

    initialState: {
        rewayahData: null,
        allRewayah: null,
        selectReyahaData: null,
        selectReyahaName: null,
        isError: false,
        isFetching: false,
        isLoading: false,

    },
    reducers: {
        handleRewayah: (preData, action) => {
            preData.selectReyahaData = action.payload.rewayahDataForSurah;
            preData.selectReyahaName = action.payload.name;

        }

    },
    extraReducers: (bulider) => {
        bulider.addCase(getRewayahData.fulfilled, (prevData, action) => {
            prevData.rewayahData = action.payload;
            prevData.allRewayah = action.payload.reciters[0].moshaf;
            prevData.selectReyahaData = prevData.allRewayah[0];

        }
        )

    }

})

export const { handleRewayah } = rewayahSlice.actions;
export default rewayahSlice.reducer;