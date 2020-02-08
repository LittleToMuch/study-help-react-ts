import * as types from "../constants";
import { StoreState2 } from "../types";
import { AnyAction } from "redux";

let initalState: StoreState2 = {
  number: 1
};

export default function(
  state: StoreState2 = initalState,
  action: AnyAction
): StoreState2 {
  switch (action.type) {
    case types.ADD1:
      return { ...state, number: state.number + 1 };
    default:
      return state;
  }
}
