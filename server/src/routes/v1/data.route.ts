import express from 'express';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { userValidation } from '../../validations';
import { dataController } from '../../controllers';

const router = express.Router();

router
  .route('/operations')
  .post(auth(), dataController.createOperation)
  .get(auth(), dataController.getOperations);

router
  .route('/accounts')
  .post(auth(), dataController.createAccount)
  .get(auth(), dataController.getAccountsWithBalance);

export default router;
