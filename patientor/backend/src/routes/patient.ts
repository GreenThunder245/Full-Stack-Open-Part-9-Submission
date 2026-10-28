import  { NewPatientSchema, NewEntrySchema, type NonSensitivePatient } from '../types.ts';
import express, { type Response } from 'express';
import patientService from "../services/patientService.ts";
import { z } from 'zod';
import { NewPatientParser, NewEntryParser, errorMiddleware } from '../middleware.ts';


const router = express.Router();

router.get('/', (_req, res : Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
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

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const patient = patientService.findPatientByID(id);
  if (patient) {
    res.status(201).send(patient);
  } else {
    res.sendStatus(404);
  }
});


router.post('/:id/entries', NewEntryParser, (req, res) => {
  try {
    const newEntry = NewEntrySchema.parse(req.body);
    const { id } = req.params;
    if (typeof id === 'string' || id instanceof String && typeof id != 'object') {
      const entry = patientService.addPatientEntry(id,newEntry);
      if(entry){
        res.status(201).send(entry);
      } else {
        res.status(404).send("Patient Not Found");
      }
    } else {
      res.status(400).send({error: 'unknown error'});
    }
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