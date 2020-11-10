import React, { createContext, useReducer } from 'react';
import { AUTH_ERROR, LOGOUT, UPDATE_USER, USER_LOADED } from './types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: { email: 'test@test.com' },
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(({ state }, { type, payload }) => {
    switch (type) {
      case UPDATE_USER:
        return { ...state, ...payload };
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload,
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
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
