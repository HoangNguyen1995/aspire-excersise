import createSagaMiddleware from 'redux-saga';
import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
// import createDebugger from 'redux-flipper';
const sagaMiddleware = createSagaMiddleware();

export const reduxStore = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({serializableCheck: false});
    middlewares.push(sagaMiddleware);
    if (__DEV__) {
      middlewares.push(logger);
    }
    return middlewares;
  },
  // devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);
