import data from "../../data/patients.ts";
import type { NewPatient ,Patient, NonSensitivePatient, EntryWithoutId } from "../types.ts";
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return data;
};
const findPatientByID = (id : string) : Patient | undefined => {
  return data.find(patient => patient.id == id);
};
const getSSNRedactedPatients = (): NonSensitivePatient[] => {
  return data.map(({id, name, dateOfBirth, gender, occupation}) => 
    ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
};

const addPatient = (patient : NewPatient) => {
  const id = uuid();
  const NewPatient = {
    ...patient,
    id,
    entries : []
  };

  data.push(NewPatient);
  return NewPatient;
};

const addPatientEntry = (id : string,entry : EntryWithoutId) : Patient | undefined => {
  const patient = data.find(patient => patient.id == id);
  const newEntry = {
    id : uuid(),
    ...entry,
  };

  if (patient) {
    patient.entries.push(newEntry);
    return patient;
  } else {
    return undefined;
  }
};

export default {
  getPatients,
  getSSNRedactedPatients,
  findPatientByID,
  addPatient,
  addPatientEntry
};