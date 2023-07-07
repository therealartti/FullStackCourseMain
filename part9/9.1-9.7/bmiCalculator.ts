interface Inputed {
    height: number,
    weight: number
}

const calculateBmi = (height: number, weight: number) => {
    const bmi = weight / (height*height*0.0001);
    if (bmi < 18.5){
        return "Underweight (unhealthy weight)";
    } else if (bmi < 25){
        return "Normal (healthy weight)";
    } else if (bmi < 30){
        return "Overweight (unhealthy weight)";
    } else {
        return "Obese (unhealthy weight)";
    }
};
  
const parseArguments2 = (args: string[]): Inputed => {
    if (args.length < 4) throw new Error('Not enough arguments');
    
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
          height: Number(args[2]),
          weight: Number(args[3])
        };
      } else {
        throw new Error('Provided values were not numbers!');
      }
};

try {
    const { height, weight } = parseArguments2(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

export { calculateBmi, parseArguments2 };