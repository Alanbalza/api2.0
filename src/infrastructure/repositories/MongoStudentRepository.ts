import { StudentRepository } from '../../domain/repositories/StudentRepository';
import { Student } from '../../domain/entites/Student';
import { MongoClient, Collection, Document, ObjectId } from 'mongodb';

export class MongoStudentRepository implements StudentRepository {
  private collection: Collection<Document>;

  constructor(client: MongoClient, dbName: string, collectionName: string) {
    this.collection = client.db(dbName).collection(collectionName);
  }

  async getAll(): Promise<Student[]> {
    const students = await this.collection.find().toArray();
    return students.map((student) => {
      const { _id, ...rest } = student;
      return { id: _id.toString(), ...rest } as Student;
    });
  }

  async add(student: Student): Promise<void> {
    await this.collection.insertOne({ ...student, _id: new ObjectId() });
  }
}
