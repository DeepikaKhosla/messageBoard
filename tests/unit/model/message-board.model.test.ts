import MessageBoardModel from '../../../src/models/message-boards.model';

const messageBoardMock = require('../../mocks/message-board.mock.json')


describe('Model/Task.model', () => {

    describe('Ensure entity mapping', () => {
        it('should return an object with all of the entity values', () => {
            const msgModel = new MessageBoardModel(messageBoardMock);
            var msgModelEntityMappings=msgModel.getEntityMappings();
            expect(msgModelEntityMappings).toEqual({
                id: messageBoardMock.id,
                name:messageBoardMock.name,
                userId: messageBoardMock.userId,
                isActive:true,
                isDeleted:false,
                createdAt: msgModelEntityMappings.createdAt,
                updatedAt:msgModelEntityMappings.updatedAt
            });
        });
    });

    describe('Ensure entity hydration', () => {
        it('should be able to get-user-list the hydrated variables from the model', () => {
            const messageModel = new MessageBoardModel(messageBoardMock);

            expect(messageModel.getId()).toBe(messageBoardMock.id);
            expect(messageModel.getBoardName()).toBe(messageBoardMock.name);
            expect(messageModel.getUserId()).toBe(messageBoardMock.userId);
        });
    })
})
