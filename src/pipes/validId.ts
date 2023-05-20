import { BadRequestException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { IsNumberString } from 'class-validator';

export const customParseIntPipe = new ParseIntPipe({
  errorHttpStatusCode: HttpStatus.BAD_REQUEST,
  exceptionFactory: () => {
    return new BadRequestException(['Id Inválido pipe']);
  },
});
