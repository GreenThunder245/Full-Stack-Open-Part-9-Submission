import axios from 'axios'
import { z } from 'zod';
import { DiaryEntrySchema, NonSensitiveDiaryEntrySchema, type DiaryEntry, type NewDiaryEntry, type NonSensitiveDiaryEntry } from '../types'

interface ValidationIssue {
  path : string[],
  message : string
}
interface ValidationError {
  error: ValidationIssue[]
}


const baseUrl : string = 'http://localhost:3000/api/diaries'
const getAll = async () : Promise<NonSensitiveDiaryEntry[]>=> {  
  try {
    const response = await axios.get(baseUrl);
    const data : NonSensitiveDiaryEntry[] = z.array(NonSensitiveDiaryEntrySchema).parse(response.data);
    return data
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error('errorMessage', {cause: error})
    } 
    throw new Error('unknown error', {cause: error})
  }

}

const createNew = async (newDiaryEntry: NewDiaryEntry) : Promise<DiaryEntry> => {
  try {
    const response = await axios.post<NewDiaryEntry>(baseUrl, newDiaryEntry)
    const addedDiaryEntry : DiaryEntry = DiaryEntrySchema.parse(response.data);
    return addedDiaryEntry
  } catch (error) {
    if (axios.isAxiosError<ValidationError>(error)){
      if (error.response) {
        const errorMessage = error.response?.data.error.reduce((errorMessage : string, issue) =>{
          return errorMessage.concat(`${issue.path[0]}: ${issue.message} `)
        }, '');
        throw new Error(errorMessage, {cause: error})
      } else{
        throw new Error('Network Error', {cause: error})
      }
    } else {
      throw new Error('Unknown Error', {cause: error})
    }
  }
}

export default { getAll, createNew }