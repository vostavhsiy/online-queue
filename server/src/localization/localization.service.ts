import { Injectable } from '@nestjs/common'
import * as i18n from 'i18n'

@Injectable()
export class LocalizationService {
  constructor() {

  }

  translate(key: string, replacements?: Record<string, any>): string {
		    i18n.configure({
          locales: ['en', 'ru'],
          directory: './locales',
          defaultLocale: 'ru',
        });
    return i18n.__(key);
  }
}
