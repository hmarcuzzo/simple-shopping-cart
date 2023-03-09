import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../app/app.module';
import { AuthController } from '../../auth/auth.controller';
import { UserDto } from '../dto/user.dto';

describe('User (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let user: UserDto;
  let userAccessToken: string;
  let appRequest: request.SuperTest<request.Test>;

  const controller = 'user';

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const authController = moduleFixture.get<AuthController>(AuthController);
    const userLogin = await authController.userLogin({
      login: 'henrique.souza.m06@gmail.com',
      password: '12345678',
    });
    user = userLogin.user;
    userAccessToken = userLogin.token.accessToken;

    app = moduleFixture.createNestApplication();
    app.useLogger(false);
    await app.init();

    appRequest = request(app.getHttpServer());
  });

  describe('GET Route - exists()', () => {
    const route = `/${controller}/exists`;

    it(`Success: ${route} - Check if a user exist`, async () => {
      await appRequest
        .get(`${route}`)
        .query({ login: 'henrique.souza.m06@gmail.com' })
        .expect(200);
    });

    it(`Failure: ${route} - Check if a user exist`, async () => {
      await appRequest
        .get(`${route}`)
        .query({ login: 'henrique.souza.m@gmail.com' })
        .expect(422);
    });

    it(`Failure: ${route} - Check if a user exist with no query`, async () => {
      await appRequest.get(`${route}`).expect(400);
    });
  });

  describe('POST Route - createUser()', () => {
    const route = `/${controller}/create`;

    it(`Success: ${route} - Create one user`, async () => {
      await appRequest
        .post(`${route}`)
        .send({
          login: 'test@test.com',
          password: '123456',
        })
        .set('Content-type', 'application/json')
        .expect(201);
    });

    it(`Failure: ${route} - Create user with same login`, async () => {
      await appRequest
        .post(`${route}`)
        .send({
          login: 'test@test.com',
          password: '123456',
        })
        .set('Content-type', 'application/json')
        .expect(422);
    });
  });

  describe('PUT Route - updateUser()', () => {
    const route = `/${controller}/update`;

    it(`Success: ${route} - Update user`, async () => {
      await appRequest
        .put(`${route}`)
        .send({
          password: '12345678',
        })
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(200);
    });

    it(`Failure: ${route} - Update user with wrong body`, async () => {
      await appRequest
        .put(`${route}`)
        .send({
          passwords: '12345678',
        })
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
