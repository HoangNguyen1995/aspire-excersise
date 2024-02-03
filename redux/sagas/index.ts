import {all, fork} from 'redux-saga/effects';
import watchDebit from './debitSaga';

export default function* rootSaga() {
  // yield takeLatest('USER_FETCH_REQUESTED', fetchUser)
  yield all([fork(watchDebit)]);
}
