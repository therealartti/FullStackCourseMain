import { NewPatientEntry, Gender } from './types';

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
      }
    console.log(object);
    if ('name' in object && 'dateOfBirth' in object && 'gender' 
    in object && 'occupation' in object)  {
        const newEntry: NewPatientEntry = {
            name: parseData(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            gender: parseGender(object.gender),
            occupation: parseData(object.occupation),
            entries: []
        };

        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;

const parseData = (data: unknown): string => {
    if (!data || !isString(data)) {
      throw new Error('Incorrect or missing data');
    }
  
    return data;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
  
const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
  };