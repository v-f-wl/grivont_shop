import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type InitialState = {
  value: string;
}

const initialState:InitialState =  {
  value: ''
} 

export const wallsCard = createSlice({
  name: 'wallsCard',
  initialState,
  reducers: {
    changeMenu: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    }
  }
})

export const { changeMenu } = wallsCard.actions

export default wallsCard.reducer