import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './modules/user/user.module';
import { FileModule } from './modules/file/file.module';
import { join } from 'path';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ApiModule } from './api/api.module';
import { TwoFactorAuthService } from './modules/auth/auth-2fa-.service';

const globalModules = [FileModule, UserModule, AuthModule, BookModule, ApiModule];

@Global()
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      introspection: true,
      playground: true,
      // Required playground: false for ApolloServerPluginLandingPageLocalDefault
      // playground: false,
      // plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    ...globalModules,
  ],
  providers: [PrismaService, AppService, TwoFactorAuthService],
  exports: [...globalModules, PrismaService, AppService],
})
export class AppModule {}
