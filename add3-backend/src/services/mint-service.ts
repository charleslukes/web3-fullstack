import { RouteError } from '@src/declarations/classes';
import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import mintRepo from '@src/repos/mint-repo';
import { IMint } from '@src/models/Mint';


// **** Variables **** //

export const mintNotFoundErr = 'mint not found';


// **** Functions **** //

/**
 * Get all mints.
 */
function getAll(): Promise<IMint[]> {
  return mintRepo.getAll();
}

/**
 * Add one user.
 */
function addOne(mint: IMint): Promise<void> {
  return mintRepo.add(mint);
}

/**
 * Delete a mint by id.
 */
async function _delete(id: number): Promise<void> {
  const persists = await mintRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      mintNotFoundErr,
    );
  }
  // Delete user
  return mintRepo.delete(id);
}


// **** Export default **** //

export default {
  getAll,
  addOne,
  delete: _delete,
} as const;
