import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import mintService from '@src/services/mint-service';
import { IMint } from '@src/models/Mint';
import { IReq, IRes } from './shared/types';


// **** Variables **** //

// Paths
const paths = {
  basePath: '/mints',
  get: '/all',
  add: '/add',
  delete: '/delete/:id',
} as const;


// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
  const users = await mintService.getAll();
  return res.status(HttpStatusCodes.OK).json({ users });
}

/**
 * Add one user.
 */
async function add(req: IReq<{mint: IMint}>, res: IRes) {
  const { mint } = req.body;
  await mintService.addOne(mint);
  return res.status(HttpStatusCodes.CREATED).end();
}


/**
 * Delete one user.
 */
async function _delete(req: IReq, res: IRes) {
  const id = +req.params.id;
  await mintService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
  paths,
  getAll,
  add,
  delete: _delete,
} as const;
