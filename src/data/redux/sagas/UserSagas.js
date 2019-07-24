import { put, call } from 'redux-saga/effects';
import { UserActions } from '../actions';
import Firebase from '../../Firebase';

export function * init() {
  console.log("UserSaga.init()");
  Firebase.test();
}

export default {}; // prevents warning message
