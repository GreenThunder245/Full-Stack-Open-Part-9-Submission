import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Diagnosis, NonSensitivePatient} from "./types";

import patientService from "./services/patients";
import diagnosisService from "./services/diagnosis";
import PatientListPage from "./components/PatientListPage";
import PatientDetailsPage from "./components/PatientDetailsPage/PatientDetailsPage";
const App = () => {
  const [nonSenstivePatients, setNonSenstivePatients] = useState<NonSensitivePatient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setNonSenstivePatients(patients);
    };
    void fetchPatientList();
  }, []);

  useEffect(() => {
    const fetchDiagnosisList = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnosisList();
  }, []);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" sx={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider sx={{ marginY: 2 }} />
          <Routes>
            <Route path="/" element={
              <PatientListPage 
                patients={nonSenstivePatients}
                setPatients={setNonSenstivePatients}
                />
            }/>
            <Route path="/patients/:id" element={<PatientDetailsPage diagnoses={diagnoses}/>}/>
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;