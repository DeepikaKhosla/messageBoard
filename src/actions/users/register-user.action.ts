import {
    APIGatewayProxyHandler,
    APIGatewayEvent,
    Context,
    APIGatewayProxyResult
} from 'aws-lambda';

import UserModel from "../../models/users.model";
import ResponseModel from "../../models/response.model";

// Services
import DatabaseService from "../../services/database.service";

// utils
import { validateAgainstConstraints } from "../../utils/util";

// Define the request constraints
import requestConstraints from '../../constraints/users/create.constraint.json';

// Enums
import { StatusCode } from "../../enums/status-code.enum";
import { ResponseMessage } from "../../enums/response-message.enum";


export const registerUser: APIGatewayProxyHandler = async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
    let response;

    // Parse request parameters
    const requestData = JSON.parse(event.body);

    // Validate against constraints
    return validateAgainstConstraints(requestData, requestConstraints)
        .then(async () => {
            // Initialise database service
            const databaseService = new DatabaseService();

            // Initialise and hydrate model
            const newUser = new UserModel(requestData);

            // Get model data
            const data = newUser.getEntityMappings();
            console.log(data);

            // Initialise DynamoDB PUT parameters
            const params = {
                TableName: process.env.USER_TABLE,
                Item: {
                    Id: data.id,
                    UserFName: data.userFName,
                    UserMName: data.userMName,
                    UserLName: data.userLName,
                    EmailAddress:data.emailAddress,
                    CreatedAt: data.createdAt
                }
            }
            // Inserts item into DynamoDB table
            await databaseService.create(params);
            return data.id;
        })
        .then((id) => {
            // Set Success Response
            response = new ResponseModel({ id }, StatusCode.OK, ResponseMessage.USER_REG_SUCCESS);
        })
        .catch((error) => {
            // Set Error Response
            response = (error instanceof ResponseModel) ? error : new ResponseModel({}, StatusCode.ERROR, ResponseMessage.USER_REG_FAIL);
        })
        .then(() => {
            // Return API Response
            return response.generate()
        });
}
