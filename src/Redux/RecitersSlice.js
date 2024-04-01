import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const getRecitersData = createAsyncThunk("recitersSlice/getRedcitersData", async () => {
    const language = localStorage.getItem("language");
    const { data } = await axios.get(`https://www.mp3quran.net/api/v3/reciters?language=${language === "en" ? "eng" : "ar"}`);
    return data;
}
)



const recitersSlice = createSlice({
    name: "recitersSlice",

    initialState: {
        recitersData: null,
        isError: false,
        isFetching: false,
        isLoading: false,
        SelectedReciter: null,
        reciterId: null,
    },

    reducers: {
        HanReciterSelect: (preState, action) => {
            preState.SelectedReciter = action.payload.reciterName;
            preState.reciterId = action.payload.reciterId;
        },
       


    },

    extraReducers: (bulider) => {
        bulider.addCase(getRecitersData.fulfilled, (prevState, actions) => {
            prevState.isFetching = true;
            prevState.recitersData = actions.payload;

        }
        )
    }

})


export const { HanReciterSelect } = recitersSlice.actions;

export default recitersSlice.reducer;


