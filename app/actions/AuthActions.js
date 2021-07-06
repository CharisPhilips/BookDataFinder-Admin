import {AUTH, LOGIN, LOGOUT} from 'bdf-actions/actionConstants'

export const authAction = () => ({
  type: AUTH
});


export const loginAction = (email, password, remember) => ({
  type: LOGIN, 
  email: email ,
  password: password,
  remember: remember,
});

export const logoutAction = () => ({
  type: LOGOUT
});

