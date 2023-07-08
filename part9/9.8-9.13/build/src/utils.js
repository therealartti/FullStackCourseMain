"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    console.log(object);
    if ('name' in object && 'dateOfBirth' in object && 'gender'
        in object && 'occupation' in object) {
        const newEntry = {
            name: parseData(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            gender: parseGender(object.gender),
            occupation: parseData(object.occupation)
        };
        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};
exports.default = toNewPatientEntry;
const parseData = (data) => {
    if (!data || !isString(data)) {
        throw new Error('Incorrect or missing data');
    }
    return data;
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).map(v => v.toString()).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
