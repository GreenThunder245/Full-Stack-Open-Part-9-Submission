import { z } from 'zod';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}
//Define Entries
const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional()
});

export type BaseEntry = z.infer<typeof BaseEntrySchema>;

export const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

export type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

const HealthCheckRatingUnion = z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
    z.literal(HealthCheckRating.CriticalRisk),
]);

const HealthCheckEntrySchema = BaseEntrySchema.safeExtend({
  type: z.literal("HealthCheck"),
  healthCheckRating: HealthCheckRatingUnion
});

export type HealthCheckEntry = z.infer<typeof HealthCheckEntrySchema>;

const constSickLeaveSchema = z.object({
  startDate: z.iso.date(),
  endDate : z.iso.date()
});

export type SickLeave = z.infer<typeof constSickLeaveSchema>;

const OccupationalHealthcareEntrySchema = BaseEntrySchema.safeExtend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave : constSickLeaveSchema.optional()
});

export type OccupationalHealthcareEntry = z.infer<typeof OccupationalHealthcareEntrySchema>;

const DischargeSchema = z.object({
  date: z.iso.date(),
  criteria : z.string()
});

export type Discharge = z.infer<typeof DischargeSchema>;

export const HospitalEntrySchema = BaseEntrySchema.safeExtend({
  type: z.literal("Hospital"),
  discharge : DischargeSchema
});

export type HospitalEntry = z.infer<typeof HospitalEntrySchema>;

export const EntrySchema = z.discriminatedUnion("type",[
  HealthCheckEntrySchema,
  OccupationalHealthcareEntrySchema,
  HospitalEntrySchema
]);

export type Entry = z.infer<typeof EntrySchema>;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export const PatientSchema = z.object({
  name: z.string(),
  dateOfBirth:  z.iso.date(),
  ssn: z.string().optional(),
  gender: z.enum(Gender),
  occupation: z.string(),
  id: z.string(),
  entries: z.array(EntrySchema)
});

export const NonSensitivePatientSchema = PatientSchema.omit(
  { 
    ssn: true,
    entries: true
});

export type Patient = z.infer<typeof PatientSchema>;

export type NonSensitivePatient = z.infer<typeof NonSensitivePatientSchema>;

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type EntryForm = "HospitalEntry" | "OccupationalHealthcareEntry" | "HealthCheckEntry"