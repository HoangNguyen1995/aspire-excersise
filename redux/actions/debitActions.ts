export const DEBIT_ACTION_TYPES = {
  TOGGLE_SHOW_CREDENTIAL: 'TOGGLE_SHOW_CREDENTIAL',
  TOGGLE_FREEZE_CARD: 'TOGGLE_FREEZE_CARD',
  UPDATE_WEEKLY_SPENDING_LIMIT: 'UPDATE_WEEKLY_SPENDING_LIMIT',
  FETCH: {
    CARD_INFO: {
      HANDLED: 'CARD_INFO/HANDLED',
      FULFILLED: 'CARD_INFO/FULFILLED',
    },
    BALANCE: {
      HANDLED: 'BALANCE/HANDLED',
      FULFILLED: 'BALANCE/FULFILLED',
    },
    WEEKLY_SPENDING: {
      HANDLED: 'WEEKLY_SPENDING/HANDLED',
      FULFILLED: 'WEEKLY_SPENDING/FULFILLED',
    },
  },
};

export const toggleShowCredentialAction = (payload: boolean) => ({
  type: DEBIT_ACTION_TYPES.TOGGLE_SHOW_CREDENTIAL,
  payload,
});

export const toggleFreezeCardAction = (payload: boolean) => ({
  type: DEBIT_ACTION_TYPES.TOGGLE_FREEZE_CARD,
  payload,
});

export const updateWeeklySpendingLimitAction = (payload: number | null) => ({
  type: DEBIT_ACTION_TYPES.UPDATE_WEEKLY_SPENDING_LIMIT,
  payload,
});

export const fetchCardInfoAction = () => ({
  type: DEBIT_ACTION_TYPES.FETCH.CARD_INFO.HANDLED,
});

export const fetchCardInfoFulfilledAction = (payload: {
  name: string;
  number: string;
  validThrough: string;
  cvv: string;
}) => ({
  type: DEBIT_ACTION_TYPES.FETCH.CARD_INFO.FULFILLED,
  payload,
});

export const fetchBalanceAction = () => ({
  type: DEBIT_ACTION_TYPES.FETCH.BALANCE.HANDLED,
});

export const fetchBalanceFulfilledAction = (payload: number) => ({
  type: DEBIT_ACTION_TYPES.FETCH.BALANCE.FULFILLED,
  payload,
});

export const fetchWeeklySpendingAction = () => ({
  type: DEBIT_ACTION_TYPES.FETCH.WEEKLY_SPENDING.HANDLED,
});

export const fetchWeeklySpendingFulfilledAction = (payload: number) => ({
  type: DEBIT_ACTION_TYPES.FETCH.WEEKLY_SPENDING.FULFILLED,
  payload,
});
