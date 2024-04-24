import * as dotenv from "dotenv";
import request from 'supertest';
import { Express } from 'express';
import express from 'express';
import { MongoClient } from 'mongodb';
import { moduleRouter } from '../src/routes/module.routes';

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
    app.use('/', moduleRouter);
    connection = await MongoClient.connect(ATLAS_URI);
}, 10000);

afterAll(async () => {
    await connection.close();
});

const agent = request.agent('http://localhost:5200');

describe('GET /modules/', () => {
    it('Get All Modules', async () => {
        const response = await agent.get('/modules');
        expect(response.statusCode).toBe(200);
    });
});

describe('POST /modules', () => {
    it('Create a New Module', async () => {
        const moduleData = {
            name: 'new module',
            moduleNumber: 6
        };

        const response = await agent.post('/modules').send(moduleData);
        expect(response.statusCode).toBe(201);
    });

    it('Return 400 If Module Data is Invalid', async () => {
        const moduleData = {
            name: 'new module',
            moduleNumber: 'new module'
        };

        const response = await agent.post('/modules').send(moduleData);
        expect(response.statusCode).toBe(400);
    });
});

describe('GET /modules/:id', () => {
    it('Get A Module by ID', async () => {
        const allModule = await agent.get('/modules');
        const moduleNumber = 6;
        let moduleId = null;

        for (const module of allModule.body) {
            if (module.moduleNumber === moduleNumber) {
                moduleId = module._id;
                break;
            }
        }

        const response = await agent.get(`/modules/${moduleId}`);
        expect(response.statusCode).toBe(200);
    });

    it('Return 400 If Module ID is Invalid', async () => {
        const response = await agent.get('/modules/invalidId');
        expect(response.statusCode).toBe(400);
    });
});

describe('PUT /modules/:id', () => {
    it('Update a Module by ID', async () => {
        const allModule = await agent.get('/modules');
        const moduleNumber = 6;
        let moduleId = null;

        for (const module of allModule.body) {
            if (module.moduleNumber === moduleNumber) {
                moduleId = module._id;
                break;
            }
        }

        const updatedModuleData = {
            name: 'newer module',
            moduleNumber: 7
        };

        const response = await agent.put(`/modules/${moduleId}`).send(updatedModuleData);
        expect(response.statusCode).toBe(200);
    });

    it('Return 400 if Module ID is Invalid', async () => {
        const updatedModuleData = {
            name: 'newer module',
            moduleNumber: 7
        };

        const response = await agent.put(`/modules/invalidId`).send(updatedModuleData);
        expect(response.statusCode).toBe(400);
    });
});

describe('DELETE /modules/:id', () => {
    it('Delete a Module by ID', async () => {
        const allModule = await agent.get('/modules');
        const moduleNumber = 7;
        let moduleId = null;

        for (const module of allModule.body) {
            if (module.moduleNumber === moduleNumber) {
                moduleId = module._id;
                break;
            }
        }

        const response = await agent.delete(`/modules/${moduleId}`);
        expect(response.statusCode).toBe(202);
    });

    it('Return 400 if Module ID is Invalid', async () => {
        const response = await agent.delete(`/modules/invalidId`);
        expect(response.statusCode).toBe(400);
    });
});
