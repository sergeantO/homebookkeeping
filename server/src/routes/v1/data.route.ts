import express from 'express';
import { dataController } from '../../controllers';
import auth from '../../middlewares/auth';

const router = express.Router();

router
  .route('/operations')
  .post(auth(), dataController.createOperation)
  .get(auth(), dataController.getOperations);

router
  .route('/operations/:operId')
  .delete(auth(), dataController.removeOperation)

router
  .route('/accounts')
  .post(auth(), dataController.createAccount)
  .get(auth(), dataController.getAccounts);

router
  .route('/balances')
  .post(auth(), dataController.closePeriod)
  .get(auth(), dataController.getBalances)

export default router;
