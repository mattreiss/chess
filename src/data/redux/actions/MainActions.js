// @flow
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  // <actionName>:[<arg1>,...,<argN>] --> function actionName(arg1,..., argN)
  init: [],
  setLanguage: ['language']
});

export const MainTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  language: 'en'
});

/* ------------- Reducers ------------- */
const merge = (state, data) => Object.assign({}, state, data);
const init = (state) => INITIAL_STATE;
const putObject = (state, object) => merge(state, object);

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.INIT]: init,
  [Types.SET_LANGUAGE]: putObject,
});
