// import {  Card, TextField, CardContent, Button, Typography} from '@mui/material';
import { useState } from 'react';
// import patientService from "../../../services/patients";
// import axios from 'axios';
import {Card, CardContent} from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import type { Diagnosis, EntryForm, Entry } from '../../../types';
import AddHealthCheckForm from './AddHealthCheckEntryForm';
import AddHospitalEntryForm from './AddHospitalEntryForm';
import AddOccupationalHealthcareEntryForm from './AddOccupationalHealthcareEntryForm';
const AddEntryForm = ({id, diagnoses, addLocalEntry} : {id : string, diagnoses : Diagnosis[], addLocalEntry : (entry : Entry) => void}) => {
  const [formType, setFormType] = useState<EntryForm>("HealthCheckEntry");
  return(
    <div>
      <Card variant="outlined">
        <CardContent>
          <FormControl fullWidth>
            <InputLabel id="form-type">Health Check Rating</InputLabel>
            <Select
              labelId="form-type"
              value={formType}
              label="Entry Type"
              onChange={(event) => setFormType(event.target.value)}
            >
              <MenuItem value="HealthCheckEntry">Health Check</MenuItem>
              <MenuItem value="OccupationalHealthcareEntry">Occupational Healthcare</MenuItem>
              <MenuItem value="HospitalEntry">Hospital</MenuItem>
            </Select>
          </FormControl>
            {formType == "HealthCheckEntry" &&
            <AddHealthCheckForm
              id={id}
              diagnoses={diagnoses}
              addLocalEntry={addLocalEntry}
            />}
            {formType == "OccupationalHealthcareEntry" &&
            <AddOccupationalHealthcareEntryForm 
              id={id}
              diagnoses={diagnoses}
              addLocalEntry={addLocalEntry}
            />}
            {formType == "HospitalEntry" &&
            <AddHospitalEntryForm 
              id={id}
              diagnoses={diagnoses}
              addLocalEntry={addLocalEntry}
            />
            }
        </CardContent>
      </Card>
    </div>
  );
};

export default AddEntryForm;