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
    case 'FETCH_THREADS':
      return { ...state, threads: action.payload.threads };
    case 'FETCH_LOCATIONS':
      return { ...state, locations: action.payload.locations };
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
