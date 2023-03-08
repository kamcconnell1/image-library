import { combineReducers, configureStore } from '@reduxjs/toolkit';
import imagesReducer from './features/images/imagesSlice';

const rootReducer = combineReducers({
  images: imagesReducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  });
};

export const store = configureStore({
  reducer: {
    images: imagesReducer
  }
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
