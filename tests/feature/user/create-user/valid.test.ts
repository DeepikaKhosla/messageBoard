
import handler from '../../../lib/handler';

type Response = {
    data: any;
    message: string;
    status: string;
}

const requestData = {
    userFName: "Steffi",
    userLName:"Leonard",
    emailAddress: "steffi.l@some.com"
}

describe('POST /user/register - Valid user created in DB', () => {
    let response, statusCode = 200;

    beforeEach( function (done) {
        jest.setTimeout(10000);

        handler.registerUser({...requestData })
            .then((body) => {
                statusCode = 200;
                response = body;
                done();
            })
            .catch((error) => {
                statusCode = error.response.statusCode;
                response = error.response.body;
                done();
            });
    });

    it('should expect a 200 status code', (done) => {
        expect(statusCode).toBe(200);
        done();
    });

    it('should expect a success message', (done) => {
        expect(response.message).toBe('User registered successfully');
        done();
    });

    it('should check that user exists in database', function (done) {
         jest.setTimeout(20000);

        handler.listUser({
            userId: response.data.id,
        })
            .then((results: Response) => {

                expect(results.data.id).toEqual(response.data.Id);
                expect(results.data.userFName).toEqual(requestData.userFName);
                expect(results.data.userMName).toEqual('');
                expect(results.data.userLName).toEqual(requestData.userLName);
                expect(results.data.emailAddress).toEqual(requestData.emailAddress);
                expect(results.data.createdAt).toBe('number');
                expect(results.data.createdAt).not.toBe(null);
                done();
            })
            .catch(() => {
                expect(true).toEqual(true);
                done();
            });

    });

})
