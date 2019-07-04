import { put, call } from 'redux-saga/effects';
import { NavigateActions } from '../actions';

export function * init() {
  console.log("init navigate saga");
}

export function * setScreen({ screen }) {
  console.log("setScreen navigate saga", screen);
}

export default {};
