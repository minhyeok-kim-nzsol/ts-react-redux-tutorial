import { createReducer } from "typesafe-actions";
import { GithubState, GithubAction } from "./types";
import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_ERROR,
  getUserProfileAsync,
} from "./actions";

import {
  asyncState,
  createAsyncReducer,
  transformToArray,
} from "../../lib/reducerUtils";

const initialState: GithubState = {
  userProfile: asyncState.initial(),
};

const github = createReducer<GithubState, GithubAction>(initialState, {
  [GET_USER_PROFILE]: (state) => ({
    ...state,
    userProfile: asyncState.load(),
  }),
  [GET_USER_PROFILE_SUCCESS]: (state, action) => ({
    ...state,
    userProfile: asyncState.success(action.payload),
  }),
  [GET_USER_PROFILE_ERROR]: (state, action) => ({
    ...state,
    userProfile: asyncState.error(action.payload),
  }),
});

// 안됨..
// const github = createReducer<GithubState, GithubAction>(
//   initialState
// ).handleAction(
//   transformToArray(getUserProfileAsync),
//   createAsyncReducer(getUserProfileAsync, "userProfile")
// );

export default github;
