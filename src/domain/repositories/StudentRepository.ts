import { Student } from '../entites/Student';

export interface StudentRepository {
  getAll(): Promise<Student[]>;
  add(student: Student): Promise<void>;
}
