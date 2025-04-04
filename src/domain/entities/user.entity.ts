import { ObjectId } from 'mongodb';

export class User {
    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly authProvider: "google" | "manual",
        private readonly passwordHash?: string,
        public readonly googleId?: string,
        public readonly profilePicture?: string,
        public readonly isVerified: boolean = false,
        public readonly createdAt: Date = new Date()
    ) {}

    static createManualUser(name: string, email: string, passwordHash: string): User {
        if (!email.includes("@")) throw new Error("Invalid email address.");
        if (!passwordHash || passwordHash.length < 8) throw new Error("Password must be at least 8 characters long.");
        
        // Asignar ObjectId automáticamente
        const id = new ObjectId().toString();
        
        return new User(id, name, email, "manual", passwordHash);
    }

    static createGoogleUser(name: string, email: string, googleId: string): User {
        if (!email.includes("@")) throw new Error("Invalid email address.");
        
        // Asignar ObjectId automáticamente
        const id = new ObjectId().toString();

        return new User(id, name, email, "google", undefined, googleId, `https://lh3.googleusercontent.com/${googleId}?sz=200`, true);
    }

    static fromPrimitives(data: {
        id: string;
        name: string;
        email: string;
        authProvider: "google" | "manual";
        passwordHash?: string;
        googleId?: string;
        profilePicture?: string;
        isVerified: boolean;
        createdAt: Date;
    }): User {
        return new User(
            data.id,
            data.name,
            data.email,
            data.authProvider,
            data.passwordHash,
            data.googleId,
            data.profilePicture,
            data.isVerified,
            data.createdAt
        );
    }

    public getPasswordHash(): string | undefined {
        return this.passwordHash;
    }
}
