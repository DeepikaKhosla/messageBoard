type ResponseHeader = { [header: string]: string | number | boolean; }
import { Status } from '../enums/status.enum';
import { StatusCode } from '../enums/status-code.enum';
interface IResponseBody {
    data: any;
    message: string;
    status?: string;
}

interface IResponse {
    statusCode: number;
    headers: ResponseHeader;
    body: string;
}

// Enums

/*enum Status {
    SUCCESS = 'success',
    ERROR = 'error',
    BAD_REQUEST = 'bad request',
}

const STATUS_MESSAGES = {
    200: Status.SUCCESS,
    400: Status.BAD_REQUEST,
    500: Status.ERROR,
}*/

const RESPONSE_HEADERS: ResponseHeader = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Credentials': true,
};

export const STATUS_MESSAGES = {
    [StatusCode.OK]: Status.SUCCESS,
    [StatusCode.BAD_REQUEST]: Status.BAD_REQUEST,
    [StatusCode.ERROR]: Status.ERROR,
}


export default class ResponseModel {
    private body: IResponseBody;
    private code: number;

    constructor(data = {}, code = StatusCode.BAD_REQUEST, message = '') {
        this.body = {
            data: data,
            message: message,
            status: STATUS_MESSAGES[code],
        };
        this.code = code;
    }

    setBodyVariable = (variable: string, value: string): void => {
        this.body[variable] = value;
    }

    setData = (data: any): void => {
        this.body.data = data;
    }

    setCode = (code: number): void => {
        this.code = code;
    }

    getCode = (): number => {
        return this.code;
    }

    setMessage = (message: string): void => {
        this.body.message = message;
    }

    getMessage = (): any => {
        return this.body.message;
    }

    generate = (): IResponse => {
        return {
            statusCode: this.code,
            headers: RESPONSE_HEADERS,
            body: JSON.stringify(this.body),
        };
    }
}