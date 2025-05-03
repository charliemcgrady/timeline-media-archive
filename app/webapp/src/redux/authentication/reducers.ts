import {
  AuthenticationState,
  UPDATE_PASSWORD,
  AuthenticationActionTypes
} from "./types";

export default (
  state = {
    password: ""
  } as AuthenticationState,
  action: AuthenticationActionTypes
): AuthenticationState => {
  switch (action.type) {
    case UPDATE_PASSWORD:
      return {
        password: action.payload.password
      };
    default:
      return state;
  }
};
