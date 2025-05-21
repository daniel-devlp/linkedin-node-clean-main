import mongoose from 'mongoose';

interface Options {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  private static instance: MongoDatabase;
  private isConnected = false;

  private constructor() {} // Constructor privado para evitar "new MongoDatabase()"

  public static async connect(options: Options): Promise<MongoDatabase> {
    if (!MongoDatabase.instance) {
      MongoDatabase.instance = new MongoDatabase();
      await MongoDatabase.instance.initializeConnection(options);
    }
    return MongoDatabase.instance;
  }

  private async initializeConnection(options: Options): Promise<void> {
    const { mongoUrl, dbName } = options;

    try {
      await mongoose.connect(mongoUrl, { dbName });
      this.isConnected = true;
      console.log('Mongo connected successfully');
    } catch (error) {
      console.error('Mongo connection error:', error);
      throw error;
    }
  }

  public static getInstance(): MongoDatabase {
    if (!MongoDatabase.instance) {
      throw new Error('MongoDatabase not initialized. Call connect() first.');
    }
    return MongoDatabase.instance;
  }

  public checkConnection(): boolean {
    return this.isConnected;
  }
}