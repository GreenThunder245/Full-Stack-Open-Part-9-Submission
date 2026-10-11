import data from "../../data/patients.ts";
import type { NewPatient ,Patient, SSNRedactedPatient } from "../../types/types.ts";
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return data;
};
const getSSNRedactedPatients = (): SSNRedactedPatient[] => {
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
    id,
    ...patient,
  };

  data.push(NewPatient);
  return NewPatient;
};

export default {
  getPatients,
  getSSNRedactedPatients,
  addPatient
};