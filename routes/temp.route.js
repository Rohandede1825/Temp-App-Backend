import express from 'express'
import {addTemperature,getTemperature, } from '../controller/temp.controller.js'
import multer from 'multer';
const router = express.Router();









router.post('/add', addTemperature);
router.post('/get', getTemperature);
  // Define the upload route










export default router;