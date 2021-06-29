import type { Serverless } from 'serverless/aws';
import dynamoDbTables from './resources/dynamodb-tables';
import functions from './resources/functions';
const serverlessConfiguration: Serverless = {
  service: {
    name: 'message-board',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    },
    ['serverless-offline']: {
      httpPort: 3000,
      // babelOptions: {
      //   presets: ["env"]
      // }
    },
    region: '${opt:region, self:provider.region}',
    stage: '${opt:stage, self:provider.stage}',
    user_table: '${self:service}-user-table-${opt:stage, self:provider.stage}',
    message_board_table: '${self:service}-message-board-table-${opt:stage, self:provider.stage}',
    messages_table: '${self:service}-message-table-${opt:stage, self:provider.stage}',
    table_throughputs: {
      prod: 5,
      default: 1,
    },
    table_throughput: '${self:custom.table_throughputs.${self:custom.stage}, self:custom.table_throughputs.default}',
    dynamodb: {
      stages: ['dev'],
      start: {
        port: 8008,
        inMemory: true,
        heapInitial: '200m',
        heapMax: '1g',
        migrate: true,
        seed: true,
        convertEmptyValues: true,
        // Uncomment only if you already have a DynamoDB running locally
        // noStart: true
      }
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack','serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    stage: 'dev',
    region: 'ap-southeast-2',
    apiGateway: {
      shouldStartNameWithService: true,
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      REGION: '${self:custom.region}',
      STAGE: '${self:custom.stage}',
      USER_TABLE: '${self:custom.user_table}',
      MESSAGE_BOARD_TABLE: '${self:custom.message_board_table}',
      MESSAGES_TABLE: '${self:custom.messages_table}',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:DescribeTable',
          'dynamodb:Query',
          'dynamodb:Scan',
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem'
        ],
        Resource: [
          { "Fn::GetAtt": ['UserTable', 'Arn'] },
          { "Fn::GetAtt": ['MessageBoardTable', 'Arn'] },
          { "Fn::GetAtt": ['MessagesTable', 'Arn'] }
        ]
      }
    ]
  },
  functions,
  resources: {
    Resources: dynamoDbTables
  }
}

module.exports = serverlessConfiguration;
