import {call, fork, put, takeLatest} from 'redux-saga/effects';
import {
  DEBIT_ACTION_TYPES,
  fetchBalanceFulfilledAction,
  fetchCardInfoFulfilledAction,
  fetchWeeklySpendingFulfilledAction,
} from '../actions/debitActions';
import {createMockApi} from '../../apis';

function* fetchCardInfo() {
  const cardInfo = yield call(
    createMockApi,
    {
      name: 'Mark Henry',
      number: '564734112413200201',
      validThrough: '11/27',
      cvv: '476',
    },
    3000,
  );
  yield put(fetchCardInfoFulfilledAction(cardInfo));
}
function* fetchBalance() {
  const balance = yield call(createMockApi, 40000, 2000);
  yield put(fetchBalanceFulfilledAction(balance));
}
function* fetchWeeklySpending() {
  const amount = yield call(createMockApi, 13000, 1000);
  yield put(fetchWeeklySpendingFulfilledAction(amount));
}

function* watchDebit() {
  yield takeLatest(DEBIT_ACTION_TYPES.FETCH.CARD_INFO.HANDLED, fetchCardInfo);
  yield takeLatest(DEBIT_ACTION_TYPES.FETCH.BALANCE.HANDLED, fetchBalance);
  yield takeLatest(
    DEBIT_ACTION_TYPES.FETCH.WEEKLY_SPENDING.HANDLED,
    fetchWeeklySpending,
  );
}

export default watchDebit;
