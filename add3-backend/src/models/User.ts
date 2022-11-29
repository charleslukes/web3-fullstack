import { TAll } from 'jet-validator';


// **** Variables **** //

export enum UserRoles {
  Standard,
  Admin,
}


// **** Types **** //

export interface IUser {
  id: number;
  walletAddress: string;
}


// **** Functions **** //

/**
 * Get a new User object.
 */
function _new(
  walletAddress: string,
): IUser {
  return {
    id: -1,
    walletAddress,
  };
}

/**
 * Copy a user object.
 */
function copy(user: IUser): IUser {
  return {
    id: user.id,
    walletAddress: user.walletAddress,
  };
}

/**
 * See if an object is an instance of User.
 */
function instanceOf(arg: TAll): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'walletAddress' in arg 
  );
}


// **** Export default **** //

export default {
  new: _new,
  copy,
  instanceOf,
} as const;
