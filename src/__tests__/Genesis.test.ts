import Request from 'supertest';
import { app } from '../app';

// Removing these will cause type error for tests
// Alternatively, commenting typeRoots in tsconfig also fix this problem
import 'mocha';
import '@types/jest';

describe('Testing http:api calls', () => {
  it('should return 200 with valid response', async () => {
    const data = await Request(app).get('/').expect('Content-Type', /json/).expect(200);
    const response = JSON.parse(data.text);
    expect(response).toMatchObject({ message: 'HelloWorld' });
  });
});
