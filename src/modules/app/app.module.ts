import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { DomainModule } from 'src/modules/domain/domain.module';
import { InfrastructureModule } from 'src/modules/infrastructure/infrastructure.module';
import { AllExceptionFilter } from 'src/core/filters/all-exception.filter';
import { LoggerMiddleware } from 'src/core/middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    InfrastructureModule,
    DomainModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
