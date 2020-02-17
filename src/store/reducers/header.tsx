import * as types from "../types";
import { Header } from "../state";
import { AnyAction } from "redux";

let initalState: Header = true

export default function(
  state: Header = initalState,
  action: AnyAction
): Header {
  const { type, payload } = action
  switch (type) {
    case types.hideHeader:
      return payload;
    case types.showHeader:
      return payload
    default:
      return state;
  }
}
