import { put, call } from 'redux-saga/effects';
import { UserActions } from '../actions';

export function * init() {
  console.log("UserSaga.init()");
}

export default {}; // prevents warning message
