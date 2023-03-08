import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { PublicRoute } from './public-route.decorator';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { AuthGuard } from '../guards/auth.guard';

export function Auth(options?: Partial<{ public: boolean }>): MethodDecorator {
  const isPublicRoute = options?.public;

  return applyDecorators(
    UseGuards(AuthGuard({ public: isPublicRoute })),
    PublicRoute(isPublicRoute),
  );
}

// export const Auth = () => SetMetadata('isAuthenticated', true);
