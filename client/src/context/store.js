import React, { createContext, useReducer, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

import {
  AUTH_ERROR,
  LOGOUT,
  USER_LOADED,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
} from './types';

let ENDPOINT = '/';
let socket;

const initialState = {
  token: null,
  isAuthenticated: false,
  loading: false,
  user: {},
  socket,
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {

  useEffect(() => {
    socket = socketIOClient(ENDPOINT);
  }, []);

  const [state, dispatch] = useReducer(({ state }, { type, payload }) => {
    switch (type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload,
          socket
        };
      case REGISTER_SUCCESS:
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false,
          socket
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false,
          socket
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
