// src/handlers/RegisterUser.handler.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import { Logger } from "@aws-lambda-powertools/logger";
import { injectLambdaContext } from "@aws-lambda-powertools/logger/middleware";

import { HttpResponse } from "../shared/response";
import { MongoUserRepository } from "../infrastructure/repositories/mongo-user.repository";
import { RegisterUserUseCase } from "../application/register-user.usecase";

const logger = new Logger();

const registerUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const body = JSON.parse(event.body || "{}");
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return HttpResponse._500({ message: "Missing fields" });
        }

        const userRepository = new MongoUserRepository();
        const useCase = new RegisterUserUseCase(userRepository);
        const user = await useCase.execute({ name, email, password });

        return HttpResponse._200({
            id: user.id,
            name: user.name,
            email: user.email,
            isVerified: user.isVerified,
            createdAt: user.createdAt
        });
    } catch (err: any) {
        logger.error("Error registering user", { error: err.message });
        return HttpResponse._500({ message: err.message });
    }
};

export const handler = middy(registerUser).use(injectLambdaContext(logger));
