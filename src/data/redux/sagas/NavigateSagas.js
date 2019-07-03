import { put, call } from 'redux-saga/effects';
import { NavigateActions } from '../actions';

export function * init() {
  console.log("init navigage saga");
}

export function * setScreen({ screen }) {
  console.log("setScreen navigage saga", screen);
}

export default {};
