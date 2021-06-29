import { validate } from "validate.js"; 

// Models
import ResponseModel from "../models/response.model";

// Interfaces
import { IGeneric } from "../interfaces/generic.interface";
import { ResponseMessage } from "../enums/response-message.enum";


export const validateAgainstConstraints = (values: IGeneric<string>, constraints: IGeneric<object>) => {

    return new Promise<void>((resolve, reject) => {
        const validation = validate(values, constraints);

        if (typeof validation === 'undefined') {
            resolve();
        } else {
            reject(new ResponseModel({ validation }, 400, ResponseMessage.MISSING_REQD_FIELDS));
        }
    });
}


export const createChunks = (data: any[], chunkSize: number) => {
    const urlChunks = [];
    let batchIterator = 0;
    while (batchIterator < data.length) {
        urlChunks.push(data.slice(batchIterator, (batchIterator += chunkSize)));
    }
    return urlChunks;
}
