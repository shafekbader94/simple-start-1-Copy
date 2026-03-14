import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Users (e2e)', () => {
  let app: INestApplication;
  let createdUserId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /api/users – creates a user', async () => {
    const { body, status } = await request(app.getHttpServer())
      .post('/api/users')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
      });

    expect(status).toBe(201);
    expect(body.email).toBe('test@example.com');
    createdUserId = body.id;
  });

  it('GET /api/users – returns user list', async () => {
    const { body, status } = await request(app.getHttpServer()).get(
      '/api/users',
    );
    expect(status).toBe(200);
    expect(Array.isArray(body)).toBe(true);
  });

  it('GET /api/users/:id – returns single user', async () => {
    const { body, status } = await request(app.getHttpServer()).get(
      `/api/users/${createdUserId}`,
    );
    expect(status).toBe(200);
    expect(body.id).toBe(createdUserId);
  });

  it('PATCH /api/users/:id – updates user', async () => {
    const { body, status } = await request(app.getHttpServer())
      .patch(`/api/users/${createdUserId}`)
      .send({ firstName: 'Updated' });

    expect(status).toBe(200);
    expect(body.firstName).toBe('Updated');
  });

  it('DELETE /api/users/:id – removes user', async () => {
    const { status } = await request(app.getHttpServer()).delete(
      `/api/users/${createdUserId}`,
    );
    expect(status).toBe(204);
  });

  it('GET /api/users/:id – 404 after deletion', async () => {
    const { status } = await request(app.getHttpServer()).get(
      `/api/users/${createdUserId}`,
    );
    expect(status).toBe(404);
  });
});
