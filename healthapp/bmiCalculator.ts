const calculateBmi = (height : number, weight: number) : string => {
  const bmi = weight/((height/100)**2);
  switch (true) {
  case bmi < 16.0:
    return "Underweight (Severe thinness)";
  case bmi < 17.0:
    return "Underweight (Moderate thinness)";
  case bmi < 18.5:
    return "Underweight (Mild thinness)";
  case bmi < 25:
    return "Normal range";
  case bmi < 30:
    return "Overweight";
  case bmi < 35:
    return "Obese (Class I)";
  case bmi < 40:
    return "Obese (Class II)";
  case bmi >= 40:
    return "Obese (Class III)";
  default:
    return "Error";
  }
};
if (process.argv[1] === import.meta.filename) {
interface bmiCalculatorArgs {
  height: number;
  weight: number;
}
const parseBmiCalculatorArgs = (args: string[]): bmiCalculatorArgs => {
  if (args.length < 4) throw new Error('less than 2 arguments');
  if (args.length > 4) throw new Error('more than 2 arguments');
  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error('at least one provided value is not a number');
  }
  return {
    height : Number(args[2]),
    weight : Number(args[3])
  };
};
  try {
    const { height, weight } = parseBmiCalculatorArgs(process.argv);
    console.log(calculateBmi(height,weight));
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
export { calculateBmi};
