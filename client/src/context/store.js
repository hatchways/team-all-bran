import React, { createContext, useReducer } from 'react';

import {
  AUTH_ERROR,
  LOGOUT,
  USER_LOADED,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
} from './types';

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: {},
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(({ state }, { type, payload }) => {
    switch (type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload,
        };
      case REGISTER_SUCCESS:
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false,
        };
      case AUTH_ERROR:
      case LOGOUT:
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
        };
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
