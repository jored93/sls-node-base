import { Logger } from '@aws-lambda-powertools/logger';
import { injectLambdaContext } from '@aws-lambda-powertools/logger/middleware';
import middy from '@middy/core';
import { HttpResponse } from '../utils/response';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

class GetUsers {
    private logger: Logger;
    private userList: { id: number; name: string }[];

    constructor() {
        this.logger = new Logger();
        this.userList = [
            { id: 1, name: "user1" },
            { id: 2, name: "user2" }
        ];
    }

    public async getUsers(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        try {
            return HttpResponse._200(this.userList);
        } catch (err) {
            this.logger.error('This is an ERROR log with some context');
            return HttpResponse._500(err);
        }
    }
}

const getUsersHandler = new GetUsers();
export const handler = middy(getUsersHandler.getUsers.bind(getUsersHandler))
    .use(injectLambdaContext(getUsersHandler["logger"]));
