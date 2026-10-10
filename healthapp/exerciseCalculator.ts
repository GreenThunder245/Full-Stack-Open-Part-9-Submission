export interface dailyExerciseReport {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}
export const calculateExercises = (dailyExerciseHours : number[], target : number ) : dailyExerciseReport => {
  const sumOfExerciseHours : number = dailyExerciseHours.reduce(
    (sum, dailyHours) => sum + dailyHours,
    0
  );
  const average = sumOfExerciseHours/dailyExerciseHours.length;
  let rating;
  let ratingDescription;
  if (average >= target) {
    rating = 3;
    ratingDescription = "Great Work met the target";
  } else if(average >= 0) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "needs serious improvement";
  }
  return {
    periodLength : dailyExerciseHours.length,
    trainingDays : dailyExerciseHours.filter((Dailyhours) => Dailyhours > 0)
    .length,
    success : average >= 2,
    rating,
    ratingDescription,
    target,
    average
  };
};
interface exerciseCalculatorArgs {
  dailyExerciseHours: number[];
  target: number;
}
const parseExerciseCalculatorArgs = (args: string[]): exerciseCalculatorArgs => {
  if (args.toSpliced(0,2).map(arg => Number(arg)).some(num => isNaN(num))) {
    throw new Error('at least one provided value is not a number');
  }
  return {
    dailyExerciseHours : args.toSpliced(0,3).map(arg => Number(arg)),
    target: Number(args[2])
  };
};
if (process.argv[1] === import.meta.filename) {
  try {
    const { target, dailyExerciseHours } = 
    parseExerciseCalculatorArgs(process.argv);
    console.log(calculateExercises(dailyExerciseHours, target));
  } catch (error : unknown) {
  let errorMessage;
  if (error instanceof Error) {
    errorMessage = 'Error: ' + error.message;
  } else {
    errorMessage = 'Something bad happened.';
  }
  console.log(errorMessage);
  }
}