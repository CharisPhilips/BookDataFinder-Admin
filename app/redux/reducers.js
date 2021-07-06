/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import { all } from "redux-saga/effects";
import { connectRouter } from 'connected-react-router/immutable';
import history from 'utils/history';
import uiReducer from './modules/ui';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import authReducer, { sagaAuthSaga } from './modules/auth';

import crudTableBook, { sagaCrudTableBook } from './modules/crudTableBook';
import crudTableUser, { sagaCrudTableUser } from './modules/crudTableUser';

import treeTableCategory from './modules/treeTableCategory';
import initval from './modules/initForm';

function branchReducer(reducerFunction, reducerName) {
  return (state, action) => {
    const { branch } = action;
    const isInitializationCall = state === undefined;
    if (branch !== reducerName && !isInitializationCall) {
      return state;
    }
    return reducerFunction(state, action);
  };
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    form,
    auth: authReducer,
    ui: uiReducer,
    initval,
    treeTableCategory: branchReducer(treeTableCategory, 'treeTableCategory'),
    crudTableBook: branchReducer(crudTableBook, 'crudTableBook'),
    crudTableUser: branchReducer(crudTableUser, 'crudTableUser'),

    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });
  
  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}

export function* rootSaga() {
  yield all([sagaAuthSaga(), sagaCrudTableBook(), sagaCrudTableUser()]);
}