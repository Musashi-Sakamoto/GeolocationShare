import React from 'react';

export const Store = React.createContext();

const initialState = {
  comments: [],
  locations: [],
  currentLocation: {}
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_CURRENT_LOCATION':
      return { ...state, currentLocation: action.payload.current_location };
    case 'FETCH_COMMENTS':
      return { ...state, comments: action.payload.comments };
    case 'FETCH_LOCATIONS':
      return { ...state, locations: action.payload.locations };
    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
