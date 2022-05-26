import { createStore, applyMiddleware } from 'redux';
import CreateSagaMiddleware from 'redux-saga';
import Reducers from "./reducers/index";
import Sagas from './saga';
const sagaMiddleware = CreateSagaMiddleware();
const store = createStore(Reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(Sagas);

export default store;
