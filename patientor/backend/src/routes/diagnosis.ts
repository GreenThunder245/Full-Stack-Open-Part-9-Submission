import type { Diagnosis } from '../../types/types.ts';
import express, {type Response } from 'express';
import diagnosisService from "../services/diagnosisService.ts";

const router = express.Router();

router.get('/', (_req, res : Response<Diagnosis[]>) => {
  res.send(diagnosisService.getDiagnoses());
});

export default router;