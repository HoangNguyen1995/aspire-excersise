import {DebitState} from '../reducers/debitReducer';

type State = {debit: DebitState};

export const getShowCredential = (state: State) =>
  state.debit.showCredential ?? false;
export const getIsEnableFreeze = (state: State) =>
  state.debit.isEnableFreeze ?? false;
export const getWeeklySpendingLimit = (state: State) =>
  state.debit.weeklySpendingLimit;
export const getCurrentSpending = (state: State) => state.debit.weeklySpending;
export const getSpendingProgress = (state: State) => {
  const {weeklySpendingLimit, weeklySpending} = state.debit;
  if (!weeklySpendingLimit) {
    return 0;
  } else {
    return Number((weeklySpending * 100) / weeklySpendingLimit);
  }
};
export const getCardInfo = (state: State) => state.debit.cardInfo;
export const getBalance = (state: State) => state.debit.balance;
