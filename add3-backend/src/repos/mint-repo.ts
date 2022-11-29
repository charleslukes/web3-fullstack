import orm from "./mock-orm";
import { IMint } from "@src/models/Mint";
import { getRandomInt } from "@src/declarations/functions";

// **** Functions **** //

/**
 * See if a mint data with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
  const db = await orm.openDb();
  for (const mint of db.mints) {
    if (mint.id === id) {
      return true;
    }
  }
  return false;
}

/**
 * Get all mints.
 */
async function getAll(): Promise<IMint[]> {
  const db = await orm.openDb();
  return db.mints;
}

/**
 * Add one mint.
 */
async function add(mint: IMint): Promise<void> {
  const db = await orm.openDb();
  const user = db.users.find(
    (user) => user.walletAddress === mint.userWalletAddress
  );
  db.mints.push({
    ...mint,
    userId: user?.id!,
    id: getRandomInt(),
  });
  return orm.saveDb(db);
}

/**
 * Delete one mint.
 */
async function _delete(id: number): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.mints.length; i++) {
    if (db.mints[i].id === id) {
      db.mints.splice(i, 1);
      return orm.saveDb(db);
    }
  }
}

// **** Export default **** //

export default {
  persists,
  getAll,
  add,
  delete: _delete,
} as const;
