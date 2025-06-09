import { combineReducers, Reducer } from "redux";
import userReducer from "./userInfo";
import { persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";


const rootReducer:any = combineReducers({ userReducer });



const store = configureStore({
    reducer: rootReducer,
});

export default store;

export type rootState = ReturnType<typeof rootReducer>

