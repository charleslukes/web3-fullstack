import { baseProperties } from "./base";
import { IMint, IUser } from "./types";

export const getAllUsers = async () => {
  try {
    const response = await fetch(
      `${baseProperties.server_url}/users/all`,
      baseProperties.getOptions("GET")
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const addUser = async (user: IUser) => {
  try {
    const response = await fetch(
      `${baseProperties.server_url}/users/add`,
      baseProperties.getOptions("POST", { user })
    );
    const data = await response.json();
    return {
      isError: false,
      data,
    };
  } catch (error) {
    return {
      isError: true,
      error,
    };
  }
};

export const addMint = async (mint: IMint) => {
  try {
    const response = await fetch(
      `${baseProperties.server_url}/mints/add`,
      baseProperties.getOptions("POST", { mint })
    );
    const data = await response.json();
    return {
      isError: false,
      data,
    };
  } catch (error) {
    return {
      isError: true,
      error,
    };
  }
};
