import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongooseExceptionFilter } from './filters/mongoose-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger Setup
  const options = new DocumentBuilder()
    .setTitle('Demo HRM API')
    .setDescription('Test HRM API description for Bento')
    .setVersion('1.0')
    .addTag('tasks')
    .addTag('employees')
    .addTag('payments')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  // Swagger UI
  SwaggerModule.setup('docs', app, document);

  // Get JSON version of the Swagger document
  app.use('/docs-json', (_: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(document);
  });

  // Global Exception Filter
  app.useGlobalFilters(new MongooseExceptionFilter());

  await app.listen(3000);
}
bootstrap();
