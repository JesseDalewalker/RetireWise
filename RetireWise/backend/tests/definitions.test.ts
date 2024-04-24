import * as dotenv from "dotenv";
import request from 'supertest';
import { Express } from 'express';
import express from 'express';
import { MongoClient } from 'mongodb';
import { definitionRouter } from '../src/routes/definitions.routes';

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
    app.use('/', definitionRouter);
    connection = await MongoClient.connect(ATLAS_URI);
}, 10000);

afterAll(async () => {
    await connection.close();
});

const agent = request.agent('http://localhost:5200');

describe('GET /definitions/', () => {
    it('Get All Definitions', async () => {
        const response = await agent.get('/definitions');
        expect(response.statusCode).toBe(200);
    });
});
