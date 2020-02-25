import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import { logger } from '../modules/analytics'
import { initialize } from './actions';
import { actionTypes } from './constants';

const store = createStore(
  reducer,
   applyMiddleware(logger)
);

store.subscribe(() => console.log('Store:', store.getState()))
// store.dispatch({ type: actionTypes.INIT });

export default store;
