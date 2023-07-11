import express from 'express';
import patientService from '../services/patientService';
const router = express.Router();
import toNewPatientEntry from '../utils';

router.get('/', (_req, res) => {
    res.send(patientService.getEntries());
});

router.post('/', (req, res) => {
    try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
    } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(String(req.params.id));

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

export default router;