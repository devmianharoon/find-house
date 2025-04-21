import { configureStore } from "@reduxjs/toolkit";
import agentSlice from "../features/agent/agentSlice";
import { api } from "../features/api/api";
import filterSlice from "../features/filter/filterSlice";
import propertiesSlice from "../features/properties/propertiesSlice";
import questionSlice from "../store/slices/questionSlice";
import locationReducer from '../store/slices/LocationSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    properties: propertiesSlice,
    filter: filterSlice,
    agent: agentSlice,
    question: questionSlice,
    location: locationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
