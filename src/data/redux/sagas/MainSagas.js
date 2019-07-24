import { put, call } from 'redux-saga/effects';
import { MainActions, UserActions } from '../actions';

export function * init() {
  console.log("MainSaga.init()");
  // yield call(UserActions.init);
}

export default {};
