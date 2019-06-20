import React from 'react';

export const Store = React.createContext();

const initialState = {
  comments: [],
  threads: [],
  locations: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_COMMENTS':
      return { ...state, comments: action.payload.comments };
    case 'ADD_COMMENT':
      return { ...state, comments: state.comments.concat(action.payload.comment) };
    case 'FETCH_THREADS':
      return { ...state, threads: action.payload.threads };
    case 'ADD_THREAD':
      return { ...state, threads: state.threads.concat(action.payload.thread) };
    case 'FETCH_LOCATIONS':
      return { ...state, locations: action.payload.locations };
    case 'ADD_LOCATION':
      return { ...state, locations: state.locations.concat(action.payload.location) };
    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  console.log(state);

  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
