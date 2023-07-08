import diagnosesData from '../../data/diagnoses';

import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = diagnosesData;

const getEntries = () => {
  return diagnoses;
};

/*const addDiagnose = () => {
  return null;
};*/

export default {
  getEntries,
  //addDiagnose
};