import { StudentRepository } from '../repositories/StudentRepository';
import { Student } from '../entites/Student';

export class GetAllStudents {
  constructor(private studentRepository: StudentRepository) {}

  async execute(): Promise<Student[]> {
    return await this.studentRepository.getAll();
  }
}
