import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../app/app.module';
import { UserDto } from '../../user/dto/user.dto';
import { AuthController } from '../auth.controller';

describe('Auth (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let user: UserDto;
  let userAccessToken: string;
  let appRequest: request.SuperTest<request.Test>;

  const controller = 'auth';

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

  describe('POST Route - userLogin()', () => {
    const route = `/${controller}/login`;

    it(`Success: ${route} - Login with one user`, async () => {
      await appRequest
        .post(`${route}`)
        .send({
          login: 'henrique.souza.m06@gmail.com',
          password: '12345678',
        })
        .set('Content-type', 'application/json')
        .expect(200);
    });

    it(`Failure: ${route} - Login with wrong password`, async () => {
      await appRequest
        .post(`${route}`)
        .send({
          login: 'test@test.com',
          password: '12345',
        })
        .set('Content-type', 'application/json')
        .expect(401);
    });
  });

  describe('GET Route - getCurrentUser()', () => {
    const route = `/${controller}/me`;

    it(`Success: ${route} - Get Current User`, async () => {
      const response = await appRequest
        .get(`${route}`)
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(200);

      expect(response.body).toEqual(user);
    });
  });
});
