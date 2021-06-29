import {
    APIGatewayProxyHandler,
    APIGatewayEvent,
    Context,
    APIGatewayProxyResult
} from 'aws-lambda';

import ResponseModel from "../../models/response.model";

// Services
import DatabaseService from "../../services/database.service";

// utils
import { validateAgainstConstraints } from "../../utils/util";

// Define the request constraints
import requestConstraints from '../../constraints/messages/create.constraint.json';

// Enums
import { StatusCode } from "../../enums/status-code.enum";
import { ResponseMessage } from "../../enums/response-message.enum";
import MessagesModel from '../../models/messages.model';


export const createMessage: APIGatewayProxyHandler = async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
    let response;

    // Parse request parameters
    const requestData = JSON.parse(event.body);

    // Validate against constraints
    return validateAgainstConstraints(requestData, requestConstraints)
        .then(async () => {
            // Initialise database service
            const databaseService = new DatabaseService();

            // Initialise and hydrate model
            const newMessage = new MessagesModel(requestData);

            // Get model data
            const data = newMessage.getEntityMappings();

            // Initialise DynamoDB PUT parameters
            const params = {
                TableName: process.env.MESSAGES_TABLE,
                Item: {
                    Id: data.id,
                    Message: data.message,
                    BoardId: data.boardId,
                    CreatedBy: data.createdBy,
                    IsActive: data.isActive,
                    IsDeleted: data.isDeleted,
                    CreatedAt: data.createdAt,
                    UpdatedAt: data.updatedAt
                }
            }
            // Inserts item into DynamoDB table
            await databaseService.create(params);
            return data.id;
        })
        .then((id) => {
            // Set Success Response
            response = new ResponseModel({ id }, StatusCode.OK, ResponseMessage.CREATE_MESSAGE_SUCCESS);
        })
        .catch((error) => {
            // Set Error Response
            response = (error instanceof ResponseModel) ? error : new ResponseModel({}, StatusCode.ERROR, ResponseMessage.CREATE_MESSAGE_FAIL);
        })
        .then(() => {
            // Return API Response
            return response.generate()
        });
}
