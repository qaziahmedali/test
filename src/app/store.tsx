import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import { useDispatch } from 'react-redux'
// import propertyReducer from "../reducers/propertyReducer";
// import forgotPasswordReducer from "../reducers/forgotPasswordReducer";
// import filterReducer from "../reducers/filterReducer";
// import newsLetterReducer from "../reducers/newLetterReducer";

export const rootReducer = combineReducers({
  Users: authReducer,
});

export const store = configureStore({
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type RootState = ReturnType<typeof rootReducer>