import data from "../../data/diagnoses.ts";
import type { Diagnosis } from "../../types/types.ts";

const getDiagnoses = (): Diagnosis[] => {
  return data;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnosis
};