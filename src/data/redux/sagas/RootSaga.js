import { takeLatest, all } from 'redux-saga/effects'


/* ------------- Action Types ------------- */
import { MainTypes } from '../actions/MainActions';
import { UserTypes } from '../actions/UserActions';


/* ------------- Sagas ------------- */
import * as MainSagas from './MainSagas';
import * as UserSagas from './UserSagas';


/* ------------- Connect Action Types To Saga functions ------------- */
export default function * root () {
  yield all([
    // Main sagas
    takeLatest(MainTypes.INIT, MainSagas.init),

    // User sagas
    takeLatest(UserTypes.INIT, UserSagas.init),
  ])
}
