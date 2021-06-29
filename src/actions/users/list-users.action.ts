import {
    APIGatewayProxyHandler,
    APIGatewayEvent,
    Context,
    APIGatewayProxyResult
} from 'aws-lambda';

// Models
import ResponseModel from "../../models/response.model";

// Services
import DatabaseService from "../../services/database.service";

// Enums
import { StatusCode } from "../../enums/status-code.enum";
import { ResponseMessage } from "../../enums/response-message.enum";
import UserModel from '../../models/users.model';


export const getUserList: APIGatewayProxyHandler = async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
    // Initialize response variable
    let response;
    // Parse request parameters
    const requestData = JSON.parse(event?.body) || {};

    const { userId } = requestData || {};
    console.log(userId);
    // Initialise database service
    const databaseService = new DatabaseService();

    // try {
    // Get item from the DynamoDB table
    return getUsers(userId ?? null, databaseService).then((usersList) => {
        response = new ResponseModel({
            userCount: usersList?.length,
            users: usersList,
        }, StatusCode.OK, ResponseMessage.GET_USERS_LIST_SUCCESS);
    }).catch((err) => {
        console.log(err);
        response = (err instanceof ResponseModel) ? err : new ResponseModel({}, StatusCode.ERROR, ResponseMessage.GET_USERS_LIST_FAIL);
    }).then(() => { return response.generate(); });
}


async function getUsers(userId: any, databaseService: DatabaseService): Promise<UserModel[]> {
    let usersList;
    let results;
    if (userId != null && userId != undefined) {

        results = await databaseService.query({
            TableName: process.env.USER_TABLE,
            KeyConditionExpression: 'Id=:userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        });
    }
    else {
        // Get item from the DynamoDB table
        results = await databaseService.scan({ TableName: process.env.USER_TABLE });

    }
    //console.log(results);
    usersList = results?.Items?.map((user) => {

        return {
            id: user.Id,
            userName: user.UserFName + ((user.UserMName != null) ? (' ' + user.UserMName + ' ') : (' ')) + user.UserLName,
            emailAddress: user.EmailAddress,
        }
    })

    return usersList;
}

