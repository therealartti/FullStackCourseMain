import diagnosesData from '../../data/diagnoses';
import { v1 as uuid } from 'uuid';
import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = diagnosesData;

const getEntries = () => {
  return diagnoses;
};

const addDiagnose = (entry: Diagnosis): Diagnosis => {
  const id = uuid();
  const newDiagnoseEntry = {
      id,
      ...entry
      };
  
      diagnoses.push(newDiagnoseEntry);
      return newDiagnoseEntry;
};

export default {
  getEntries,
  addDiagnose
};