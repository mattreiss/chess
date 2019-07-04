// @flow
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { AccountModel, ProfileModel } from '../../models';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  // <actionName>:[<arg1>,...,<argN>] --> function actionName(arg1,..., argN)
  init: [],
  setAccount: ['account'],
  setProfile: ['profile']
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  account: new AccountModel(),
  profile: new ProfileModel()
});

/* ------------- Reducers ------------- */
const merge = (state, data) => Object.assign({}, state, data);
const init = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.INIT]: init,
  [Types.SET_ACCOUNT]: merge,
  [Types.SET_PROFILE]: merge,
});