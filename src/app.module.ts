import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './file/file.module';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  imports: [FileModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
