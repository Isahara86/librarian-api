import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, LoggerService, ValidationPipe } from '@nestjs/common';
import { NODE_ENV, PORT } from './environment';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
// import helmet from 'helmet';

async function bootstrap(): Promise<void> {
  const port = PORT;
  const logger = createLogger();

  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  // helmet cause an error with gql playground
  // app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(port);
  logger.log(`Server has been started on port:${port}`, 'NestApplication');
}

function createLogger(): LoggerService {
  if (NODE_ENV !== 'production') {
    return new Logger();
  }

  // const customFormatter = winston.format(info => {
  //   if (info.level === 'error') {
  //     return winston.format.prettyPrint().transform(info);
  //   } else {
  //     return winston.format.json().transform(info);
  //   }
  // })();

  const logger = WinstonModule.createLogger({
    transports: new winston.transports.Console(),
    // format: customFormatter,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
  });

  const originalLoggerMethod = logger.error.bind(logger);

  logger.error = (message: any, trace?: string, context?: string): void => {
    if (!message.stack && !trace) {
      trace = new Error().stack;
    }

    originalLoggerMethod(message, trace, context);
  };

  // console.log = (...args) => {
  //   logger.log(args);
  // };

  return logger;
}

bootstrap();
