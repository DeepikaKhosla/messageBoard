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
import { validateAgainstConstraints } from '../../utils/util';
import requestConstraints from '../../constraints/messages/get.constraint.json';


export const getMessages: APIGatewayProxyHandler = async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
    // Initialize response variable
    let response;
    // Parse request parameters
    const requestData = JSON.parse(event?.body ?? null);
    const { boardId, startDate, endDate } = requestData || {};
    // Initialise database service
    const databaseService = new DatabaseService();
    return validateAgainstConstraints(requestData, requestConstraints)
        .then(async () => {
            let results;
            if (boardId != null && boardId != undefined) {
                // Get item from the DynamoDB table
                console.log(boardId);
                var searchParams: any = {
                    TableName: process.env.MESSAGES_TABLE,
                    IndexName: 'BoardId-Index',
                    KeyConditionExpression: 'BoardId=:boardId',
                    ExpressionAttributeValues: {
                        ':boardId': boardId
                    }
                }

                results = await databaseService.query(searchParams);
            }

            else if (startDate != null && endDate != null && startDate != undefined && endDate != undefined && startDate <= endDate) {
                var searchParams: any = {
                    TableName: process.env.MESSAGES_TABLE,
                    FilterExpression: "CreatedAt BETWEEN :startDate AND :endDate",
                    ExpressionAttributeValues: { ":startDate": startDate, ":endDate": endDate }
                }
                console.log(JSON.stringify(searchParams));
                results = await databaseService.scan(searchParams);
            }
            console.log(results);
            const messagesList = results?.Items?.map((message) => {
                return {
                    id: message.Id,
                    message: message.Message,
                    createdBy: message.CreatedBy,
                    boardId: message.BoardId
                }
            })

            // Set Success Response with data
            response = new ResponseModel({
                messageCount: messagesList?.length,
                messages: messagesList,
            }, StatusCode.OK, ResponseMessage.GET_MESSAGE_SUCCESS);

        })
        .catch((error) => {
            // Set Error Response
            console.log(error);
            response = (error instanceof ResponseModel) ? error : new ResponseModel({}, StatusCode.ERROR, ResponseMessage.GET_MESSAGE_FAIL);
        }).then(() => { return response.generate() })
}




