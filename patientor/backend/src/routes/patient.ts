import  { NewPatientSchema, type SSNRedactedPatient } from '../../types/types.ts';
import express, { type Response } from 'express';
import patientService from "../services/patientService.ts";
import { z } from 'zod';
import { NewPatientParser, errorMiddleware } from '../middleware.ts';


const router = express.Router();

router.get('/', (_req, res : Response<SSNRedactedPatient[]>) => {
  res.send(patientService.getSSNRedactedPatients());
});

router.post('/', NewPatientParser, (req, res) => {
  try {
    const NewPatient = NewPatientSchema.parse(req.body);
    const addedPatient = patientService.addPatient(NewPatient);
    res.json(addedPatient);
  } catch (error) {
    if (error instanceof z.ZodError) {      
      res.status(400).send({ error: error.issues });    
    } else {      
      res.status(400).send({ error: 'unknown error' });    
    }  
  }
});

router.use(errorMiddleware);
export default router;