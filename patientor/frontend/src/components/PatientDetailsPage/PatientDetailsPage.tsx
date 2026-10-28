import { Diagnosis, Entry, Patient } from "../../types";
import patientService from "../../services/patients";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm/AddEntryForm";
const PatientDetailsPage = ({diagnoses} : {diagnoses: Diagnosis[]}) => {
  const [patient,setPatient] = useState<Patient | null>(null);
  const id = useParams().id;
  const addLocalEntry = (entry : Entry) => {
    if (patient) {
      const oldPatient = patient;
      setPatient({
        ...oldPatient,
        entries : [...oldPatient.entries, entry]
      });
    }
  };
  useEffect(() => {
    const fetchPatient = async () => {
      if (id){
        const patients = await patientService.getById(id);
        setPatient(patients);
      }
    };
    void fetchPatient();
  }, [id]);
  if (patient) {
    return (
      <div key='patient-details-page'>
        <h4>{patient.name}</h4>
        <p>gender: {patient.gender}</p>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <p>date of birth: {patient.dateOfBirth}</p>
        <h5>entries</h5>
        {patient.entries.map(entry => <EntryDetails key={entry.id} entry={entry}/>)}
        <AddEntryForm 
          id={patient.id}
          diagnoses={diagnoses}
          addLocalEntry={addLocalEntry}
        />
      </div>
    );
  }
  return (
    <></>
  );
};
export default PatientDetailsPage;