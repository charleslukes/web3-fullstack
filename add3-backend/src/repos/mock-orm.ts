/* eslint-disable @typescript-eslint/no-unsafe-return */

import jsonfile from 'jsonfile';

import { IUser } from '@src/models/User';
import { IMint } from '@src/models/Mint';


// **** Variables **** //

const dbFileName = 'database.json';


// **** Types **** //

interface IDb {
  users: IUser[];
  mints: IMint[]
}


// **** Functions **** //

/**
 * Fetch the json from the file.
 */
function openDb(): Promise<IDb> {
  console.log({__dirname});
  return jsonfile.readFile(__dirname + '/' + dbFileName);
}

/**
 * Update the file.
 */
function saveDb(db: IDb): Promise<void> {
  return jsonfile.writeFile((__dirname + '/' + dbFileName), db);
}


// **** Export default **** //

export default {
  openDb,
  saveDb,
} as const;