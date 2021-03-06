

import ResponseModel, { STATUS_MESSAGES } from '../../../src/models/response.model';

const responseMock = require('../../mocks/response.mock.json')

describe('Model/Response.model', () => {
    describe('Ensure setting and getting of variables', () => {
        const responseModel = new ResponseModel();

        it('should set the status code correctly', () => {
            responseModel.setCode(responseMock.code);
            expect(responseModel.getCode()).toBe(responseMock.code);
        });

        it('should set the message correctly', () => {
            responseModel.setMessage(responseMock.message);
            expect(responseModel.getMessage()).toBe(responseMock.message);
        });

    });

    describe('Ensure entity mapping', () => {

        const responseModel = new ResponseModel(responseMock.data, responseMock.code, responseMock.message);

        it('should generate a response object', () => {
            expect(responseModel.generate()).toStrictEqual({
                statusCode: responseMock.code,
                headers: responseMock.headers,
                body: JSON.stringify({
                    data: responseMock.data,
                    message: responseMock.message,
                    status: STATUS_MESSAGES[responseMock.code],
                })
            });
        });
    });
})
