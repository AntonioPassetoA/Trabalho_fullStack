import { createContext, useReducer } from 'react';

export const CatContext = createContext();

const initialState = {
  cats: [],
  loading: false,
  error: '',
};

function catReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, cats: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export function CatProvider({ children }) {
  const [state, dispatch] = useReducer(catReducer, initialState);

  return (
    <CatContext.Provider value={{ state, dispatch }}>
      {children}
    </CatContext.Provider>
  );
}