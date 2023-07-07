import express from 'express';
import { calculateBmi, parseArguments2 } from './bmiCalculator';
import { calculateExercises, parseArguments } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi/', (req, res) => {
  const uncheckedHeight = req.query.height;
  const uncheckedWeight = req.query.weight;

  if (typeof uncheckedHeight !== 'string' || typeof uncheckedWeight !== 'string') {
    return res.status(400).json({error: 'malformatted parameters'});
  }

  try {
    const { height, weight } = parseArguments2(["", "", uncheckedHeight, uncheckedWeight]);
    const bmiResult = calculateBmi(height, weight);
    return res.json({
        weight, height, bmi: bmiResult
    });
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return res.status(400).json({error: errorMessage});
    }
});

app.post('/exercises', (req, res) => {
    if (!req.body.daily_exercises || !req.body.target) {
        return res.status(400).json({error: "parameters missing"});
      }
    
    const daily_exercises = [...req.body.daily_exercises];
    const target = req.body.target;
    
    daily_exercises.unshift(target.toString());
    daily_exercises.unshift("");
    daily_exercises.unshift("");
    
  try {
    const {targetValue, dayList} = parseArguments(daily_exercises);
    const result = calculateExercises(dayList, targetValue);
    return res.json(result);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return res.status(400).json({error: errorMessage});
    }
});


const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});