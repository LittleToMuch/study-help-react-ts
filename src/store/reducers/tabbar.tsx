import * as types from "../types";
import { Tabbar } from "../state";
import { AnyAction } from "redux";

let initalState: Tabbar = true

export default function(
  state: Tabbar = initalState,
  action: AnyAction
): Tabbar {
  const { type, payload } = action
  switch (type) {
    case types.hideTabbar:
      return payload;
    case types.showTabbar:
      return payload
    default:
      return state;
  }
}
