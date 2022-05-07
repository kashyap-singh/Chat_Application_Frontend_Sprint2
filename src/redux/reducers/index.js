import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
    chatuser: userReducer,
});

