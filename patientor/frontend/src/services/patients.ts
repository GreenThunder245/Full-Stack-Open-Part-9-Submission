import axios from "axios";
import { Entry, EntryWithoutId, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

interface ValidationIssue {
  path : string[],
  message : string
}
interface ValidationError {
  error: ValidationIssue[]
}


const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getById = async (id : string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addEntry = async (object : EntryWithoutId, id : string) => {
  try {
    const response = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`,object);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ValidationError>(error)){
      if (error.response) {
        const errorMessage = error.response?.data.error.reduce((errorMessage : string, issue) =>{
          return errorMessage.concat(`${issue.path[0]}: ${issue.message} `);
        }, '');
        throw new Error(errorMessage);
      } else{
        throw new Error('Network Error');
      }
    } else {
      throw new Error('Unknown Error');
    }
  }

};

export default {
  getAll, getById, create, addEntry
};

