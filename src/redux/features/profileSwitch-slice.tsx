import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type InitialState = {
  value: string;
}

const initialState:InitialState =  {
  value: 'page1'
} 

export const profileSwitch = createSlice({
  name: 'profileSwitch',
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    }
  }
})

export const { changePage } = profileSwitch.actions

export default profileSwitch.reducer