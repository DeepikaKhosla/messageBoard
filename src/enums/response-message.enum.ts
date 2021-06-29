export enum ResponseMessage {
    USER_REG_SUCCESS="User registered successfully",
    USER_REG_FAIL="User could not be registered",
    GET_USERS_LIST_SUCCESS="User List successfully retrieved",
    GET_USERS_LIST_FAIL="User List could not be retrieved",
    CREATE_BOARD_SUCCESS = 'Message Board successfully created',
    CREATE_BOARD_FAIL = 'Message Board could not be created',
    /*DELETE_LIST_SUCCESS = 'To-do list successfully deleted',
    DELETE_LIST_FAIL = 'To-do list cannot be deleted',*/
    GET_BOARD_SUCCESS = 'Message Board list successfully retrieved',
    GET_BOARD_FAIL = 'Message Board list not found',
    /*UPDATE_LIST_SUCCESS = 'To-do list successfully updated',
    UPDATE_LIST_FAIL = 'To-do list cannot be updated',*/
    CREATE_MESSAGE_SUCCESS = 'Message successfully added to the board',
    CREATE_MESSAGE_FAIL = 'Message could not be added',
    /*DELETE_TASK_SUCCESS = 'Task successfully deleted',
    DELETE_TASK_FAIL = 'Task could not be deleted',
    UPDATE_TASK_SUCCESS = 'Task successfully updated',
    UPDATE_TASK_FAIL = 'Task could not be updated',*/
    GET_MESSAGE_SUCCESS = 'Message list successfully retrieved',
    GET_MESSAGE_FAIL = 'Message not found',
    ERROR = 'Unknown error.',
    INVALID_REQUEST = 'Invalid Request!',
    GET_ITEM_ERROR = 'Item does not exist',
    MISSING_REQD_FIELDS='Required Fields are missing',
}
