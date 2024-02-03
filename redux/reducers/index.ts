import {combineReducers} from 'redux';
import debitReducer from './debitReducer';

const rootReducer = combineReducers({
  debit: debitReducer,
});
export default rootReducer;
