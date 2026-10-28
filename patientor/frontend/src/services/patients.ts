import axios from "axios";
import { 
  type Entry,
  type EntryWithoutId,
  type PatientFormValues,
  type Patient,
  type NonSensitivePatient,
  NonSensitivePatientSchema
  ,EntrySchema,
  PatientSchema 
} from "../types";
import { z } from 'zod';
import { apiBaseUrl } from "../constants";

interface ValidationIssue {
  path : string[],
  message : string
}
interface ValidationError {
  error: ValidationIssue[]
}

const getAll = async () : Promise<NonSensitivePatient[]> => {
  try {
    const { data } = await axios.get(
      `${apiBaseUrl}/patients`
    );
    return z.array(NonSensitivePatientSchema).parse(data);
  } catch (error) {
    if (axios.isAxiosError(error)){
      throw new Error('Network Error');
    } else if(error instanceof z.ZodError){
      throw new Error('Parsing Error');
    } else {
      throw new Error('Unknown Error');
    }
  }

};

const getById = async (id : string) : Promise<Patient> => {
  try {
    const { data } = await axios.get(
      `${apiBaseUrl}/patients/${id}`
    );
    return PatientSchema.parse(data);
  } catch (error) {
    if (axios.isAxiosError(error)){
      throw new Error('Network Error');
    } else if(error instanceof z.ZodError){
      throw new Error('Parsing Error');
    } else {
      throw new Error('Unknown Error');
    }
  }

};

const create = async (object: PatientFormValues) : Promise<Patient> => {
  try {
    const { data } = await axios.post(
      `${apiBaseUrl}/patients`,
      object
    );
    return PatientSchema.parse(data);
  } catch (error) {
    if (axios.isAxiosError(error)){
      throw new Error('Network Error');
    } else if(error instanceof z.ZodError){
      throw new Error('Parsing Error');
    } else {
      throw new Error('Unknown Error');
    }
  }
};

const addEntry = async (object : EntryWithoutId, id : string) : Promise<Entry> => {
  try {
    const response = await axios.post(`${apiBaseUrl}/patients/${id}/entries`,object);
    console.log(response.data);
    return EntrySchema.parse(response.data);
  } catch (error) {
    if (axios.isAxiosError<ValidationError>(error)){
      if (error.response) {
        const errorMessage = error.response?.data.error.reduce((errorMessage : string, issue) =>{
          return errorMessage.concat(`${issue.path[0]}: ${issue.message} `);
        }, '');
        throw new Error(errorMessage);
      } else {
        throw new Error('Network Error');
      }
    } else if(error instanceof z.ZodError){
      console.log(error.issues);
      throw new Error('Parsing Error');
    } else {
      throw new Error('Unknown Error');
    }
  }

};

export default {
  getAll, getById, create, addEntry
};

