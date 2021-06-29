export default {
    UserTable: {
        Type: 'AWS::DynamoDB::Table',
        DeletionPolicy: 'Retain',
        Properties: {
            TableName: '${self:provider.environment.USER_TABLE}',
            AttributeDefinitions: [
                { AttributeName: 'Id', AttributeType: 'S' },
                { AttributeName: 'CreatedAt', AttributeType: 'N' },
            ],
            KeySchema: [
                { AttributeName: 'Id', KeyType: 'HASH' },
                { AttributeName: 'CreatedAt', KeyType: 'RANGE'}
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: '${self:custom.table_throughput}',
                WriteCapacityUnits: '${self:custom.table_throughput}'
            },
        }
    },
    MessageBoardTable: {
        Type: 'AWS::DynamoDB::Table',
        DeletionPolicy: 'Retain',
        Properties: {
            TableName: '${self:provider.environment.MESSAGE_BOARD_TABLE}',
            AttributeDefinitions: [
                { AttributeName: 'Id', AttributeType: 'S' },
                { AttributeName: 'CreatedAt', AttributeType: 'N' },
            ],
            KeySchema: [
                { AttributeName: 'Id', KeyType: 'HASH' },
                 { AttributeName: 'CreatedAt', KeyType: 'RANGE'},
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: '${self:custom.table_throughput}',
                WriteCapacityUnits: '${self:custom.table_throughput}'
            },
        }
    },
    MessagesTable: {
        Type: 'AWS::DynamoDB::Table',
        DeletionPolicy: 'Retain',
        Properties: {
            TableName: '${self:provider.environment.MESSAGES_TABLE}',
            AttributeDefinitions: [
                { AttributeName: 'Id', AttributeType: 'S' },
                { AttributeName: 'BoardId', AttributeType: 'S' },
               { AttributeName: 'CreatedBy', AttributeType: 'S' },
                { AttributeName: 'CreatedAt', AttributeType: 'N' },
            ],
            KeySchema: [
                { AttributeName: 'Id', KeyType: 'HASH' },
                 {AttributeName: 'CreatedAt', KeyType: 'RANGE'},
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: '${self:custom.table_throughput}',
                WriteCapacityUnits: '${self:custom.table_throughput}'
            },
            GlobalSecondaryIndexes: [
                {
                    IndexName: 'BoardId-Index',
                    KeySchema: [
                        { AttributeName: 'BoardId', KeyType: 'HASH' },
                    ],
                    Projection: {
                        ProjectionType: "ALL"
                    },
                    ProvisionedThroughput: {
                        ReadCapacityUnits: '${self:custom.table_throughput}',
                        WriteCapacityUnits: '${self:custom.table_throughput}'
                    }
                },
                {
                    IndexName: 'CreatedBy-Index',
                    KeySchema: [
                        { AttributeName: 'CreatedBy', KeyType: 'HASH' },
                    ],
                    Projection: {
                        ProjectionType: "ALL"
                    },
                    ProvisionedThroughput: {
                        ReadCapacityUnits: '${self:custom.table_throughput}',
                        WriteCapacityUnits: '${self:custom.table_throughput}'
                    }
                }
            ]
        }
    }
}