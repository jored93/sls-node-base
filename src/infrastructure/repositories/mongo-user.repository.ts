// src/infrastructure/repositories/MongoUserRepository.ts
import { UserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/entities/user.entity";
import { connectToDatabase } from "../database/mongoClient";
import { ObjectId } from "mongodb";

export class MongoUserRepository implements UserRepository {
  private collectionName = "users";

  private async getCollection() {
    const db = await connectToDatabase();
    return db.collection(this.collectionName);
  }

  async findByEmail(email: string): Promise<User | null> {
    const col = await this.getCollection();
    const doc = await col.findOne({ email });
    return doc ? this.mapToDomain(doc) : null;
  }

  async findById(id: string): Promise<User | null> {
    const col = await this.getCollection();
    const doc = await col.findOne({ _id: new ObjectId(id) });
    return doc ? this.mapToDomain(doc) : null;
  }

  /* async save(user: User): Promise<void> {
    const col = await this.getCollection();
    const existing = await col.findOne({ _id: new ObjectId(user.id) });

    const data = this.mapToPersistence(user);

    if (existing) {
      await col.updateOne({ _id: new ObjectId(user.id) }, { $set: data });
    } else {
      await col.insertOne({ _id: new ObjectId(user.id), ...data });
    }
  } */

    public async save(user: User): Promise<void> {
      const col = await this.getCollection();

      // Verificamos si el usuario ya existe usando el email o el ID si ya se generó
      const existing = await col.findOne({ email: user.email });

      // Mapeamos el usuario a la forma que se almacenará en la base de datos
      const data = this.mapToPersistence(user);

      if (existing) {
          // Si el usuario ya existe, lo actualizamos
          await col.updateOne(
              { _id: new ObjectId(existing._id) },
              { $set: data }
          );
      } else {
          // Si no existe, lo insertamos con el ID generado automáticamente
          await col.insertOne(data); // MongoDB asigna un _id automáticamente
      }
  }

  async deleteById(id: string): Promise<void> {
    const col = await this.getCollection();
    await col.deleteOne({ _id: new ObjectId(id) });
  }

  private mapToDomain(doc: any): User {
    return User.fromPrimitives({
        id: doc._id.toString(),
        name: doc.name,
        email: doc.email,
        authProvider: doc.authProvider,
        passwordHash: doc.passwordHash,
        googleId: doc.googleId,
        profilePicture: doc.profilePicture,
        isVerified: doc.isVerified,
        createdAt: doc.createdAt
    });
}


  private mapToPersistence(user: User) {
    return {
      name: user.name,
      email: user.email,
      authProvider: user.authProvider,
      passwordHash: user.getPasswordHash(),
      googleId: user.googleId,
      profilePicture: user.profilePicture,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    };
  }
}
