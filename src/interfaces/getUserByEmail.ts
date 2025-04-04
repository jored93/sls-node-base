import { Logger } from '@aws-lambda-powertools/logger';
import { injectLambdaContext } from '@aws-lambda-powertools/logger/middleware';
import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { HttpResponse } from '../shared/response';
import { FindUserByEmailUseCase } from '../application/find-user-by-email.usecase';
import { MongoUserRepository } from '../infrastructure/repositories/mongo-user.repository';

class FindUserByEmailHandler {
    private logger: Logger;
    private findUserByEmailUseCase: FindUserByEmailUseCase;

    constructor() {
        this.logger = new Logger({ serviceName: 'FindUserByEmail' });

        // Aquí inyectas la implementación concreta del repositorio
        const userRepository = new MongoUserRepository();
        this.findUserByEmailUseCase = new FindUserByEmailUseCase(userRepository);
    }

    public async handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        try {
            // Obtener el email desde el path (event.pathParameters.email)
            const email: string = event.pathParameters?.email || "";

            if (!email) {
                return HttpResponse._400({ message: "Email parameter is missing" });
            }

            // Llamar al caso de uso para obtener el usuario por email
            const user = await this.findUserByEmailUseCase.execute(email);
            if (!user) {
                return HttpResponse._404({ message: "User not found" });
            }

            return HttpResponse._200(user);
        } catch (err) {
            this.logger.error('Error finding user by email', { err });
            return HttpResponse._500({ message: err });
        }
    }
}

const handlerInstance = new FindUserByEmailHandler();

export const handler = middy(handlerInstance.handler.bind(handlerInstance))
    .use(injectLambdaContext(handlerInstance['logger']));
