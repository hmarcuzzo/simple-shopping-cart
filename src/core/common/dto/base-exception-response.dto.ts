import { BaseResponseDto } from './base-response.dto';

export class ExceptionResponseDto extends BaseResponseDto {
  timestamp: string;
  path: string;
  method: string;
}
