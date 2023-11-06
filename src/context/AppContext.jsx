import React, { createContext, useContext, useReducer } from "react";
import { imgData } from "../db/data";

const AppContext = createContext();

const initialState = {
  user: null,
  userGallery: [...imgData],
  allGalleries: [...imgData],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USER_GALLERY":
      return { ...state, userGallery: [...action.payload] };
    case "DROP_USER_GALLERY":
      return { ...state, userGallery: [...action.payload] };
    case "DROP_ALL_GALLERY":
      return { ...state, allGalleries: [...action.payload] };
    case "ADD_USER_GALLERY":
      return { ...state, userGallery: [...state.userGallery, action.payload] };
    case "FETCH_ALL_GALLERY":
      return { ...state, allGalleries: [...action.payload] };
    case "DELETE_GALLERY":
      return { ...state, userGallery: [...action.payload] };
    case "DECODED_TOKEN":
      return { ...state, user: { ...action.payload } };
    case "LOGOUT":
      return { ...state, user: action.payload, userGallery: [] };
    default:
      return state;
  }
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
