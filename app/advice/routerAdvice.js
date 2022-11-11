import express from 'express';
import { getAdvice } from './controllers/getAdviceApi';

const router = express.Router();

router.post('/', getAdvice);

export default router;
