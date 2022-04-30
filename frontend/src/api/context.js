import React, { createContext, useReducer } from "react";
import {
  get_user,
  get_all_reviews,
  delete_review,
  add_review,
  edit_review,
} from "./commands";
import Reducer from "./reducer";
import { ACTIONS } from "./actions";

const initialState = {
  user: null,
  reviews: [],
};

export const ProjContext = createContext();
export const ProjProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  async function getUser() {
    try {
      const res = await get_user();
      if (res.data) {
        window.localStorage.setItem("user", JSON.stringify(res.data));
        dispatch({
          type: ACTIONS.GET_USER,
          payload: res.data,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function getAllReviews() {
    try {
      const res = await get_all_reviews();
      dispatch({
        type: ACTIONS.GET_ALL_REVIEWS,
        payload: res.data.data,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async function deleteReview(id) {
    try {
      await delete_review(id);
      dispatch({
        type: ACTIONS.DELETE_REVIEW,
        payload: id,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async function addReview(data) {
    try {
      const res = await add_review(data);
      if (data.status === "public") {
        dispatch({
          type: ACTIONS.ADD_REVIEW,
          payload: res.data.data,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function editReview(id, data) {
    try {
      const res = await edit_review(id, data);
      if (data.status === "public") {
        dispatch({
          type: ACTIONS.EDIT_REVIEW,
          payload: { id, data: res.data.data },
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <ProjContext.Provider
      value={{
        user: state.user,
        reviews: state.reviews,
        getUser,
        getAllReviews,
        deleteReview,
        addReview,
        editReview,
      }}
    >
      {children}
    </ProjContext.Provider>
  );
};
