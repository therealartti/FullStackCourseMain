import patientsData from '../../data/patients';
import { Patient, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientsData;
const filteredPatients: Patient[] = patientsData.map(({ ssn: _ssn, ...rest }) => rest);

const getEntries = () => {
  return filteredPatients;
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(d => d.id === id);
  return entry;
};


const addPatient = (entry: NewPatientEntry): Patient => {
    const id = uuid();
    const newPatientEntry = {
        id,
        ...entry
        };
    
        patients.push(newPatientEntry);
        return newPatientEntry;
};

export default {
  getEntries,
  addPatient,
  findById
};