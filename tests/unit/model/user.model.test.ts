import UserModel from '../../../src/models/users.model';

const userMock = require('../../mocks/user.mock.json')


describe('Model/Task.model', () => {

    describe('Ensure entity mapping', () => {
        it('should return an object with all of the entity values', () => {
            const userModel = new UserModel(userMock);
            var userModelEntityMappings=userModel.getEntityMappings();
            expect(userModelEntityMappings).toEqual({
                id: userMock.id,
                userFName: userMock.userFName,
                userLName: userMock.userLName,
                emailAddress: userMock.emailAddress,
                userMName:"",
                createdAt: userModelEntityMappings.createdAt
            });
        });
    });

    describe('Ensure entity hydration', () => {
        it('should be able to get-user-list the hydrated variables from the model', () => {
            const usereModel = new UserModel(userMock);

            expect(usereModel.getId()).toBe(userMock.id);
            expect(usereModel.getUserFName()).toBe(userMock.userFName);
            expect(usereModel.getUserLName()).toBe(userMock.userLName);
            expect(usereModel.getEmailAddress()).toBe(userMock.emailAddress);
        });
    })
})
