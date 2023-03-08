import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  CannotCreateEntityIdMapError,
  EntityNotFoundError,
  QueryFailedError,
} from 'typeorm';
import { ExceptionResponseDto } from '../common/dto/base-exception-response.dto';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let message: string;
    let status: number;
    let logInConsole = true;

    switch (exception.constructor) {
      case HttpException:
        status = (exception as HttpException).getStatus();
        message = (exception as HttpException).message;
        break;
      case QueryFailedError:
        const queryException = exception as QueryFailedError;
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = queryException.driverError.detail
          ? queryException.driverError.detail
          : queryException.message;
        break;
      case EntityNotFoundError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as EntityNotFoundError).message;
        break;
      case CannotCreateEntityIdMapError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as CannotCreateEntityIdMapError).message;
        break;
      case BadRequestException:
        status = HttpStatus.BAD_REQUEST;
        message = (exception as BadRequestException).message;
        break;
      case NotFoundException:
        status = HttpStatus.NOT_FOUND;
        message = (exception as NotFoundException).message;
        logInConsole = message.includes('Cannot') ? false : logInConsole;
        break;
      case UnauthorizedException:
        status = HttpStatus.UNAUTHORIZED;
        message = (exception as UnauthorizedException).message;
        break;
      case ForbiddenException:
        status = HttpStatus.FORBIDDEN;
        message = (exception as ForbiddenException).message;
        break;
      default:
        status = (exception as any).status ?? HttpStatus.INTERNAL_SERVER_ERROR;
        message = (exception as any).message ?? 'Internal server error';
        break;
    }

    if (logInConsole)
      Logger.error(
        message,
        (exception as any).stack,
        `${request.method} ${request.url}`,
      );

    response
      .status(status)
      .json(this.GlobalResponseError(status, message, request));
  }
  private GlobalResponseError: (
    statusCode: number,
    message: string,
    request: Request,
  ) => ExceptionResponseDto = (
    statusCode: number,
    message: string,
    request: Request,
  ): ExceptionResponseDto => {
    return {
      statusCode: statusCode,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
    };
  };
}
