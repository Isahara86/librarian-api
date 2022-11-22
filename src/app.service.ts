import { Injectable } from '@nestjs/common';
import { APP_NAME, APP_VERSION } from './environment';

@Injectable()
export class AppService {
  getHello(): string {
    return `${APP_NAME} v${APP_VERSION}`;
  }
}
