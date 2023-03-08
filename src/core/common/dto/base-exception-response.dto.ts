import { BaseResponseDto } from 'src/core/common/dto/base-response.dto';

export class ExceptionResponseDto extends BaseResponseDto {
  timestamp: string;
  path: string;
  method: string;
}
