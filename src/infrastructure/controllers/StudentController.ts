import { Request, Response } from 'express';
import { GetAllStudents } from '../../domain/use-cases/GetAllStudents';
import { AddStudent } from '../../domain/use-cases/AddStudent';
import { MongoStudentRepository } from '../repositories/MongoStudentRepository';

export class StudentController {
  private getAllStudents: GetAllStudents;
  private addStudent: AddStudent;

  constructor(studentRepository: MongoStudentRepository) {
    this.getAllStudents = new GetAllStudents(studentRepository);
    this.addStudent = new AddStudent(studentRepository);
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const students = await this.getAllStudents.execute();
    res.json(students);
  }

  async add(req: Request, res: Response): Promise<void> {
    const student = req.body;
    await this.addStudent.execute(student);
    res.status(201).send();
  }
}
