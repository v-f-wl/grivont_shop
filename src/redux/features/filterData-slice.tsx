import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StateWithIndexSignature = {
  [key: string]: any;
};

type InitialState = {
  color: string,
  subCategory: string,
  mainCategory: string,
  maxPrice: string,
  inStock: boolean
}

const initialState:InitialState =  {
  color: 'undefined',
  subCategory: 'undefined',
  mainCategory: 'undefined',
  maxPrice: 'undefined',
  inStock: false
} 

export const filterData = createSlice({
  name: 'filterData',
  initialState,
  reducers: {
    changeFilterData: (state: StateWithIndexSignature, action: PayloadAction<{ key: string; value: any }>) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    resetFilterData:(state: StateWithIndexSignature, action: PayloadAction<string>) => {
      state[action.payload] = ''
    }, 
  }
})

export const { changeFilterData, resetFilterData } = filterData.actions

export default filterData.reducer