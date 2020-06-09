import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

async function bootstrap(): Promise<void> {

    const app = await NestFactory.create(AppModule);
    const defaultPort = 3000;

    app.use(helmet());
    app.enableCors();

    const options = new DocumentBuilder()
        .setTitle('nestJsStarter API')
        .setDescription('nestJsStarter APIs description')
        .setVersion('1.0')
        .addTag('nestJsStarter')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT || defaultPort);
}
bootstrap();
