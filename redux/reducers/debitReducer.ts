import {DEBIT_ACTION_TYPES} from '../actions/debitActions';

export type DebitState = {
  showCredential: boolean;
  isEnableFreeze: boolean;
  weeklySpendingLimit: number | null;
  weeklySpending: number;
  cardInfo: {
    name: string;
    number: string;
    validThrough: string;
    cvv: string;
  };
  balance: number;
};
const initialState: DebitState = {
  showCredential: false,
  isEnableFreeze: false,
  weeklySpendingLimit: null,
  weeklySpending: 1000,
  cardInfo: {
    name: '',
    number: '',
    validThrough: '',
    cvv: '',
  },
  balance: 0,
};
const debitReducer = (
  state = initialState,
  action: {payload: any; type: string},
) => {
  switch (action.type) {
    case DEBIT_ACTION_TYPES.TOGGLE_SHOW_CREDENTIAL:
      return {
        ...state,
        showCredential: action.payload,
      };
    case DEBIT_ACTION_TYPES.TOGGLE_FREEZE_CARD:
      return {
        ...state,
        isEnableFreeze: action.payload,
      };
    case DEBIT_ACTION_TYPES.UPDATE_WEEKLY_SPENDING_LIMIT:
      return {
        ...state,
        weeklySpendingLimit: action.payload,
      };
    case DEBIT_ACTION_TYPES.FETCH.CARD_INFO.HANDLED:
      return {
        ...state,
        cardInfo: initialState.cardInfo,
      };
    case DEBIT_ACTION_TYPES.FETCH.BALANCE.HANDLED:
      return {
        ...state,
        balance: initialState.balance,
      };
    case DEBIT_ACTION_TYPES.FETCH.WEEKLY_SPENDING.HANDLED:
      return {
        ...state,
        weeklySpending: initialState.weeklySpending,
      };
    case DEBIT_ACTION_TYPES.FETCH.CARD_INFO.FULFILLED:
      return {
        ...state,
        cardInfo: action.payload,
      };
    case DEBIT_ACTION_TYPES.FETCH.BALANCE.FULFILLED:
      return {
        ...state,
        balance: action.payload,
      };
    case DEBIT_ACTION_TYPES.FETCH.WEEKLY_SPENDING.FULFILLED:
      return {
        ...state,
        weeklySpending: action.payload,
      };
    default:
      return state;
  }
};
export default debitReducer;
