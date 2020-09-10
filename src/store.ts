import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers, { StoreType } from './reducers';
import sagas from './sagas';

const newStore = (): StoreType => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducers, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(sagas);

  return store;
};

export default newStore;
