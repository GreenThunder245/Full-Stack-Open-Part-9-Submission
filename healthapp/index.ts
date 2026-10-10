import express from 'express';

import { calculateBmi } from "./bmiCalculator.ts";
import { 
  calculateExercises, 
} from "./exerciseCalculator.ts";
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  
  if (typeof height == 'undefined' || typeof weight == 'undefined') {
    return res.status(400).send({error: 'malformatted parameters'});
  }

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).send({error: 'malformatted parameters'}); 
  }
  const BmiMessage = calculateBmi(Number(height),Number(weight));
  return res.status(200).send({
    weight: Number(weight),
    height: Number(height),
    bmi: BmiMessage
  });
});
app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {daily_exercises, target} = req.body;

  if (typeof target == 'undefined' || typeof daily_exercises == 'undefined') {
    return res.status(400).send({error: 'parameters missing'});
  }

  if (typeof target != "number" || isNaN(Number(target)) || target < 0) {
    return res.status(400).send({error: 'malformatted parameters'});
  }
  if (!Array.isArray(daily_exercises)){
    return res.status(400).send({error: 'malformatted parameters'});
  }
  if (daily_exercises.some(daily_exercise => typeof daily_exercise != "number" || isNaN(Number(daily_exercise)))) {
    return res.status(400).send({error: 'malformatted parameters'});
  }

  return res.status(200).send(calculateExercises(
    daily_exercises.filter(x => typeof x == 'number'),
    target
  ));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});