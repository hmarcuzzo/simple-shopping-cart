import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException();
    }

    const token = authHeader.split(' ')[1];

    // Make an HTTP request to an authentication service to validate the token
    // and set the user on the request object if the token is valid
    // You can use any HTTP client library, such as Axios or the built-in NestJS HTTP module
    // Here's an example using the NestJS HTTP module:
    // httpService.get('http://authentication-service/validate', { headers: { authorization: `Bearer ${token}` } })
    //   .subscribe(
    //     (user) => {
    //       req.user = user;
    //       next();
    //     },
    //     () => res.status(401).send({ message: 'Unauthorized' }),
    //   );

    // For demonstration purposes, we'll set a fake user on the request object
    // instead of making an HTTP request to an authentication service
    req.user = { id: 1, name: 'John Doe' };
    next();
  }
}
