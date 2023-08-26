import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  openModal: string
}

const initialState:InitialState =  {
  openModal: ''
} 

export const createModal = createSlice({
  name: 'createModal',
  initialState,
  reducers: {
    changeModal: (state, action: PayloadAction<string>) => {
      // state.value = action.payload;
      if(state.openModal === action.payload){
        state.openModal = ''
      }else{
        state.openModal = action.payload
      }
    }
  }
})

export const { changeModal } = createModal.actions

export default createModal.reducer