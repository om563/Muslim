
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const getRadioData = createAsyncThunk("radioSlice/getRadioData", async () => {
    const language = localStorage.getItem("language");
    const { data } = await axios.get(`https://mp3quran.net/api/v3/radios?language=${language === "en" ? "eng" : "ar"}`);
    return data;

}
)

const radioSlice = createSlice({
    name: "radioSlice",


    initialState: {
        isError: false,
        isFetching: false,
        isLoading: false,
        radioData: null,
        radioName: null,
        radioUrl: null,


    },
    reducers: {
        handleRadioName: (preState, action) => {
            preState.radioName = action.payload.name;
            preState.radioUrl = action.payload.url;

        }

    },

    extraReducers: (builder) => {
        builder.addCase(getRadioData.fulfilled, (prevState, action) => {
            prevState.radioData = action.payload.radios;
            prevState.isFetching = true;



        }
        )

    }

})
export const { handleRadioName } = radioSlice.actions

export default radioSlice.reducer;