import express from 'express'
import {addTemperature,getTemperature} from '../controller/temp.controller.js'
const router = express.Router();

router.post('/add', addTemperature);
router.post('/get', getTemperature);
// router.post('/tempHistory', getTemperatureHistory);

export default router;