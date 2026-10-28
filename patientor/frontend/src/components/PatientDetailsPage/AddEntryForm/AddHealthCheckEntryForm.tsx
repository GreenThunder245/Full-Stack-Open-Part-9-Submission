import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

import { useState } from 'react';
import patientService from "../../../services/patients";
import type { HealthCheckRating, Diagnosis, Entry } from '../../../types';

interface Props {
  id : string,
  diagnoses : Diagnosis[],
  addLocalEntry : (entry : Entry) => void
}
 
const AddHealthCheckEntryForm = ({id, diagnoses, addLocalEntry} : Props) => {
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);
  const [codes, setCodes] = useState<string[]>([]);

  const [notification, setNotification] = useState<string | null>(null);


  const addEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry = {
      description,
      date,
      specialist,
      diagnosisCodes: codes,
      type: 'HealthCheck',
      healthCheckRating : healthCheckRating
    } as const;
    try {
      const addedEntry = await patientService.addEntry(newEntry,id);
      addLocalEntry(addedEntry);
      setDate("");
      setDescription("");
      setSpecialist("");
      setHealthCheckRating(0);
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
          <FormControl fullWidth>
            <InputLabel id="health-check-rating">Health Check Rating</InputLabel>
            <Select
              labelId="health-check-rating"
              value={healthCheckRating}
              label="Health Check Rating"
              required
              onChange={({ target }) => setHealthCheckRating(target.value)}
              >
                <MenuItem value={0}>Healthy</MenuItem>
                <MenuItem value={1}>LowRisk</MenuItem>
                <MenuItem value={2}>HighRisk</MenuItem>
                <MenuItem value={3}>CriticalRisk</MenuItem>
            </Select>
          </FormControl>
          {/* <TextField
            label="Diagonsis Codes (comma-seperated)"
            fullWidth
            value={codes}
            onChange={({ target }) => setCodes(target.value)}
          /> */}
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

export default AddHealthCheckEntryForm;