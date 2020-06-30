import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  constructor(private ignoreOtherKeys?: boolean) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (value.data) {
      value = JSON.parse(value.data);
    }
    if (!this.ignoreOtherKeys) {
      this.ignoreOtherKeys = false;
    }
    console.log(this.ignoreOtherKeys)
    if (value instanceof Object && this.isEmptyObject(value)) {
      throw new HttpException(
        'Validation Failed. No Body provided.',
        HttpStatus.BAD_REQUEST
      );
    }
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new HttpException(
        `${this.formatErrors(errors)}`,
        HttpStatus.BAD_REQUEST
      );
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors = (errors: any[]) =>
    errors
      .map((err) => {
        if (err.children.length) {
          // For Metadat Validation
          return err.children
            .map((err) => {
              for (let property in err.constraints) {
                return err.constraints[property];
              }
            })
            .join('\n');
        } else {
          for (let property in err.constraints) {
            return err.constraints[property];
          }
        }
      })
      .join('\n');
  private isEmptyObject = (object: any) => Object.keys(object).length === 0;
}
