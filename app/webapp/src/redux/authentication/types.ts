export const UPDATE_PASSWORD = "UPDATE_PASSWORD";

export type AuthenticationState = {
  password: string;
};

interface UpdatePassword {
  type: typeof UPDATE_PASSWORD;
  payload: {
    password: string;
  };
}

export type AuthenticationActionTypes = UpdatePassword;
