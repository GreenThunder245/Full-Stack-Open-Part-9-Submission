import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

import { useState } from 'react';
import patientService from "../../../services/patients";
import type { SickLeave, Diagnosis, Entry } from "../../../types";

interface Props {
  id : string,
  diagnoses : Diagnosis[],
  addLocalEntry : (entry : Entry) => void
}

const AddOccupationalHealthcareEntryForm = ({id, diagnoses, addLocalEntry} : Props) => {
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>("");
  const [codes, setCodes] = useState<string[]>([]);

  const [notification, setNotification] = useState<string | null>(null);

  const addEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const isSickLeave = sickLeaveStartDate.length === 0 &&
      sickLeaveEndDate.length === 0;
    const sickLeave : SickLeave = {
      startDate : sickLeaveStartDate,
      endDate: sickLeaveEndDate
    };
    
    const newEntry = {
      description,
      date,
      specialist,
      diagnosisCodes: codes,
      type: "OccupationalHealthcare",
      employerName : employerName,
      ...(isSickLeave && { sickLeave: sickLeave })
    } as const;

    try {
      const addedEntry = await patientService.addEntry(newEntry,id);
      addLocalEntry(addedEntry);
      setDate("");
      setDescription("");
      setSpecialist("");
      setEmployerName("");
      setSickLeaveStartDate("");
      setSickLeaveEndDate("");
      setCodes([]);
    } catch (error) {
      if (error instanceof Error){
        setNotification(error.message);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }

    }
  };

  return (
    <div>
      <Typography>{notification}</Typography>
        <form onSubmit={addEntry}>
          <FormControl 
            fullWidth 
            variant='outlined' 
          >
            <InputLabel htmlFor="date" shrink={true}>Date</InputLabel>
            <OutlinedInput
              label="Date"
              notched={true}
              id="date"
              type='date'
              required
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />
          </FormControl>
          <TextField
            label="Description"
            fullWidth
            required
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            label="Specialist"
            fullWidth
            required
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
          <TextField
            label="Employer Name"
            fullWidth
            required
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
          />
          <FormControl 
            fullWidth 
            variant='outlined' 
          >
            <InputLabel htmlFor="sick-leave-start" shrink={true}>Sick Leave Start</InputLabel>
            <OutlinedInput
              label="Sick Leave Start"
              notched={true}
              id="sick-leave-start"
              type='date'
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
            />
          </FormControl>
          <FormControl 
            fullWidth 
            variant='outlined' 
          >
            <InputLabel htmlFor="sick-leave-end" shrink={true}>Sick Leave End</InputLabel>
            <OutlinedInput
              label="Sick Leave End"
              notched={true}
              id="sick-leave-end"
              type='date'
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="diagonsis-codes">Diagonsis Codes</InputLabel>
            <Select
              labelId="diagonsis-codes"
              value={codes}
              label="codeDiagonsis Codes"
              multiple
              onChange={({ target }) => {
                setCodes(typeof target.value === 'string' ? target.value.split(',') : target.value);
              }}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {diagnoses.map((diagnosis) => 
                <MenuItem value={diagnosis.code} key={diagnosis.code}>
                  {`${diagnosis.name} - ${diagnosis.code}`}
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
          >
            Add New Entry
          </Button>
          </form>
    </div>
  );
};

export default AddOccupationalHealthcareEntryForm;