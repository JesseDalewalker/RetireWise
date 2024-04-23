import * as dotenv from "dotenv";
import request from 'supertest';
import { Express } from 'express';
import express from 'express';
import { MongoClient } from 'mongodb';
import { userRouter } from '../src/routes/user.routes';

dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
  console.error('The ATLAS_URI environment variable is not defined.');
  process.exit(1);
}

let app: Express;
let connection: MongoClient;

beforeAll(async () => {
  app = express();
  app.use(express.json());
  app.use('/', userRouter); 
  connection = await MongoClient.connect(ATLAS_URI);
});

afterAll(async () => {
  await connection.close();
});

const agent = request.agent('http://localhost:5200');

describe('GET /users/', () => {
    it('Get All Users', async () => {
      const response = await agent.get('/users');
      expect(response.statusCode).toBe(200);
    });
});
 
describe('POST /users', () => {
    it('Create a New User', async () => {
        const userData = { 
            email: 'dylantest@mail.com', 
            password: 'Password1!' 
        };

        const response = await agent.post('/users').send(userData);
        expect(response.statusCode).toBe(201);
    });

    it('Return 409 If Email Already Exists', async () => {
        const userData = { 
            "email": "dylantest@mail.com",
            "password": "Password1!" 
        };

        const response = await agent.post('/users').send(userData);
        expect(response.status).toBe(409);
    });
});

describe('GET /users/:id', () => {
    it('Get A User by ID', async () => {
        const allUsers = await agent.get('/users');
        const email = "dylantest@mail.com";
        let userId = null;
        
        for (const user of allUsers.body) {
            if (user.email === email) {
                userId = user._id;
                break;
            }
        }

        const response = await agent.get(`/users/${userId}`);
        expect(response.statusCode).toBe(200);
    });
  
    it('Return 400 If ID is Invalid', async () => {
        const response = await agent.get('/users/invalidId');
        expect(response.statusCode).toBe(400);
    });
});

//TODO!!!!!
describe('POST /users/login and POST /users/validate', () => {

});

describe('PUT /users/:id', () => {
    it('Update a User by ID', async () => {
        const allUsers = await agent.get('/users');
        const email = "dylantest@mail.com";
        let userId = null;
        
        for (const user of allUsers.body) {
            if (user.email === email) {
                userId = user._id;
                break;
            }
        }

        const updatedUserData = { 
            email: 'newDylan@mail.com', 
            password: 'upPassword1!' 
        };

        const response = await agent.put(`/users/${userId}`).send(updatedUserData);
        expect(response.statusCode).toBe(200);
    });

    it('Return 400 if User ID is Invalid', async () => {
        const updatedUserData = { 
            email: 'newDylan@mail.com', 
            password: 'upPassword1!' 
        };

        const response = await agent.put(`/users/invalidId}`).send(updatedUserData);
        expect(response.statusCode).toBe(400);
    });
});

describe('DELETE /users/:id', () => {
    it('Delete a User by ID', async () => {
        const allUsers = await agent.get('/users');
        const email = "newDylan@mail.com";
        let userId = null;
        
        for (const user of allUsers.body) {
            if (user.email === email) {
                userId = user._id;
                break;
            }
        }

        const response = await agent.delete(`/users/${userId}`);
        expect(response.statusCode).toBe(202);
    });

    it('Return 400 if User ID is Invalid', async () => {
        const response = await agent.delete(`/users/invalidId`);
        expect(response.statusCode).toBe(400);
    });
});
