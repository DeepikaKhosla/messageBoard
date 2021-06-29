export default {
    registerUser: {
        handler: 'handler.registerUser',
        events: [
            {
                http: {
                    method: 'POST',
                    path: 'users/register',
                    cors: true
                }
            }
        ]
    },
    listUsers: {
        handler: 'handler.getUserList',
        events: [
            {
                http: {
                    method: 'POST',
                    path: 'users/list',
                    cors: true
                }
            }
        ]
    },
    createMessageBoard: {
        handler: 'handler.createMessageBoard',
        events: [
            {
                http: {
                    method: 'POST',
                    path: 'messageboard/create',
                    cors: true
                }
            }
        ]
    },
    listMessageBoard: {
        handler: 'handler.getMessageBoards',
        events: [
            {
                http: {
                    method: 'POST',
                    path: 'messageboard/list',
                    cors: true
                }
            }
        ]
    },
    createMessages: {
        handler: 'handler.createMessage',
        events: [
            {
                http: {
                    method: 'POST',
                    path: 'messages/create',
                    cors: true
                }
            }
        ]
    },
    listMessages: {
        handler: 'handler.getMessages',
        events: [
            {
                http: {
                    method: 'POST',
                    path: 'messages/list',
                    cors: true
                }
            }
        ]
    }
}