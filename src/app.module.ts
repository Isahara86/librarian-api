import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
// import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { AuthModule } from './auth/auth.module';

const globalModules = [FileModule, UserModule, AuthModule];

@Global()
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // // Required playground: false for ApolloServerPluginLandingPageLocalDefault
      // playground: false,
      // plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    ...globalModules,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [...globalModules, PrismaService],
})
export class AppModule {}
