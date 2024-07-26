
import express, { Application } from 'express';
import { MongoClient } from 'mongodb';
import request from 'supertest';
import {MongoStudentRepository} from '../infrastructure/repositories/MongoStudentRepository';
import {StudentController} from '../infrastructure/controllers/StudentController';
let app: Application;
let client: MongoClient;

beforeAll(async () => {
  app = express();
  app.use(express.json());

  client = new MongoClient('your-mongodb-connection-string');
  await client.connect();

  const dbName = 'test-db';
  const studentRepository = new MongoStudentRepository(client, dbName, 'students');
  const studentController = new StudentController(studentRepository);

  app.get('/students', (req, res) => studentController.getAll(req, res));
  app.post('/students', (req, res) => studentController.add(req, res));
});

afterAll(async () => {
  await client.close();
});

describe('Student API', () => {
  it('should create a new student', async () => {
    const newStudent = {
      id: '1',
      name: 'John Doe',
      age: 20,
      email: 'john@example.com',
      course: 'Math',
      enrollmentDate: new Date()
    };

    const response = await request(app)
      .post('/students')
      .send(newStudent);

    expect(response.status).toBe(201);
  });

  it('should retrieve all students', async () => {
    const response = await request(app).get('/students');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});
