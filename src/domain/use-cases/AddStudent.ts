import { StudentRepository } from '../repositories/StudentRepository';
import { Student } from '../entites/Student';

export class AddStudent {
  constructor(private studentRepository: StudentRepository) {}

  async execute(student: Student): Promise<void> {
    await this.studentRepository.add(student);
  }
}
