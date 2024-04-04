import { createStore, combineReducers } from 'redux';
import authenticationReducer from './reducers/authenticationReducer';

// Combine reducers if you have multiple reducers
const rootReducer = combineReducers({
  authentication: authenticationReducer,
});

// Create the Redux store
const store = createStore(rootReducer);

export default store;
