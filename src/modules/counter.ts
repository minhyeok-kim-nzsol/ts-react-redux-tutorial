import { createAction, ActionType, createReducer } from "typesafe-actions";

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";
const INCREASE_BY = "counter/INCREASE_BY";

export const increase = createAction(INCREASE)();
export const decrease = createAction(DECREASE)();
export const increaseBy = createAction(INCREASE_BY)<number>();

type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0,
};

const actions = { increase, decrease, increaseBy };
type ConuterAction = ActionType<typeof actions>;

// function counter(
//   state: CounterState = initialState,
//   action: CounterAction
// ): CounterState {
//   switch (action.type) {
//     case INCREASE:
//       return { count: state.count + 1 };
//     case DECREASE:
//       return { count: state.count - 1 };
//     case INCREASE_BY:
//       return { count: state.count + action.payload };
//     default:
//       return state;
//   }
// }

const counter = createReducer<CounterState, ConuterAction>(initialState)
  .handleAction(increase, (state) => ({ count: state.count + 1 }))
  .handleAction(decrease, (state) => ({ count: state.count - 1 }))
  .handleAction(increaseBy, (state, action) => ({
    count: state.count + action.payload,
  }));

// , {
//   [INCREASE]: (state) => ({ count: state.count + 1 }),
//   [DECREASE]: (state) => ({ count: state.count - 1 }),
//   [INCREASE_BY]: (state, action) => ({ count: state.count + action.payload }),
//});

export default counter;
