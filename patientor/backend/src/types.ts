import { z } from 'zod';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}
export const Gender = {
  Male: "male",
  Female :"female",
  Other: 'other'
} as const;

export type Gender = typeof Gender[keyof typeof Gender];

const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional()
});

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

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

const constSickLeaveSchema = z.object({
  startDate: z.iso.date(),
  endDate : z.iso.date()
});

interface SickLeave {
  startDate: string
  endDate : string
}

interface OccupationalHealthcareEntry extends BaseEntry{
  type: "OccupationalHealthcare";
  employerName: string
  sickLeave? : SickLeave
}

const OccupationalHealthcareEntrySchema = BaseEntrySchema.safeExtend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave : constSickLeaveSchema.optional()
});

const DischargeSchema = z.object({
  date: z.iso.date(),
  criteria : z.string()
});

interface Discharge {
  date: string;
  criteria: string
}

export const HospitalEntrySchema = BaseEntrySchema.safeExtend({
  type: z.literal("Hospital"),
  discharge : DischargeSchema
});

interface HospitalEntry extends BaseEntry{
  type: "Hospital";
  discharge : Discharge
}


export const NewEntrySchema = z.discriminatedUnion("type",[
    HealthCheckEntrySchema.omit({id : true}),
    OccupationalHealthcareEntrySchema.omit({id : true}),
    HospitalEntrySchema.omit({id : true})
]);;

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;


export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth:  z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
  // entries: z.array(EntrySchema)
});

export type NewPatient = z.infer<typeof NewPatientSchema>;

export interface Patient extends NewPatient {
  id: string;
  entries: Entry[]
}
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;