import { UserRepository } from '../domain/repositories/user.repository';
import { User } from '../domain/entities/user.entity';

export class FindUserByEmailUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(email: string): Promise<User | null> {
        const user = await this.userRepository.findByEmail(email);
        return user;
    }
}
