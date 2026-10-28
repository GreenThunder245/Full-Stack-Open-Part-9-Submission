import { type HealthCheckRating, type Entry } from "../../types";
import { Box, Typography, Card, CardContent } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';
const HandleHealthCheckRating = (heathCheckRating : HealthCheckRating) => {
  switch(heathCheckRating){
    case 0: return 'red';
    case 1: return 'orange';
    case 2: return 'yellow';
    case 3: return 'green';
  }
};
const EntryDetails = ({ entry } : {entry : Entry}) => {
  switch (entry.type){
    case "HealthCheck":
      return (
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex' }}>
              <Typography>
                {entry.date}
              </Typography>
              <MedicalServicesIcon/>
            </Box>
            <Typography>
              {entry.description}
            </Typography>
              <FavoriteIcon 
                htmlColor={HandleHealthCheckRating(entry.healthCheckRating)}
              />
            <Typography>
              diagnose by {entry.specialist}
            </Typography> 
          </CardContent>
        </Card>
      );
    case "OccupationalHealthcare":    
      return(
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex' }}>
              <Typography>
                {entry.date} 
              </Typography>
              <WorkIcon/>
              <Typography>
                {entry.employerName} 
              </Typography>
            </Box>
            <Typography>
              {entry.description}
            </Typography>
            { entry.sickLeave && <Typography>
              sickLeave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
            </Typography>}
            <Typography>
              diagnose by {entry.specialist}
            </Typography>
          </CardContent>
        </Card>
      );
    case "Hospital":
      return(
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex' }}>
              <Typography>
                {entry.date}
              </Typography>
              <LocalHospitalIcon/>
            </Box>
              <Typography>
                {entry.description} 
              </Typography>
              <Typography>
                Discharge Date: {entry.discharge.date} 
              </Typography>
              <Typography>
                Discharge Criteria: {entry.discharge.criteria}
              </Typography>
              <Typography>
                diagnose by {entry.specialist}
              </Typography>
          </CardContent>
        </Card>
      );
  }
};

export default EntryDetails;