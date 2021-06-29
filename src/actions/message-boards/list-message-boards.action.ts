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


export const getMessageBoards: APIGatewayProxyHandler = async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
    // Initialize response variable
    let response;
    // Parse request parameters
    const requestData = JSON.parse(event?.body ?? null);
    const { userId } = requestData || {};
    // Initialise database service
    const databaseService = new DatabaseService();
    let results;
    try {
        // Get item from the DynamoDB table
        /* var searchParams:any={
            TableName: process.env.MESSAGE_BOARD_TABLE,
            KeyConditionExpression: 'Id=:boardId',
                ExpressionAttributeValues: {
                    
                }
        }
       if(boardId!=null && boardId!=undefined)
        {
            searchParams.ExpressionAttributeValues= ':boardId:' + boardId;
        }
        if(createdBy!=null && createdBy!=undefined)
        {
            searchParams['IndexName']='CreatedBy-Index'
            searchParams.KeyConditionExpression= 'CreatedBy = ' + createdBy;
        }
        FilterExpression: "MerchantId IN (" + expressionKeys + ")",*/

        if (userId != null && userId != undefined) {
            //first get all the board Ids from message table
            var searchParams: any = {
                TableName: process.env.MESSAGES_TABLE,
                IndexName: 'CreatedBy-Index',
                KeyConditionExpression: 'CreatedBy=:cb',
                ExpressionAttributeValues: {
                    ':cb': userId
                },
                ProjectionExpression: "BoardId"
            }
            let msgsBoardIds = await databaseService.query(searchParams);
            console.log(msgsBoardIds);
            // if (msgsBoardIds != null && msgsBoardIds != undefined) {
            //     if (msgsBoardIds.Items.length > 0) {
                    var expressionKeys = msgsBoardIds?.Items?.map((itm, idx) => {
                        return ':' + idx ;
                    });
                    //null;//":" + (msgsBoardIds?.Items['BoardId']).join(",:");
                    var expressionMap = msgsBoardIds?.Items?.map((itm, idx) => {
                        return '":' + idx + '":"' + itm['BoardId'] + '"';
                    });
                    var expressionValues = "{" + expressionMap.join(",") + "}";
                    console.log(JSON.stringify(expressionKeys));
                    console.log(JSON.stringify(expressionMap));
                    console.log(expressionValues);
                    var params = {
                        TableName: process.env.MESSAGE_BOARD_TABLE,
                        FilterExpression: "Id IN (" + expressionKeys + ")",
                        ExpressionAttributeValues: JSON.parse(expressionValues)
                    }
                    results = await databaseService.scan(params);
            //     }
            // }
        }
        else {

            results = await databaseService.scan({ TableName: process.env.MESSAGE_BOARD_TABLE });
        }
        console.log(results);
        const boardsList = results?.Items?.map((board) => {
            return {
                id: board.Id,
                name: board.Name,
                createdBy: board.UserId,
            }
        })

        // Set Success Response with data
        response = new ResponseModel({
            boardCount: boardsList?.length,
            boards: boardsList,
        }, StatusCode.OK, ResponseMessage.GET_BOARD_SUCCESS);

    }
    catch (error) {
        // Set Error Response
        console.log(error);
        response = (error instanceof ResponseModel) ? error : new ResponseModel({}, StatusCode.ERROR, ResponseMessage.GET_BOARD_FAIL);
    }
    finally {
        // Return API Response
        return response.generate()
    }
}




