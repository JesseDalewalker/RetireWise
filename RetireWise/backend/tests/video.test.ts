import * as dotenv from "dotenv";
import request from 'supertest';
import { Express } from 'express';
import express from 'express';
import { MongoClient } from 'mongodb';
import { videoRouter } from '../src/routes/video.routes';

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
    app.use('/', videoRouter);
    connection = await MongoClient.connect(ATLAS_URI);
}, 10000);

afterAll(async () => {
    await connection.close();
});

const agent = request.agent('http://localhost:5200');

describe('GET /videos/', () => {
    it('Get All Videos', async () => {
        const response = await agent.get('/videos');
        expect(response.statusCode).toBe(200);
    });
});

describe('POST /videos', () => {
    it('Create a New Video', async () => {
        const videoData = {
            moduleID: 4,
            videoAndQuizPageID: 1,
            videoID: 'test'
        };

        const response = await agent.post('/videos').send(videoData);
        expect(response.statusCode).toBe(201);
    });

    // it('Return 409 Module Already Exists', async () => {
    //     const moduleData = {
    //         "name": 'new module',
    //         "moduleNumber": 6
    //     };

    //     const response = await agent.post('/videos').send(moduleData);
    //     expect(response.status).toBe(409);
    // });
});

describe('GET /videos/:id', () => {
    it('Get A Video by ID', async () => {
        const allVideo = await agent.get('/videos');
        const videoID = 'test';
        let vidId = null;

        for (const video of allVideo.body) {
            if (video.videoID === videoID) {
                vidId = video._id;
                break;
            }
        }

        const response = await agent.get(`/videos/${vidId}`);
        expect(response.statusCode).toBe(200);
    });

    it('Return 400 If ID is Invalid', async () => {
        const response = await agent.get('/videos/invalidId');
        expect(response.statusCode).toBe(404);
    });
});

describe('PUT /videos/:id', () => {
    it('Update a Video by ID', async () => {
        const allVideo = await agent.get('/videos');
        const videoID = 'test';
        let vidId = null;

        for (const video of allVideo.body) {
            if (video.videoID === videoID) {
                vidId = video._id;
                break;
            }
        }

        const updatedVideoData = {
            moduleID: 4,
            videoAndQuizPageID: 1,
            videoID: 'test1'
        };

        const response = await agent.put(`/videos/${vidId}`).send(updatedVideoData);
        expect(response.statusCode).toBe(200);
    });

    it('Return 400 if Video ID is Invalid', async () => {
        const updatedVideoData = {
            moduleID: 4,
            videoAndQuizPageID: 1,
            videoID: 'test1'
        };

        const response = await agent.put(`/videos/invalidId}`).send(updatedVideoData);
        expect(response.statusCode).toBe(400);
    });
});

describe('DELETE /videos/:id', () => {
    it('Delete a Video by ID', async () => {
        const allVideo = await agent.get('/videos');
        const videoID = 'test';
        let vidId = null;

        for (const video of allVideo.body) {
            if (video.videoID === videoID) {
                vidId = video._id;
                break;
            }
        }

        const response = await agent.delete(`/videos/${vidId}`);
        expect(response.statusCode).toBe(202);
    });

    it('Return 400 if Video ID is Invalid', async () => {
        const response = await agent.delete(`/videos/invalidId`);
        expect(response.statusCode).toBe(400);
    });
});