import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import * as apiController from '../controllers/api';
import validate from '../util/validator';

const router = express.Router();

router.get('/', (req: Request, res: Response) => res.json({}));

/* PROFILE */
router.get('/profiles', apiController.getProfiles);
router.get('/profiles/:profileId', apiController.getProfile);
router.post('/profiles',
  body('name').exists(),
  body('accessKeyId').exists(),
  body('accessKeySecret').exists(),
  body('region').exists(),
  body('outputFormat').exists(),
  validate,
  apiController.addProfile,
);
router.put('/profiles/:profileId', apiController.updateProfile);
router.delete('/profiles/:profileId', apiController.deleteProfile);

/* GROUP */
router.get('/groups', apiController.getGroups);
router.get('/groups/:groupId', apiController.getGroup);
router.post('/groups',
  body('name').exists(),
  validate,
  apiController.addGroup,
);
router.put('/groups/:groupId', apiController.updateGroup);
router.delete('/groups/:groupId', apiController.deleteGroup);

/* SERVICE */
router.get('/groups/:groupId/services', apiController.getGroupServices);
router.get('/services/:serviceId', apiController.getService);
router.get('/services', apiController.getServices);
router.post('/groups/:groupId/services',
  body('name').exists(),
  body('groupId').exists(),
  validate,
  apiController.addGroupService,
);
router.put('/services/:serviceId', apiController.updateService);
router.delete('/services/:serviceId', apiController.deleteService);

/* QUERY */
router.get('/queries', apiController.getQueries);
router.get('/queries/:queryId', apiController.getQuery);
router.get('/services/:serviceId/queries', apiController.getServiceQueries);
router.post('/services/:serviceId/queries',
  body('title').exists(),
  body('aws').exists(),
  body('jq').exists(),
  body('serviceId').exists(),
  validate,
  apiController.addServiceQuery,
);
router.post('/queries/:queryId/output',
  body('profile').exists(),
  validate,
  apiController.getQueryOutput,
);
router.put('/queries/:queryId', apiController.updateQuery);
router.delete('/queries/:queryId', apiController.deleteQuery);

export default router;
