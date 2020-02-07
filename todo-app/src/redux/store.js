import { createStore } from "redux";

const change_counter = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        count: state.count + 1
      };
    default:
      return state;
  }
};

export default createStore(change_counter);
