import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(value: Types.ObjectId) {
    if (Types.ObjectId.isValid(value)) return value;
    throw new BadRequestException('Это не ID');
  }
}
