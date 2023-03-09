import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../app/app.module';
import { UserDto } from '../../../infrastructure/user/dto/user.dto';
import { AuthController } from '../../../infrastructure/auth/auth.controller';

describe('Product (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let user: UserDto;
  let userAccessToken: string;
  let appRequest: request.SuperTest<request.Test>;

  const controller = 'product';

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

  describe('POST Route - createProduct()', () => {
    const route = `/${controller}/create`;

    it(`Success: ${route} - Create a product`, async () => {
      await appRequest
        .post(`${route}`)
        .send({
          price: 250,
        })
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(201);
    });

    it(`Failure: ${route} - Create a product with wrong body`, async () => {
      await appRequest
        .post(`${route}`)
        .send({
          prices: 270,
        })
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(400);
    });
  });

  describe('GET Route - findAll()', () => {
    const route = `/${controller}/get`;

    it(`Success: ${route} - Get all products`, async () => {
      const response = await appRequest
        .get(`${route}`)
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it(`Failure: ${route} - Get all products without authentication`, async () => {
      await appRequest.get(`${route}`).expect(401);
    });
  });

  describe('GET Route - findOne()', () => {
    const route = `/${controller}/get/:id`;

    it(`Success: ${route} - Get all products`, async () => {
      const response = await appRequest
        .get(`/${controller}/get`)
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
      const product = response.body[0];

      const responseProduct = await appRequest
        .get(`${route.replace(':id', product.id)}`)
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(200);

      expect(responseProduct.body).toBeInstanceOf(Object);
      expect(responseProduct.body.id).toBe(product.id);
      expect(responseProduct.body.price).toBe(product.price);
    });

    it(`Failure: ${route} - Get all products without authentication`, async () => {
      const response = await appRequest
        .get(`/${controller}/get`)
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
      const product = response.body[0];

      await appRequest.get(`${route.replace(':id', product.id)}`).expect(401);
    });
  });

  describe('PUT Route - updateProduct()', () => {
    const route = `/${controller}/update/:id`;

    it(`Success: ${route} - Update a product`, async () => {
      const response = await appRequest
        .get(`/${controller}/get`)
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
      const product = response.body[0];

      await appRequest
        .put(`${route.replace(':id', product.id)}`)
        .send({
          price: 300,
        })
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(200);
    });

    it(`Failure: ${route} - Update a product with wrong body`, async () => {
      const response = await appRequest
        .get(`/${controller}/get`)
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
      const product = response.body[0];

      await appRequest
        .put(`${route.replace(':id', product.id)}`)
        .send({
          prices: 300,
        })
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(400);
    });
  });

  describe('DELETE Route - deleteProduct()', () => {
    const route = `/${controller}/delete/:id`;

    it(`Success: ${route} - Delete a product`, async () => {
      const response = await appRequest
        .get(`/${controller}/get`)
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
      const product = response.body[0];

      await appRequest
        .delete(`${route.replace(':id', product.id)}`)
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(200);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
