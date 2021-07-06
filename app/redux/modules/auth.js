import { Map, fromJS } from 'immutable';
import { AUTH, LOGIN, LOGOUT, LOGIN_SUCCESS, LOGIN_FAILED } from 'bdf-actions/actionConstants';
import { call,put, takeLatest } from "redux-saga/effects";
import { login } from 'bdf-api/webapi'

var initialState = {
  authUser: Map({
    id: undefined,
    email: undefined,
    password: undefined,
    remember: undefined
  }),
  requestCompleted: false
};

const initialImmutableState = fromJS(initialState);

export default function authReducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case AUTH:
      var storageUser = localStorage.getItem('authUser');
      if(storageUser!=null) {
        var objUser = JSON.parse(storageUser);
        return state.withMutations((mutableState) => {
          mutableState.set('authUser', objUser);
        });        
      }
      return state;
    case LOGIN:
      return state.withMutations((mutableState) => {
        mutableState.set('requestCompleted', false);
      });
    case LOGIN_SUCCESS: {
      console.log('LOGIN_SUCCESS');
      const { user } = action.user;
      const remember = action.remember;
      return state.withMutations((mutableState) => {
        mutableState.set('authUser', user);
        mutableState.set('requestCompleted', true);
        if (remember) {
          localStorage.setItem('authUser', JSON.stringify(user));
        }
      });
    }
    case LOGIN_FAILED: {
      return state.withMutations((mutableState) => {
        mutableState.set('requestCompleted', true);
      });
    }
    case LOGOUT: {
      return state.withMutations((mutableState) => {
        mutableState.set('authUser', {id: undefined, email: undefined, password: undefined});
        localStorage.removeItem('authUser');
      });
    }
    default: {
      return state;
    }
  }
}

export const actions = {
  userLoadedAction: (user, remember) => ({
    type: LOGIN_SUCCESS, 
    user: { user },
    remember: remember
  })
};

export function* sagaAuthSaga() {
  yield takeLatest(LOGIN, function* loginSaga(params) {
    const { data: user } = yield login(params.email, params.password);
    if(user != null) {
      yield put(actions.userLoadedAction(user, params.remember));
    }
  });
}
