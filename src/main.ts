import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongooseExceptionFilter } from './filters/mongoose-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Demo HRM API')
    .setDescription('Test HRM API description for Bento')
    .setVersion('1.0')
    .addTag('tasks')
    .addTag('employees')
    .addTag('payments')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  app.use('/docs-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(document);
  });
  app.useGlobalFilters(new MongooseExceptionFilter());
  await app.listen(3000);
}
bootstrap();
