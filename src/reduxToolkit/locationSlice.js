import {createSlice} from "@reduxjs/toolkit";

export const locationSlice = createSlice({
    name:"location",

    initialState:{
        city:"Lviv",
        position: {lat: 49.842957, lng: 24.031111}
    },

    reducers:{
        setCity(state, action){
          state.city = action.payload
        },
        setPosition(state, action){
            state.position = action.payload
        }
    }
})

export default locationSlice.reducer
export const {setCity, setPosition} = locationSlice.actions