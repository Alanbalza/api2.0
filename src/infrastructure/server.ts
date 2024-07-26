import express, { Application } from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { MongoStudentRepository } from './repositories/MongoStudentRepository';
import { StudentController } from './controllers/StudentController';

// Cargar variables de entorno
dotenv.config();

const app: Application = express(); // Asegúrate de que `app` es de tipo `Application`
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || 'mongodb+srv://Alumn:pichibrr@cluster0.qfye1er.mongodb.net/alumnos?retryWrites=true&w=majority&appName=Cluster0';
const dbName = process.env.DB_NAME || 'alumnos';

const client = new MongoClient(mongoUri);

client.connect().then(() => {
  console.log('Connected to MongoDB');
  
  const studentRepository = new MongoStudentRepository(client, dbName, 'students');
  const studentController = new StudentController(studentRepository);

  app.use(express.json());

  app.get('/students', (req, res) => studentController.getAll(req, res));
  app.post('/students', (req, res) => studentController.add(req, res));

  app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
  });
}).catch(error => {
  console.error('Failed to connect to MongoDB', error);
});

export { app };
