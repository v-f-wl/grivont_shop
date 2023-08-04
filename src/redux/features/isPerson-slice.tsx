import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type InitialState = {
  value: boolean;
}

const initialState:InitialState =  {
  value: false
} 

export const isPerson = createSlice({
  name: 'isPerson',
  initialState,
  reducers: {
    changeValue: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    }
  }
})

export const { changeValue } = isPerson.actions

export default isPerson.reducer