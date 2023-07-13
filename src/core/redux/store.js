import { configureStore } from "@reduxjs/toolkit";
import staffReducer from './staff'

export const store = configureStore({
    reducer: {
        staffs: staffReducer
    }
})