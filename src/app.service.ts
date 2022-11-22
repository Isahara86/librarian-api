import { Injectable } from '@nestjs/common';
import { APP_NAME, APP_VERSION } from './environment';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly db: PrismaService) {}

  async getHello(): Promise<string> {
    const res = await this.db.$queryRaw`SELECT now()`;

    return `${APP_NAME} v${APP_VERSION} ${JSON.stringify(res)}`;
  }
}
