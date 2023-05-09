import express from 'express';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { userValidation } from '../../validations';
import { dataController } from '../../controllers';

const router = express.Router();

router
  .route('/operations')
  .post(dataController.createOperation)
  .get(dataController.getOperations);

router
  .route('/accounts')
  .post(dataController.createAccount)
  .get(dataController.getAccountsWithBalance);

export default router;
