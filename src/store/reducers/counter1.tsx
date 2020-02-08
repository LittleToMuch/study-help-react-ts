import { StoreState1 } from "../types";
import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from "../constants";
import { AnyAction } from "redux";

let initalState: StoreState1 = {
  enthusiamLevel: 1,
  languageName: "TypeScript"
};

export default function (
  state: StoreState1 = initalState,
  action: AnyAction
): StoreState1 {
  switch (action.type) {
    case INCREMENT_ENTHUSIASM:
      return { ...state, enthusiamLevel: state.enthusiamLevel + 1 };
    case DECREMENT_ENTHUSIASM:
      return {
        ...state,
        enthusiamLevel: Math.max(1, state.enthusiamLevel - 1)
      };
    default:
      return state;
  }
}

// export function enthusiasm(
//   state: StoreState,
//   action: EnthusiasmAction
// ): StoreState {
//   switch (action.type) {
//     case INCREMENT_ENTHUSIASM:
//       return { ...state, enthusiamLevel: state.enthusiamLevel + 1 };
//     case DECREMENT_ENTHUSIASM:
//       return {
//         ...state,
//         enthusiamLevel: Math.max(1, state.enthusiamLevel - 1)
//       };
//     default:
//       return state;
//   }
// }
