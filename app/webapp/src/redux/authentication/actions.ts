import { UPDATE_PASSWORD } from "./types";

export const updatePassword = (password: string) => {
  return {
    type: UPDATE_PASSWORD,
    payload: {
      password
    }
  };
};
