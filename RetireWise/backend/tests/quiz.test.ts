import * as dotenv from "dotenv";
import request from 'supertest';
import { Express } from 'express';
import express from 'express';
import { MongoClient } from 'mongodb';
import { quizRouter } from '../src/routes/quiz.routes';

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
    app.use('/', quizRouter);
    connection = await MongoClient.connect(ATLAS_URI);
}, 10000);

afterAll(async () => {
    await connection.close();
});

const agent = request.agent('http://localhost:5200');

describe('GET /quiz/', () => {
    it('Get All Quizzes', async () => {
        const response = await agent.get('/quiz');
        expect(response.statusCode).toBe(200);
    });
});

describe('POST /quiz', () => {
    it('Create a New Quiz', async () => {
        const quizData = {
            moduleID: 6,
            videoAndQuizPageID: 1,
            question: "test",
            options: ["test", "test1"],
            answer: "test"
        };

        const response = await agent.post('/quiz').send(quizData);
        expect(response.statusCode).toBe(201);
    });
});

describe('GET /quiz/:id', () => {
    it('Get A Quiz by ID', async () => {
        const allQuizzes = await agent.get('/quiz');
        const question = "test";
        let quizId = null;

        for (const quiz of allQuizzes.body) {
            if (quiz.question === question) {
                quizId = quiz._id;
                break;
            }
        }

        const response = await agent.get(`/quiz/${quizId}`);
        expect(response.statusCode).toBe(200);
    });

    it('Return 404 If Quiz ID is Invalid', async () => {
        const response = await agent.get('/quiz/invalidId');
        expect(response.statusCode).toBe(404);
    });
});

describe('PUT /quiz/:id', () => {
    it('Update a Quiz by ID', async () => {
        const allQuizzes = await agent.get('/quiz');
        const question = "test";
        let quizId = null;

        for (const quiz of allQuizzes.body) {
            if (quiz.question === question) {
                quizId = quiz._id;
                break;
            }
        }

        const updatedQuizData = {
            moduleID: 6,
            videoAndQuizPageID: 1,
            question: "test",
            options: ["test", "test1"],
            answer: "test1"
        };
        const response = await agent.put(`/quiz/${quizId}`).send(updatedQuizData);
        expect(response.statusCode).toBe(200);
    });

    it('Return 400 if Quiz ID is Invalid', async () => {
        const updatedQuizData = {
            moduleID: 6,
            videoAndQuizPageID: 1,
            question: "test",
            options: ["test", "test1"],
            answer: "test1"
        };

        const response = await agent.put(`/quiz/invalidId}`).send(updatedQuizData);
        expect(response.statusCode).toBe(400);
    });
});

describe('DELETE /quiz/:id', () => {
    it('Delete a Quiz by ID', async () => {
        const allQuizzes = await agent.get('/quiz');
        const question = "test";
        let quizId = null;

        for (const quiz of allQuizzes.body) {
            if (quiz.question === question) {
                quizId = quiz._id;
                break;
            }
        }

        const response = await agent.delete(`/quiz/${quizId}`);
        expect(response.statusCode).toBe(202);
    });

    it('Return 400 if Quiz ID is Invalid', async () => {
        const response = await agent.delete(`/quiz/invalidId`);
        expect(response.statusCode).toBe(400);
    });
});
