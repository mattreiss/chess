import { takeLatest, all } from 'redux-saga/effects'


/* ------------- Action Types ------------- */
import { MainTypes } from '../actions/MainActions';
import { NavigateTypes } from '../actions/NavigateActions';
import { UserTypes } from '../actions/UserActions';


/* ------------- Sagas ------------- */
import * as MainSagas from './MainSagas';
import * as NavigateSagas from './NavigateSagas';
import * as UserSagas from './UserSagas';


/* ------------- Connect Action Types To Saga functions ------------- */
export default function * root () {
  yield all([
    // Main sagas
    takeLatest(MainTypes.INIT, MainSagas.init),

    // Navigate sagas
    takeLatest(MainTypes.INIT, MainSagas.init),
    takeLatest(NavigateTypes.SET_SCREEN, NavigateSagas.setScreen),

    // User sagas
    takeLatest(UserTypes.INIT, UserSagas.init),
  ])
}
