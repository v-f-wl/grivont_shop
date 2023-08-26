import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  openModal: string,
  categoryModal: string
}

const initialState:InitialState =  {
  openModal: '',
  categoryModal: ''
} 

export const filterModal = createSlice({
  name: 'filterModal',
  initialState,
  reducers: {
    changeFilterModal: (state, action: PayloadAction<string>) => {
      if(state.openModal === action.payload){
        state.openModal = ''
      }else{
        state.openModal = action.payload
      }
    },
    changeCategoryModal:(state, action: PayloadAction<string>) => {
      if(state.categoryModal === action.payload){
        state.categoryModal = ''
      }else{
        state.categoryModal = action.payload
      }
    }, 
  }
})

export const { changeFilterModal, changeCategoryModal } = filterModal.actions

export default filterModal.reducer