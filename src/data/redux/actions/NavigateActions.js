// @flow
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  // <actionName>:[<arg1>,...,<argN>] --> function actionName(arg1,..., argN)
  init: [],
  setScreen: ['screen']
});

export const NavigateTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  screen: 'MainScreen'
});

/* ------------- Reducers ------------- */
const merge = (state, data) => Object.assign({}, state, data);
const init = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.INIT]: init,
  [Types.SET_SCREEN]: merge,
});
