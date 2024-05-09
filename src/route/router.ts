import express from 'express';
import{IndicatorRequestController} from '../controller/indicatorRequestController'

const router = express.Router();
const indicatorController = new IndicatorRequestController();

router.get('/indicatorKucoin/:symbol',indicatorController.controleIndicatorRequestKucoin);

export default router; 