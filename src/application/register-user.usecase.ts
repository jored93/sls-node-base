// src/application/use-cases/RegisterUserUseCase.ts
import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/entities/user.entity";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcryptjs";

export interface RegisterUserDTO {
    name: string;
    email: string;
    password: string;
}

export class RegisterUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    public async execute(input: RegisterUserDTO): Promise<User> {
        const { name, email, password } = input;

        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error("Email already in use");
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const userId = uuidv4();
        const user = User.createManualUser(name, email, passwordHash);

        await this.userRepository.save(user);
        return user;
    }
}
