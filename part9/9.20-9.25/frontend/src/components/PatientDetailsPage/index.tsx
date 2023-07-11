import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import { Patient, Diagnosis, Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../../types"; 
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import { Card, CardContent, Typography } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';


const PatientDetailsPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null); // Declare the type of your state
  //const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) {
        console.error('No patient ID provided');
        return;
      }
      const fetchedPatient = await patientService.getOne(id);
      setPatient(fetchedPatient);
    };
    fetchPatient();

    /*const fetchDiagnoses = async () => {
        const fetchedDiagnoses = await patientService.getDiagnoses();
        setDiagnoses(fetchedDiagnoses);
      };
  
      fetchDiagnoses();*/
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{patient.name} {" "} 
      {patient.gender === 'male' ? <MaleIcon /> : patient.gender === 'female' ? <FemaleIcon /> : <AddReactionIcon />}</h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h3>entries</h3>
         {patient.entries.map((entry, index) => (
        <EntryDetails key={index} entry={entry} />
      ))}

    </div>
  );
};

export default PatientDetailsPage;

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryDetails entry={entry} />
    case 'OccupationalHealthcare':
      return <OccupationalEntryDetails entry={entry} />
    case 'HealthCheck':
      return <HealthCheckEntryDetails entry={entry} />
    default:
      return null;
  }
};

const cardStyle = {
    border: "1px solid black",
  }

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => (
  <Card style={cardStyle}>
    <CardContent>
      <Typography>
        {entry.date} <LocalHospitalIcon />
      </Typography>
      <Typography>{entry.description}</Typography>
      <Typography>diagnose by {entry.specialist}</Typography>
    </CardContent>
  </Card>
);

const OccupationalEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => (
  <Card  style={cardStyle}>
    <CardContent>
      <Typography>
        {entry.date} <WorkIcon /> {entry.employerName}
      </Typography>
      <Typography>{entry.description}</Typography>
      <Typography>diagnose by {entry.specialist}</Typography>
    </CardContent>
  </Card>
);

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => (
  <Card>
    <CardContent  style={cardStyle}>
      <Typography>
        {entry.date} <HealthAndSafetyIcon />
      </Typography>
      <Typography>{entry.description}</Typography>
      <Typography>Health Check Rating: {entry.healthCheckRating}</Typography>
      <Typography>diagnose by {entry.specialist}</Typography>
    </CardContent>
  </Card>
);

/*{patient.entries.map(entry=>
        <div>
         <div>{entry.date} <i>{entry.description}</i> </div>
         {entry.diagnosisCodes && 
         <ul>{entry.diagnosisCodes.map(code => { 
            const diagnosis = diagnoses.find(dia => dia.code === code);
            return <li key={code}>{code} {diagnosis?.name}</li>})}</ul>}
         </div>)}*/

