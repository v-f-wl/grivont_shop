import { configureStore } from "@reduxjs/toolkit";
import profileSwitch from './features/profileSwitch-slice'
import authSwitch from './features/authSwitch-slice'
import isPerson from './features/isPerson-slice'
import cardMenu from './features/wallsCard-slice'
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    profileSwitch,
    authSwitch,
    isPerson,
    cardMenu
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector