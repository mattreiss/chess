import { takeLatest, all } from 'redux-saga/effects'


/* ------------- Action Types ------------- */
import { MainTypes } from '../actions/MainActions';
import { UserTypes } from '../actions/UserActions';
import { FirebaseTypes } from '../actions/FirebaseActions';


/* ------------- Sagas ------------- */
import * as MainSagas from './MainSagas';
import * as UserSagas from './UserSagas';
import * as FirebaseSagas from './FirebaseSagas';


/* ------------- Connect Action Types To Saga functions ------------- */
export default function * root () {
  yield all([
    // Main sagas
    takeLatest(MainTypes.INIT, MainSagas.init),

    // User sagas
    takeLatest(UserTypes.INIT, UserSagas.init),

    // Firebase sagas
    takeLatest(FirebaseTypes.INIT, FirebaseSagas.init),
  ])
}
