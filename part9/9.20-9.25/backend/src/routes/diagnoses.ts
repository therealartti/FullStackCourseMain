import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

export interface DiagnosisInput {
  code: string;
  name: string;
  latin?: string;
}

router.get('/', (_req, res) => {
    res.send(diagnoseService.getEntries());
});

router.post('/', (req, res) => {
  try {
    const entry = req.body as DiagnosisInput;
  const addedEntry = diagnoseService.addDiagnose(entry);
  res.json(addedEntry);
  } catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  res.status(400).send(errorMessage);
}
});

export default router;