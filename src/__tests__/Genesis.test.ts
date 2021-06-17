import Request from 'supertest';
import { app } from '../app';

/*
 ! removing this will cause type errors for tests
 */

// eslint-disable-next-line no-eval
import '@types/jest';

describe('Testing http:api calls', () => {
  it('should return 200 with valid response', async () => {
    const data = await Request(app).get('/').expect('Content-Type', /json/).expect(200);
    const response = JSON.parse(data.text);
    expect(response).toMatchObject({ message: 'HelloWorld' });
  });
});
