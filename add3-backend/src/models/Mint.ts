import { TAll } from "jet-validator";

// **** Types **** //

export interface IMint {
  userId: number;
  receiverAddress: string;
  amount: number;
  transactionHash: string;
  userWalletAddress: string;
  id: number
}

// **** Functions **** //

/**
 * Get a new Mint object.
 */
function _new(
  userId: number,
  receiverAddress: string,
  amount: number,
  transactionHash: string,
  userWalletAddress: string,
): IMint {
  return {
    id: -1,
    userId,
    receiverAddress,
    amount,
    transactionHash,
    userWalletAddress
  };
}

/**
 * Copy a mint object.
 */
function copy(mint: IMint): IMint {
  return {
    userId: mint.userId,
    receiverAddress: mint.receiverAddress,
    amount: mint.amount,
    transactionHash: mint.transactionHash,
    userWalletAddress: mint.userWalletAddress,
    id: mint.id
  };
}

/**
 * See if an object is an instance of Mint.
 */
function instanceOf(arg: TAll): boolean {
  return (
    !!arg &&
    typeof arg === "object" &&
    "userWalletAddress" in arg &&
    "receiverAddress" in arg &&
    "amount" in arg &&
    "transactionHash" in arg
  );
}

// **** Export default **** //

export default {
  new: _new,
  copy,
  instanceOf,
} as const;
