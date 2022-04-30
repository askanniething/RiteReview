import { ACTIONS } from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ACTIONS.GET_ALL_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    case ACTIONS.DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter((el) => el._id !== action.payload),
      };
    case ACTIONS.ADD_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };
    case ACTIONS.EDIT_REVIEW:
      return {
        ...state,
        reviews: [
          ...state.reviews.filter((el) => el._id !== action.payload.id),
          action.payload.data,
        ],
      };
    default:
      return state;
  }
};

export default reducer;
