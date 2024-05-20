import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: rootReducer,
});

//  AppDispatch is a type alias that represents the type of the dispatch function of my Redux store
// "typeof store.dispatch" extracts the type of the dispatch function from the store object
export type AppDispatch = typeof store.dispatch;

// useAppDispatch is a custom hook that returns the dispatch function from the Redux store
// It uses the useDispatch hook from react-redux to access the dispatch function within functional components
export const useAppDispatch: () => AppDispatch = () =>
  useDispatch<AppDispatch>();

export default store;
