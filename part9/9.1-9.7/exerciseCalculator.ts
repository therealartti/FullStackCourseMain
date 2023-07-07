interface Result { 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number 
}

interface Inputs {
    targetValue: number,
    dayList: number[]
}

const calculateExercises = (args: number[], target: number): Result => {
    const trainingDays = args.filter(d => d > 0)
    const success = args.every(d => d >= target)
    const average = args.reduce((a, b) => a+b, 0)/args.length
    let rating = 0
    let ratingDescription = ""
    if (success) {
        rating = 3
        ratingDescription = "Goal achieved"
    } else if (!success && average >= target) {
        rating = 2
        ratingDescription = "Goal not achieved but average is good"
    } else {
        rating = 1
        ratingDescription = "Miserable"
    }
    return {
        periodLength: args.length,
        trainingDays: trainingDays.length,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average 
    }
}

const parseArguments = (args: string[]): Inputs => {
    if (args.length < 4) throw new Error('Not enough arguments');
    let targetValue = 0
    if (!isNaN(Number(args[2]))) {
        targetValue = Number(args[2]);
      } else {
        throw new Error('Provided values were not numbers!');
      }
    const dayList = args.slice(3).map(arg => {
        if (!isNaN(Number(arg))) {
          return Number(arg);
        } else {
          throw new Error('Provided values were not numbers!');
        }
      });
  
      return {
        targetValue, 
        dayList
      };
}

try {
    const { targetValue, dayList } = parseArguments(process.argv);
    console.log(calculateExercises(dayList, targetValue));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

export { calculateExercises, parseArguments };