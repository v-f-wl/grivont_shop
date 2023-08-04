import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type InitialState = {
  value: string;
}

const initialState:InitialState =  {
  value: 'login'
} 

export const authSwitch = createSlice({
  name: 'authSwitch',
  initialState,
  reducers: {
    changeAuth: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    }
  }
})

export const { changeAuth } = authSwitch.actions

export default authSwitch.reducer