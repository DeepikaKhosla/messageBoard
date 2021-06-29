import MessageModel from '../../../src/models/messages.model';

const messageMock = require('../../mocks/messages.mock.json')


describe('Model/Task.model', () => {

    describe('Ensure entity mapping', () => {
        it('should return an object with all of the entity values', () => {
            const msgModel = new MessageModel(messageMock);
            var msgModelEntityMappings=msgModel.getEntityMappings();
            expect(msgModelEntityMappings).toEqual({
                id: messageMock.id,
                message: messageMock.message,
                boardId: messageMock.boardId,
                createdBy: messageMock.createdBy,
                isActive:true,
                isDeleted:false,
                createdAt: msgModelEntityMappings.createdAt,
                updatedAt:msgModelEntityMappings.updatedAt
            });
        });
    });

    describe('Ensure entity hydration', () => {
        it('should be able to get-user-list the hydrated variables from the model', () => {
            const messageModel = new MessageModel(messageMock);

            expect(messageModel.getId()).toBe(messageMock.id);
            expect(messageModel.getBoardId()).toBe(messageMock.boardId);
            expect(messageModel.getMessage()).toBe(messageMock.message);
            expect(messageModel.getCreatedBy()).toBe(messageMock.createdBy);
        });
    })
})
