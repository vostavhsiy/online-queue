import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import * as ruLocale from './locales/ru.json';
import { LocalizationService } from './localization.service';

@Injectable()
export class LocaleValidationPipe implements PipeTransform<any> {
  constructor(private readonly localizationService: LocalizationService) {}

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const translatedErrors = errors.reduce((errors, error) => {
        const constraints = [];
        for (const key in error.constraints) {
          const localeError = ruLocale[`validation.${key}`];
          let replace;
          if (error.constraints[key].includes('длина')) {
            replace = error.constraints[key];
          } else if (
            localeError.includes('{{min}}') ||
            localeError.includes('{{max}}')
          ) {
            replace = localeError.replace(
              /(\{\{(min)\}\})|(\{\{(max)\}\})/g,
              error.constraints[key].match(/\d+/)?.[0],
            );
          }
          constraints.push(replace || localeError);
        }
        return [...errors, ...constraints];
      }, []);

      throw new BadRequestException(translatedErrors);
    }

    return value;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
