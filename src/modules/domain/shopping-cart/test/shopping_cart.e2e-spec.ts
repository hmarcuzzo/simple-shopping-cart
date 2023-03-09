import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../app/app.module';
import { UserDto } from '../../../infrastructure/user/dto/user.dto';
import { AuthController } from '../../../infrastructure/auth/auth.controller';

describe('Shopping Cart (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let user: UserDto;
  let userAccessToken: string;
  let appRequest: request.SuperTest<request.Test>;

  const controller = 'shopping-cart';

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

  describe('GET Route - findUserCart()', () => {
    const route = `/${controller}/user-cart/get`;

    it(`Success: ${route} - Get user cart`, async () => {
      await appRequest
        .get(`${route}`)
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(200);
    });

    it(`Failure: ${route} - Get user cart without authentication`, async () => {
      await appRequest.get(`${route}`).expect(401);
    });
  });

  describe('PUT Route - addNewProduct()', () => {
    const route = `/${controller}/new-product/create`;

    it(`Success: ${route} - Add a new product to cart`, async () => {
      const response = await appRequest
        .get(`/product/get`)
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
      const product = response.body[0];

      const userCart = (
        await appRequest
          .get(`/${controller}/user-cart/get/`)
          .set('Authorization', `Bearer ${userAccessToken}`)
          .expect(200)
      ).body;

      await appRequest
        .post(`${route}`)
        .send({
          quantity: 3,
          shoppingCartId: userCart.id,
          productId: product.id,
        })
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(201);
    });
  });

  describe('DELETE Route - removeProduct()', () => {
    const route = `/${controller}/product/delete`;

    it(`Success: ${route} - Delete a product from cart`, async () => {
      const userCart = (
        await appRequest
          .get(`/${controller}/user-cart/get/`)
          .set('Authorization', `Bearer ${userAccessToken}`)
          .expect(200)
      ).body;

      expect(userCart.products).toBeInstanceOf(Array);
      expect(userCart.products.length).toBeGreaterThan(0);

      await appRequest
        .delete(`${route}`)
        .send({
          shoppingCartId: userCart.id,
          productId: userCart.products[0].productId,
        })
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(200);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
